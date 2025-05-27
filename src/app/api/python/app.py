import os
import gc
import torch
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# Transformers
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch.nn.functional as F

# LIME
import lime.lime_text
lime.lime_text.multiprocessing = None  # Disable multiprocessing    
from lime.lime_text import LimeTextExplainer

# 
app = Flask(__name__)
CORS(app)

# ==================== Global Model Setup ====================
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")
tokenizer = None
model = None
explainer = None  # One-time LIME explainer


def load_model():
    global tokenizer, model, explainer
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model directory not found: {model_path}")

    print(f"Loading model files: {os.listdir(model_path)}")
    tokenizer = AutoTokenizer.from_pretrained(model_path, local_files_only=True)
    model = AutoModelForSequenceClassification.from_pretrained(model_path, local_files_only=True)
    model.to("cpu").eval()

    explainer = LimeTextExplainer(
        class_names=["Verified", "Fake", "I don't know"],
        bow=False,
        mask_string=''  
    )
    print("Model, tokenizer, and explainer loaded.")

# Load at startup
load_model()



def prediction_function(texts):
    if isinstance(texts, str):
        texts = [texts]
    inputs = tokenizer(texts, padding=True, truncation=True, max_length=512, return_tensors="pt")
    inputs = {k: v.to("cpu") for k, v in inputs.items()}
    with torch.no_grad():
        logits = model(**inputs).logits
        probs = torch.softmax(logits, dim=1)
    return probs.cpu().numpy()



def bert_response(text):
    inputs = tokenizer(text, truncation=True, padding=True, max_length=512, return_tensors="pt")
    inputs = {k: v.to("cpu") for k, v in inputs.items()}
    with torch.no_grad():
        logits = model(**inputs).logits
        probs = F.softmax(logits, dim=1)
        pred = torch.argmax(probs, dim=1).item()

    return pred, probs.cpu().numpy()[0]



def LIME_Algorithm(input_text):
    exp = explainer.explain_instance(
        input_text,
        prediction_function,
        num_features=5,
        num_samples=1000  
    )
    features = [{'feature': f, 'weight': w} for f, w in exp.as_list()]
    fidelity = getattr(exp, 'score', None)

    # cleanup
    del exp
    gc.collect()
    torch.cuda.empty_cache()

    return features, fidelity



@app.route('/', methods=['POST'])
def POST_Method():
    try:
        data = request.get_json(force=True)
        input_text = data.get('input')
        if not input_text:
            return jsonify({'error': "'input' field is required"}), 400

        # Get prediction and probabilities
        pred_label, probs = bert_response(input_text)

        # If thresholded unknown
        if pred_label == 2 or probs.max() < 0.7:
            return jsonify({'AIResponse': "I don't know", 'LIMEOutput': [], 'rawPredictions': probs.tolist()}), 200

        # Otherwise run LIME - Fixed function call (only 1 parameter)
        lime_feats, fidelity = LIME_Algorithm(input_text)
        label_map = {0: 'Verified', 1: 'Fake'}
        ai_label = label_map.get(pred_label, "I don't know")

        response = {
            'AIResponse': ai_label,
            'LIMEOutput': lime_feats,
            'localFidelity': fidelity,
            'rawPredictions': probs.tolist()
        }
        return jsonify(response), 200

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':  
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
