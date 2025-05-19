from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import time



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000"]}})
votes = {
    "10.10.10.10": "Pomysł na milion",
    "10.10.10.11": "Pomysł na milion",
    "127.0.0.11": "Pomysł na 5000",
    "127.0.0.12": "Pomysł na 5000",
    "127.0.0.13": "Pomysł na 5000",
    "127.0.0.14": "Pomysł na 5003",
}


@app.route('/vote/<option>', methods=['POST'])
def vote(option):
    ip_address = request.remote_addr
    votes[ip_address] = option
    return jsonify({'message': f'Vote for {option} recorded.'})


@app.route('/add_idea', methods=['POST'])
def add_idea():
    ip_address = request.remote_addr
    ip_address = int(time.time() * 1000000)
    data = request.get_json()
    idea_name = data.get('idea_name')
    if not idea_name:
        return jsonify({"error": "Nazwa idei jest wymagana"}), 400
    votes[ip_address] = idea_name
    return jsonify({"vote": idea_name})


@app.route('/get_idea_selected', methods=['GET'])
def get_selected_idea():
    ip_address = request.remote_addr
    if ip_address not in votes:
        return jsonify({"vote": ""})
    return jsonify({"vote": votes[ip_address]})


@app.route('/get_idea_list', methods=['GET'])
def get_idea_list():
    result = {}
    for key, value in votes.items():
        if value not in result:
            result[value] = 0
        result[value] += 1
    result_data = []
    for idea_name, idea_count in result.items():
        result_data.append({
            "idea_name": idea_name,
            "idea_count": idea_count
        })
    return jsonify(result_data)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
