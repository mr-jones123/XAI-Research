from groq import Groq
from lime.lime_text import LimeTextExplainer
from transformers import AutoModelForSequenceClassification,AutoTokenizer
import torch.nn.functional as F
import torch
import numpy as np
from flask import Flask, request, jsonify   
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
try:
    tokenizer = AutoTokenizer.from_pretrained("nlptown/bert-base-multilingual-uncased-sentiment")
    model = AutoModelForSequenceClassification.from_pretrained("nlptown/bert-base-multilingual-uncased-sentiment")
    print("Model and tokenizer loaded successfully!")
except Exception as e:
    print(f"Error loading model and tokenizer: {e}")

def lime_prediction_function(text_inputs):
    prob_scores = []
    for text in text_inputs:
        inputs = tokenizer(text, return_tensors="pt", truncation=True)
        input_ids = inputs.input_ids
    
        with torch.no_grad():
            outputs = model(input_ids)
        
        logits = outputs.logits
        softmax_probs = F.softmax(logits, dim=-1)
        
        # Get the probability scores for each class
        prob_scores.append(softmax_probs[0].tolist())

    return np.array(prob_scores)  # Convert to NumPy array for LIME compatibility

def gptResponse(text):
    # For sentiment analysis, we'll use the model's classification capabilities
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)
        predicted_class = torch.argmax(probabilities, dim=-1).item()
        
        # Map the predicted class to a sentiment response
        sentiment_responses = {
            0: "This text expresses very negative sentiment.",
            1: "This text expresses negative sentiment.",
            2: "This text expresses neutral sentiment.",
            3: "This text expresses positive sentiment.",
            4: "This text expresses very positive sentiment."
        }
        return sentiment_responses.get(predicted_class, "Unable to determine sentiment.")

# Handle POST request from the user and passes it back onto the route.ts backend
@app.route("/lime-algorithm", methods=["POST"])
def limeAlgorithm():
    try: 
        data = request.get_json()  # Get JSON data from the request
        if not data or "input" not in data:
            return {"error": "Invalid request, 'input' is required"}, 400
        
        input_text = data["input"]
        explainer = LimeTextExplainer(class_names=["Important", "Not Important"])

        # Generate an explanation for the comment
        exp = explainer.explain_instance(input_text, lime_prediction_function, num_features=5, num_samples=100)
        
        response = {
            "LIMEOutput": exp.as_list(), # Make sure 'LIMEOutput' exists in response
            "AIResponse" : gptResponse(input_text)
        }
        return response, 200   # Return JSON response with status 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Something went wrong. Try again later."}), 500

app.run()
