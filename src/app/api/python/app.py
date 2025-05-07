from lime.lime_text import LimeTextExplainer
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch.nn.functional as F
import torch
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  


current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, '../../../..'))
model_path = os.path.join(project_root, 'src', 'lib', 'models')
# For container deployment
# model_path = os.path.join(current_dir, 'models')

try:
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    print(f"Model and tokenizer loaded successfully from: {model_path}")
except Exception as e:
    print(f"Error loading model and tokenizer: {e}")



def prediction_function(text_inputs):

    if isinstance(text_inputs, str):
        text_inputs = [text_inputs]
    
    # Process in smaller batches if needed for very long texts
    all_scores = []
    inputs = tokenizer(text_inputs, padding=True, truncation=True, return_tensors="pt", max_length=512)
        
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        prediction_scores = torch.softmax(logits, dim=1)
        all_scores.append(prediction_scores)
    
    combined_scores = torch.cat(all_scores, dim=0)
    return combined_scores.numpy()

def bert_response(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True)

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)
        predicted_class = torch.argmax(probabilities, dim=-1).item()


        label_news = {
            0: "Verified",
            1: "Fake"
        }

        return label_news.get(predicted_class)
    

@app.route("/lime-algorithm", methods=["POST"])
def POST_Method():
    try:
        data = request.get_json()
        if not data or "input" not in data:
            return {"error": "Invalid request, 'input' is required"}, 400

        input_text = data["input"]
        

        explainer = LimeTextExplainer(
            class_names=["Verified","Fake"],  
            bow=False,  
            mask_string='[MASK]' 
        )


        exp = explainer.explain_instance(
            input_text, 
            prediction_function,
            num_features=5,
            num_samples=2000
        )

        local_fidelity = exp.score     
        lime_output = exp.as_list()
        pred_scores = prediction_function([input_text])[0]

        prediction_result = bert_response(input_text)

        class_idx = 0 if prediction_result == "Verified" else 1
    
        predicted_confidence = float(pred_scores[class_idx])
        
        response = {
            "LIMEOutput": lime_output,
            "rawPredictions": pred_scores.tolist(),  
            "AIResponse": prediction_result,
            "predicted_confidence": predicted_confidence,
            "local_fidelity": local_fidelity
        }
        return jsonify(response), 200 
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"Something went wrong: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)