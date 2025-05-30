from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000"]}})

idea_list = {
    1: "RenovaAI: Twój Inteligentny Remont Od A do Z",
    2: "RenovaAI: Kompleksowa Platforma AI do Bezstresowych Remontów. Od Wizji po Realizację - Planowanie, Wykonawcy, Materiały w Jednym Miejscu.",
    3: "Od Sadu do Stołu - Odkryj Smak, Zdrowie i Historię Najpopularniejszych Jego Owocu",
    4: "Klucz do Przyszłości. Odkryj Potęgę Technologii - Od Programowania po Cyberbezpieczeństwo",
    5: "Naucz Się Cieszyć Chwilą, Relaksować i Odnajdź Spokój Wraz ze Swoim",
    6: "Poznaj Niezwykły Świat Mruczących Przyjaciół. Od Dzikich Łowców po Domowe Pieszczochy",
}

vote_list = {
    "10.10.10.1": 1,
    "10.10.10.2": 1,
    "10.10.10.3": 1,
    "10.10.11.1": 2,
    "10.10.11.2": 2,
    "10.10.11.3": 2,
    "10.10.11.4": 2,
    "10.10.11.5": 2,
    "10.10.11.6": 2,
    "10.10.11.7": 2,
    "10.10.11.8": 2,
    "10.10.12.1": 3,
    "10.10.12.2": 3,
    "10.10.12.3": 3,
    "10.10.12.4": 3,
    "10.10.12.5": 3,
    "10.10.13.1": 4,
    "10.10.13.2": 4,
    "10.10.13.3": 4,
    "10.10.13.4": 4,
    "10.10.13.5": 4,
    "10.10.13.6": 4,
    "10.10.13.7": 4,
    "10.10.14.1": 5,
    "10.10.14.2": 5,
    "10.10.14.3": 5,
    "10.10.14.4": 5,
    "10.10.15.1": 6,
    "10.10.15.2": 6,
    "10.10.15.3": 6,
    "10.10.15.4": 6,
    "10.10.15.5": 6,
    "10.10.15.6": 6,
    "10.10.15.7": 6,
    "10.10.15.8": 6,
    "10.10.15.9": 6,
    "10.10.15.10": 6,
    "10.10.15.11": 6,
    "10.10.15.12": 6,
    "10.10.15.13": 6,
    "10.10.15.14": 6,
    "10.10.15.15": 6,
}


@app.route('/get_idea_list', methods=['GET'])
def get_idea_list():
    result = {}
    for key, value in vote_list.items():
        if value not in result:
            result[value] = 0
        result[value] += 1     # 6 : 153

    result_data = []
    for idea_id, idea_count in result.items():
        result_data.append({
            "idea_id": idea_id,
            "idea_name": idea_list[idea_id],
            "idea_count": idea_count
        })
    return jsonify(result_data)

@app.route('/vote/<option>', methods=['POST'])
def vote(option):
    if option not in idea_list:
        return jsonify({'error': 'Invalid option'}), 400
    ip_address = request.remote_addr
    vote_list[ip_address] = option
    return jsonify({'message': f'Vote for {option} recorded.'})


@app.route('/add_idea', methods=['POST'])
def add_idea():
    ip_address = request.remote_addr
    ip_address = int(time.time() * 1000000)         # workaround for my ip address
    data = request.get_json()
    idea_id = data.get('idea_id')
    if not idea_id:
        return jsonify({"error": "Idea name is required"}), 400
    vote_list[ip_address] = idea_id
    return jsonify({"vote": idea_id})


@app.route('/get_selected_idea', methods=['GET'])
def get_selected_idea():
    ip_address = request.remote_addr
    if ip_address not in vote_list:
        return jsonify({"vote": ""})
    return jsonify({"vote": vote_list[ip_address]})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')