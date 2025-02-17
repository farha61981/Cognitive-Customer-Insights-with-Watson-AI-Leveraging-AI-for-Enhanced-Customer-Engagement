from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# IBM Cloud API Key (Replace with your actual API key)
IBM_CLOUD_API_KEY = "6X4Ku6ke_nnHpZldiy6nqEkyTVlS42c_-rH_HSJ5GgSz"

# IBM Watson Machine Learning (WML) Deployment Details
DEPLOYMENT_ID = "7fc085b2-6164-42c7-a36a-c8060be63ddb"
DEPLOYMENT_ENDPOINT = f"https://us-south.ml.cloud.ibm.com/ml/v4/deployments/{deployment_id}/predictions?version=2021-05-01"

# Function to get IBM IAM Token
def get_iam_token():
    auth_url = "https://iam.cloud.ibm.com/identity/token"
    auth_response = requests.post(
        auth_url,
        data={"grant_type": "urn:ibm:params:oauth:grant-type:apikey", "apikey": IBM_CLOUD_API_KEY},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    return auth_response.json().get("access_token")

@app.route('/')
def home():
    return " IBM Cloud Flask API is running! Use `/predict` for predictions."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON input from request
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid request. No data received."}), 400

        # Get IAM Token
        iam_token = get_iam_token()
        headers = {"Authorization": f"Bearer {iam_token}", "Content-Type": "application/json"}

        # Send request to IBM Watson ML
        response = requests.post(DEPLOYMENT_ENDPOINT, json=data, headers=headers)

        # Return the prediction result
        return jsonify(response.json())

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)
