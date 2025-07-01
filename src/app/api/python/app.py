
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

# Initialize client and clime with error handling
try:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable not set")
    client = genai.Client(api_key=api_key)
    clime = CLIMEWithLIME()
except Exception as e:
    print(f"Warning: Failed to initialize services: {e}")
    client = None
    clime = None

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint for Cloud Run"""
    return jsonify({"status": "healthy"}), 200

@app.route("/general", methods=["POST"])
def hello():    
    if not client or not clime:
        return jsonify({"error": "Services not properly initialized"}), 500
    
    data = request.get_json()
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        original_output = response.text

        def predict_fn(texts):
            with ThreadPoolExecutor() as executor:
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
    except Exception as e:
        return jsonify({"error": f"Failed to process request: {str(e)}"}), 500

@app.route("/summarize", methods=["POST"])
def ai_summarize():
    if not clime:
        return jsonify({"error": "Services not properly initialized"}), 500
        
    data = request.get_json()
    prompt = data.get("prompt", "")
    
    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    inference_endpoint = os.environ.get("MODEL_INFERENCE_ENDPOINT")
    if not inference_endpoint:
        return jsonify({"error": "MODEL_INFERENCE_ENDPOINT not configured"}), 500

    try:
        model_response = requests.post(
            inference_endpoint,
            json={"prompt": prompt},
            headers={"Content-Type": "application/json"},
            timeout=30  # Add timeout
        )
        model_response.raise_for_status()
        original_output = model_response.json().get("ai_response", "")

        # Define predict_fn for Cloud Run model
        def predict_fn(texts):
            def fetch_summary(txt):
                resp = requests.post(
                    inference_endpoint,
                    json={"prompt": txt},
                    headers={"Content-Type": "application/json"},
                    timeout=30
                )
                resp.raise_for_status()
                return resp.json().get("ai_response", "")

            with ThreadPoolExecutor() as executor:
                results = list(executor.map(fetch_summary, texts))
            return results

        explanation = clime.explain(prompt, original_output, predict_fn)
        print(explanation)
        return jsonify({
            "ai_response": original_output,
            "explanation": {
                "original_output": original_output,
                "explanation": explanation["explanation"]
            }
        })
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to call model endpoint: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Failed to process request: {str(e)}"}), 500

if __name__ == "__main__":
    print("Starting Flask app in development mode...")
    print(f"GEMINI_API_KEY set: {'Yes' if os.environ.get('GEMINI_API_KEY') else 'No'}")
    print(f"MODEL_INFERENCE_ENDPOINT set: {'Yes' if os.environ.get('MODEL_INFERENCE_ENDPOINT') else 'No'}")
    app.run(host='0.0.0.0', port=8080, debug=False)
