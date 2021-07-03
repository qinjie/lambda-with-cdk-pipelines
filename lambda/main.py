def handler(event, context):
    message = 'Hello {} {}!'.format(event.get('first_name','FirstNmae'), event.get('last_name', 'LastName'))
    return {
        'message': message
    }
