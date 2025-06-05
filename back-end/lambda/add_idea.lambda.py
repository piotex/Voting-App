import sys
import json
import boto3
import random

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
    idea_name = body.get('idea_name')
    idea_description = body.get('idea_description')
    ip_address = event['requestContext']['http']['sourceIp']

    if not idea_name or not idea_description:
        return {
        'statusCode': 404,
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'message': 'idea_name and idea_description are required'})
    }

    # ip_address = str(int(time.time() * 1000000))
    dynamodb = boto3.resource('dynamodb', region_name='eu-central-1') 
    table = dynamodb.Table('voting-app-idea-list')
    response = table.scan(
            ProjectionExpression='#id_attr',
            ExpressionAttributeNames={'#id_attr': 'id'}
        )
    items = response['Items']
    next_idea_id = max(item['id'] for item in items) + 1

    table = dynamodb.Table('voting-app-idea-list')
    table.put_item(Item={
        "id": next_idea_id,
        "name": idea_name,
        "description": idea_description,
        "background": generate_random_pastel_hex_color_no_libs()
    })

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
        },
        'body': json.dumps({'message': 'ok'})
    }
