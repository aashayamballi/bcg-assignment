from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    print('EXEC', exc)
    print('CONTEXT', context)
    
    response = exception_handler(exc, context)

    print('RESPONSE', response)
    print('STATUS CODE', response.status_code)

    return response