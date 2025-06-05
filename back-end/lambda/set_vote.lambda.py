import sys
import json
import boto3


def lambda_handler(event, context):
    http_method = event.get('requestContext', {}).get('http', {}).get('method')
    if http_method == 'OPTIONS':
        print("Received an OPTIONS request", file=sys.stderr)
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', 
                'Access-Control-Allow-Methods': 'POST, OPTIONS', 
                'Access-Control-Allow-Headers': 'Content-Type', 
            },
            'body': '' 
        }

    body = json.loads(event['body'])
    vote = body.get('vote')
    ip_address = event['requestContext']['http']['sourceIp']

    dynamodb = boto3.resource('dynamodb', region_name='eu-central-1') 
    table = dynamodb.Table('voting-app-vote-list')
    table.put_item(Item=
        {   
            "ip": ip_address,
            "idea": vote
        })

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'message': 'ok'})
    }
