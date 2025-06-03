from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000"]}})

idea_list = [
    {
        "idea_id": 1,
        "idea_name": "RenovaAI: Twój Inteligentny Remont Od A do Z",
        "idea_description": "Kompleksowa Platforma AI do Bezstresowych Remontów. Od Wizji po Realizację - Planowanie, Wykonawcy, Materiały w Jednym Miejscu.",
        "idea_background": "#D6F6D6"
    },
    {
        "idea_id": 2,
        "idea_name": "RenovaAI: Kompleksowa Platforma AI do Bezstresowych Remontów. Od Wizji po Realizację - Planowanie, Wykonawcy, Materiały w Jednym Miejscu.",
        "idea_description": "Kompleksowa Platforma AI do Bezstresowych Remontów. Od Wizji po Realizację - Planowanie, Wykonawcy, Materiały w Jednym Miejscu.",
        "idea_background": "#F8A1A1"
    },
    {
        "idea_id": 3,
        "idea_name": "konstantynopolitańczykowianeczka A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z.",
        "idea_description": "Od Sadu do Stołu - Odkryj Smak, Zdrowie i Historię Najpopularniejszych Jego Owocu. Przewodnik po Jabłkach: Od Uprawy po Przepisy.",
        "idea_background": "#FFEFCD"
    },
    {
        "idea_id": 4,
        "idea_name": "Klucz do Przyszłości. Odkryj Potęgę Technologii - Od Programowania po Cyberbezpieczeństwo",
        "idea_description": "Klucz do Przyszłości. Odkryj Potęgę Technologii - Od Programowania po Cyberbezpieczeństwo. Twoja Droga do Świata IT.",
        "idea_background": "#D6E8FF"
    },
    {
        "idea_id": 5,
        "idea_name": "Naucz Się Cieszyć Chwilą, Relaksować i Odnajdź Spokój Wraz ze Swoim",
        "idea_description": "Naucz Się Cieszyć Chwilą, Relaksować i Odnajdź Spokój Wraz ze Swoim. Przewodnik po Mindfulness i Medytacji.",
        "idea_background": "#FDF6D6"
    },
    {
        "idea_id": 6,
        "idea_name": "Poznaj Niezwykły Świat Mruczących Przyjaciół. Od Dzikich Łowców po Domowe Pieszczochy",
        "idea_description": "Poznaj Niezwykły Świat Mruczących Przyjaciół. Od Dzikich Łowców po Domowe Pieszczochy. Przewodnik po Kocich Tajemnicach.",
        "idea_background": "#DCDCF6"
    }
]

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

idea_list_dict = {idea['idea_id']: idea for idea in idea_list}


@app.route('/get_idea_list', methods=['GET'])
def get_idea_list():
    ip_address = request.remote_addr
    result = {}
    for key, value in vote_list.items():
        if value not in result:
            result[value] = 0
        result[value] += 1     # 6 : 153


    result_data = []
    for idea_id, idea_count in result.items():
        result_data.append({
            "idea_id": idea_id,
            "idea_name": idea_list_dict[idea_id]['idea_name'],
            "idea_description": idea_list_dict[idea_id]['idea_description'],
            "idea_background": idea_list_dict[idea_id]['idea_background'],
            "idea_count": idea_count,
            "idea_is_selected": ip_address in vote_list and vote_list[ip_address] == idea_id
        })
    return jsonify(result_data)

@app.route('/vote/<option>', methods=['POST'])
def vote(option):
    if not option or not option.isdigit():
        return jsonify({'error': 'Invalid option'}), 400
    
    option = int(option)
    if (option) not in idea_list_dict:
        return jsonify({'error': 'Invalid option'}), 400
    
    ip_address = request.remote_addr
    # ip_address = int(time.time() * 1000000)         # workaround for my ip address
    vote_list[ip_address] = int(option)
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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')