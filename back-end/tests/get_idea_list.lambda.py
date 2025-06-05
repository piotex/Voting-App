import json
import sys
import boto3

# vote_list = [
#     {
#         "ip": '10.0.0.0',
#         "idea": 1
#     },
#     {
#         "ip": '10.0.0.1',
#         "idea": 2
#     },
#     {
#         "ip": '10.0.0.3',
#         "idea": 1
#     },
#     {
#         "ip": '10.0.0.4',
#         "idea": 1
#     }
# ]

# idea_list = [
#     {
#         "id": 1,
#         "name": "RenovaAI: Twój Inteligentny Remont Od A do Z",
#         "description": "Kompleksowa Platforma AI do Bezstresowych Remontów. Od Wizji po Realizację - Planowanie, Wykonawcy, Materiały w Jednym Miejscu.",
#         "background": "#D6F6D6"
#     },
#     {
#         "id": 2,
#         "name": "Klucz do Przyszłości. Odkryj Potęgę Technologii - Od Programowania po Cyberbezpieczeństwo",
#         "description": "Klucz do Przyszłości. Odkryj Potęgę Technologii - Od Programowania po Cyberbezpieczeństwo. Twoja Droga do Świata IT.",
#         "background": "#D6E8FF"
#     }
# ]

dynamodb = boto3.resource('dynamodb', region_name='eu-central-1') 
table_vote_list = dynamodb.Table('voting-app-vote-list')
table_idea_list = dynamodb.Table('voting-app-idea-list')

def lambda_handler(event, context):
    ip_address = event['requestContext']['http']['sourceIp']
    # ip_address = "10.0.0.4"

    vote_list = table_vote_list.scan()['Items']
    idea_list = table_idea_list.scan()['Items']
    
    idea_counts = {}
    selected_idea_id = -1
    for vote in vote_list:
        ip = vote['ip']
        idea = vote['idea']

        idea_counts[idea] = idea_counts.get(idea, 0) + 1
        if ip == ip_address:
            selected_idea_id = idea

    result_data = []
    for idea in idea_list:
        result_data.append({
            "idea_id": int(idea['id']),
            "idea_name": idea['name'],
            "idea_description": idea['description'],
            "idea_background": idea['background'],

            "idea_count": idea_counts.get(idea['id'], 0),
            "idea_is_selected": selected_idea_id != -1 and selected_idea_id == idea['id']
        })

    # print(json.dumps(result_data, indent=2), file=sys.stderr)
    return json.dumps(result_data)

# lambda_handler(None, None)



