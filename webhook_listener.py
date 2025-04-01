from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.get_json()  # Get the JSON data from the incoming request
    print("Received alert:")
    print(json.dumps(data, indent=2))  # Pretty-print the JSON alert data
    return '', 200  # Respond with a success status

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8085)  # Run the Flask app on port 8085
