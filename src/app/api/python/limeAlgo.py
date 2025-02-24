import lime
from lime.lime_text import LimeTextExplainer
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch.nn.functional as F
import torch
import numpy as np
from flask import Flask, request, jsonify   

app = Flask(__name__)

tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

def lime_prediction_function(text_inputs):
    # probability scores
    prob_scores = []
    
    for text in text_inputs:
        # Tokenize input
        inputs = tokenizer(text, return_tensors="pt", truncation=True)
        input_ids = inputs.input_ids
    
        with torch.no_grad():
            outputs = model(input_ids)
        
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
        explainer = LimeTextExplainer(class_names=["Not Important", "Important"])

        # Generate an explanation for the comment
        exp = explainer.explain_instance(input_text, lime_prediction_function, num_features=5, num_samples=30)
        
        response = {
            "LIMEOutput": exp.as_list(), # Make sure 'LIMEOutput' exists in response
            "AIResponse" : gptResponse(input_text)
        }
        return jsonify(response), 200   # Return JSON response with status 200
    except:
        return "Something went wrong. Try again later."

if __name__ == "__main__":
    app.run()
