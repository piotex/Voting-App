import sys
import boto3

def init_voting_app_idea_list():
    data = [
        {   
            "id": 1,
            "name": "RenovaAI: Twój Inteligentny Remont Od A do Z",
            "description": "Kompleksowa Platforma AI do Bezstresowych Remontów. Od Wizji po Realizację - Planowanie, Wykonawcy, Materiały w Jednym Miejscu.",
            "background": "#D6F6D6"
        },
        {
            "id": 2,
            "name": "Klucz do Przyszłości. Odkryj Potęgę Technologii - Od Programowania po Cyberbezpieczeństwo",
            "description": "Klucz do Przyszłości. Odkryj Potęgę Technologii - Od Programowania po Cyberbezpieczeństwo. Twoja Droga do Świata IT.",
            "background": "#D6E8FF"
        }
    ]
    dynamodb = boto3.resource('dynamodb', region_name='eu-central-1') 
    table = dynamodb.Table('voting-app-idea-list')
    for item in data:
        table.put_item(Item=item)
    print("Voting app idea list initialized.", file=sys.stderr)

def init_voting_app_vote_list():
    data = [
        {   
            "ip": '10.0.0.0',
            "idea": 1
        },
        {   
            "ip": '10.0.0.1',
            "idea": 2
        },
    ]
    dynamodb = boto3.resource('dynamodb', region_name='eu-central-1') 
    table = dynamodb.Table('voting-app-vote-list')
    for item in data:
        table.put_item(Item=item)
    print("Voting app vote list initialized.", file=sys.stderr)

init_voting_app_idea_list()
init_voting_app_vote_list()




# response = table.scan()
# vote_list = response['Items']
# print(vote_list, file=sys.stderr)