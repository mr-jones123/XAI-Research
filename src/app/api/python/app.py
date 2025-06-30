
from flask import Flask, jsonify, request
from flask_cors import CORS 
from google import genai
from dotenv import load_dotenv
import os
import requests
from c_lime import CLIMEWithLIME
from concurrent.futures import ThreadPoolExecutor

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
clime = CLIMEWithLIME()

@app.route("/general", methods=["POST"])
def hello():    
    data = request.get_json()
    prompt = data.get("prompt", "")

    # Get original output from Gemini
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )
    original_output = response.text

    # Define predict_fn for Gemini
    def predict_fn(texts):
        with ThreadPoolExecutor() as executor:
            # Use a list comprehension to submit all tasks to the executor
            # and then get the results.
            results = list(executor.map(
                lambda txt: client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=txt
                ).text,
                texts
            ))
        return results

    # Run C-LIME
    explanation = clime.explain(prompt, original_output, predict_fn)
    
    return jsonify({
        "ai_response": original_output,
        "explanation": {
            "original_output": original_output,
            "explanation": explanation["explanation"]
        }
    })

@app.route("/summarize", methods=["POST"])
def ai_summarize():
    data = request.get_json()
    prompt = data.get("prompt", "")

    # Get summary from Cloud Run model
    model_response = requests.post(
        os.environ["MODEL_INFERENCE_ENDPOINT"],
        json={"prompt": prompt},
        headers={"Content-Type": "application/json"},
    )
    model_response.raise_for_status()
    original_output = model_response.json().get("ai_response", "")

    # Define predict_fn for Cloud Run model
    def predict_fn(texts):
        def fetch_summary(txt):
            resp = requests.post(
                os.environ["MODEL_INFERENCE_ENDPOINT"],
                json={"prompt": txt},
                headers={"Content-Type": "application/json"},
            )
            resp.raise_for_status()
            return resp.json().get("ai_response", "")

        with ThreadPoolExecutor() as executor:
            results = list(executor.map(fetch_summary, texts))
        return results



    # Run C-LIME
    explanation = clime.explain(prompt, original_output, predict_fn)
    print(explanation)
    return jsonify({
        "ai_response": original_output,
        "explanation": {
            "original_output": original_output,
            "explanation": explanation["explanation"]
        }
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
