from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000"]}})

def generate_random_pastel_hex_color_no_libs():
    hue = random.randint(0, 359)
    saturation = random.randint(20, 50)
    lightness = random.randint(75, 90)

    h = hue / 360.0
    s = saturation / 100.0
    l = lightness / 100.0

    if s == 0:
        r_norm, g_norm, b_norm = l, l, l
    else:
        def hue_to_rgb(p, q, t):
            if t < 0: t += 1
            if t > 1: t -= 1
            if t < 1/6: return p + (q - p) * 6 * t
            if t < 1/2: return q
            if t < 2/3: return p + (q - p) * (2/3 - t) * 6
            return p

        q = l * (1 + s) if l < 0.5 else l + s - l * s
        p = 2 * l - q

        r_norm = hue_to_rgb(p, q, h + 1/3)
        g_norm = hue_to_rgb(p, q, h)
        b_norm = hue_to_rgb(p, q, h - 1/3)

    r = round(r_norm * 255)
    g = round(g_norm * 255)
    b = round(b_norm * 255)

    r = max(0, min(255, r))
    g = max(0, min(255, g))
    b = max(0, min(255, b))

    hex_color = '#{:02x}{:02x}{:02x}'.format(r, g, b)
    return hex_color

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


@app.route('/get_idea_list', methods=['GET'])
def get_idea_list():
    ip_address = request.remote_addr
    
    idea_counts = {}
    for idea_id in vote_list.values():
        idea_counts[idea_id] = idea_counts.get(idea_id, 0) + 1

    result_data = []
    for idea in idea_list:
        result_data.append({
            "idea_id": idea['idea_id'],
            "idea_name": idea['idea_name'],
            "idea_description": idea['idea_description'],
            "idea_background": idea['idea_background'],
            "idea_count": idea_counts.get(idea['idea_id'], 0),
            "idea_is_selected": ip_address in vote_list and vote_list[ip_address] == idea['idea_id']
        })
    
    return jsonify(result_data)

@app.route('/vote/<int:option_id>', methods=['POST'])
def vote(option_id):
    idea_id_list =  [idea['idea_id'] for idea in idea_list]
    if option_id not in idea_id_list:
        return jsonify({'error': 'Invalid option ID'}), 400
    
    ip_address = request.remote_addr
    # ip_address = str(int(time.time() * 1000000)) 

    vote_list[ip_address] = option_id
    return jsonify({'message': f'Vote for {option_id} recorded.'})

@app.route('/add_idea', methods=['POST'])
def add_idea():
    data = request.get_json()
    if data.get('idea_name') in [idea['idea_name'] for idea in idea_list]:
        return jsonify({"error": "Idea with this name already exists"}), 400
    if not 'idea_name' in data or not 'idea_description' in data or not data.get('idea_name') or not data.get('idea_description'):
        return jsonify({"error": "Idea name and description are required"}), 400

    ip_address = request.remote_addr
    # ip_address = str(int(time.time() * 1000000))
    idea_name = data.get('idea_name')
    idea_description = data.get('idea_description')
    next_idea_id = max(idea['idea_id'] for idea in idea_list) + 1
    new_idea = {
        "idea_id": next_idea_id,
        "idea_name": idea_name,
        "idea_description": idea_description,
        "idea_background": generate_random_pastel_hex_color_no_libs()
    }
    idea_list.append(new_idea)
    vote_list[ip_address] = next_idea_id
    return jsonify({"message": "Idea added successfully", "idea_id": next_idea_id}), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')