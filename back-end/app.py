from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000"]}})
votes = {
    "10.10.10.10": "Pomysł na milion",
    "10.0.0.11": "Pomysł na milion",
    "127.0.0.1": "Pomysł na 5000",
    "127.0.0.2": "Pomysł na 5000",
    "127.0.0.3": "Pomysł na 5000",
    "127.0.0.4": "Pomysł na 5003",
}


@app.route('/vote/<option>', methods=['POST'])
def vote(option):
    ip_address = request.remote_addr
    votes[ip_address] = option
    return jsonify({'message': f'Vote for {option} recorded.'}), 201


@app.route('/get_selected_idea', methods=['GET'])
def get_selected_idea():
    return jsonify(votes["10.0.0.11"])


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
