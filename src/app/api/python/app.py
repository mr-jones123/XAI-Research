from lime.lime_text import LimeTextExplainer
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch
import torch.nn.functional as F
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import gc  

app = Flask(__name__)
CORS(app)

model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")
tokenizer = None
model = None

def load_model():
    global tokenizer, model
    try:
        if not os.path.exists(model_path):
            raise ValueError(f"Model directory does not exist: {model_path}")
        
  
        print(f"Files in model directory: {os.listdir(model_path)}")
        
    
        tokenizer = AutoTokenizer.from_pretrained(
            model_path, 
            local_files_only=True,
            use_auth_token=None,
            trust_remote_code=False
        )
        
        model = AutoModelForSequenceClassification.from_pretrained(
            model_path, 
            local_files_only=True,
            use_auth_token=None,
            trust_remote_code=False
        )
        
        print(f"Model and tokenizer loaded successfully from: {model_path}")
    except Exception as e:
        print(f"Error loading model and tokenizer: {e}")
        print(f"Absolute model path: {os.path.abspath(model_path)}")
        raise e


load_model()

# create predictions scores from the model
def prediction_function(text_inputs):
    if isinstance(text_inputs, str):
        text_inputs = [text_inputs]
        
    inputs = tokenizer(text_inputs, padding=True, truncation=True, return_tensors="pt", max_length=512)
        
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        prediction_scores = torch.softmax(logits, dim=1)
    
    return prediction_scores.numpy()

# response from the model
def bert_response(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)
        predicted_class = torch.argmax(probabilities, dim=-1).item()

        label_news = {
            0: "Verified",
            1: "Fake",
            2: "I don't know"
        }

        return label_news.get(predicted_class)

def LIME_Algorithm(input_text):
    if bert_response(input_text) == "I don't know":
        return "The AI can't answer. Your query might be out of topic."
    
    explainer = LimeTextExplainer(
        class_names=["Verified", "Fake"],
        bow = False,
        mask_string=''
    )

    exp = explainer.explain_instance(
        input_text,
        prediction_function,
        num_features= 5,
        num_samples = 1000
    )

    local_fidelity = exp.score
    lime_output = [{"feature": feature, "weight": weight} for feature, weight in exp.as_list()]

    del exp
    gc.collect()
    
    return lime_output, local_fidelity
        


@app.route("/", methods=["POST"])
def POST_Method():
    try:
        data = request.get_json()
        if not data or "input" not in data:
            return {"error": "Invalid request, 'input' is required"}, 400

        input_text = data["input"]
        
 
        ai_response = bert_response(input_text)
        lime_explanation = LIME_Algorithm(input_text)

        pred_scores = prediction_function([input_text])[0].tolist()
     

        response = {
            "AIResponse": ai_response,
            "LIMEOutput": lime_explanation,
            "rawPredictions": pred_scores,
        }
        
    
        return jsonify(response), 200
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"Something went wrong: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port, debug=False)