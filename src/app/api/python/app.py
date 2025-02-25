from flask import Flask, request, jsonify
from transformers import pipeline
app = Flask(__name__) # start flask app

@app.route("/lime-prediction", methods=['POST'])    
def limePrediction():
    response = request.get_json()
    return response


# for testing
@app.route("/sentimental", methods=['POST'])
def sentimentalAnalysis():
    sentimentPipeline = pipeline("sentiment-analysis")
    result = sentimentPipeline(request)
    return result

if __name__ == '__main__':  
   app.run()