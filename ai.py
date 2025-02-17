from flask import Flask, request, jsonify

# Initialize Flask App
app = Flask(__name__)

@app.route('/')
def home():
    return " Welcome to the Customer Churn Prediction API! Use /predict endpoint."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid request. No data received."}), 400

        # Dummy prediction response
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

# Run Flask Server on Port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
