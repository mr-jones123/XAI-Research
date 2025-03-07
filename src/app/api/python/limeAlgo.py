from groq import Groq
from lime.lime_text import LimeTextExplainer
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch.nn.functional as F
import torch
import numpy as np
from flask import Flask, request, jsonify   

app = Flask(__name__)

from transformers import AutoTokenizer, AutoModelForCausalLM
try:
    tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")
    model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")
    print("Model and tokenizer loaded successfully!")
except Exception as e:
    print(f"Error loading model and tokenizer: {e}")

def lime_prediction_function(text_inputs):
      # The quick brown fox
    prob_scores = []
    for text in text_inputs:
        # Tokenize input
        inputs = tokenizer(text, return_tensors="pt", truncation=True)
        input_ids = inputs.input_ids # indicies for tokens
    
        with torch.no_grad():
            outputs = model(input_ids)   # turn tokens into logits
        
        logits = outputs.logits   
        softmax_probs = F.softmax(logits, dim=-1)  # Convert logits to probabilities
        
        # Get probability of the most likely next token
        last_token_id = input_ids[0, -1]  
        last_token_prob = softmax_probs[0, -2, last_token_id]  
        
        prob_scores.append([last_token_prob.item(), 1 - last_token_prob.item()])

    return np.array(prob_scores)  # Convert to NumPy array for LIME compatibility

def gptResponse(text):
    inputs = tokenizer.encode(text, return_tensors="pt")
    outputs = model.generate(inputs, max_length=200, do_sample=True, num_beams=5, no_repeat_ngram_size=2, early_stopping=True)
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    # printing output
    return text 

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
