!pip install flask flask-ngrok pyngrok requests
!pip install flask flask-cors
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/')
def home():
    return " Welcome to the Customer Churn Prediction API! Use /predict endpoint."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid request. No data received."}), 400

        response = {
            "predictions": [
                {
                    "fields": ["prediction", "confidence"],
                    "values": [["No", 0.85]]
                }
            ]
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Start Flask Server
from google.colab.output import eval_js
print("🚀 Flask API is starting... Click the link below when ready.")

def get_public_url(port=5000):
    return eval_js(f"google.colab.kernel.proxyPort({port})")

app.run(host='0.0.0.0', port=5000)
