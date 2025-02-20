import logging
from flask import Flask, request, jsonify
from flask_ngrok import run_with_ngrok
from pyngrok import ngrok
import requests

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)
run_with_ngrok(app)  # Automatically runs Ngrok when Flask starts


NGROK_AUTH_TOKEN = "2t7I3HEwJQ33BHNs82BS2QkOPCG_4CNYYC2DD5ww6ccPTefPw"
ngrok.set_auth_token(NGROK_AUTH_TOKEN)


IBM_CLOUD_API_KEY = "6X4Ku6ke_nnHpZldiy6nqEkyTVlS42c_-rH_HSJ5GgSz"
DEPLOYMENT_ID = "7fc085b2-6164-42c7-a36a-c8060be63ddb"
DEPLOYMENT_ENDPOINT = f"https://us-south.ml.cloud.ibm.com/ml/v4/deployments/{DEPLOYMENT_ID}/predictions?version=2021-05-01"


def get_iam_token():
    auth_url = "https://iam.cloud.ibm.com/identity/token"
    auth_response = requests.post(
        auth_url,
        data={"grant_type": "urn:ibm:params:oauth:grant-type:apikey", "apikey": IBM_CLOUD_API_KEY},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    return auth_response.json()["access_token"]


public_url = ngrok.connect(5000).public_url
print(f" Flask is running at: {public_url}")


@app.route('/')
def home():
    return f"Welcome to the Customer Insights API!"


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON Data
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid request. No data received."}), 400

        # Get IBM Watson ML IAM Token
        iam_token = get_iam_token()
        headers = {"Authorization": f"Bearer {iam_token}", "Content-Type": "application/json"}

        # Send request to IBM Watson ML
        response = requests.post(DEPLOYMENT_ENDPOINT, json=data, headers=headers)

        # Return IBM Watson Response
        return jsonify(response.json())

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
