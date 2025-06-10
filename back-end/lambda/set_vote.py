import sys
import json
import boto3

dynamodb = boto3.resource('dynamodb', region_name='eu-central-1') 
table = dynamodb.Table('voting-app-vote-list')

def get_ip_address(event):
    tmp = event.get('requestContext', {}).get('http', {}).get('sourceIp')
    if tmp:
        return tmp
    tmp = event.get('requestContext', {}).get('identity', {}).get('sourceIp')
    if tmp:
        return tmp
    print(f"IP address not found in event. event: {event}", file=sys.stderr)

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

    ip_address = get_ip_address(event)
    body = json.loads(event['body'])
    vote = body.get('vote')

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
