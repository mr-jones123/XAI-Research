from flask import Flask, request, jsonify
app = Flask(__name__) # start flask app

@app.route("/lime-prediction", methods=['POST'])    
def lime_prediction():
    data = request.get_json()
    return data

if __name__ == '__main__':  
   app.run() 