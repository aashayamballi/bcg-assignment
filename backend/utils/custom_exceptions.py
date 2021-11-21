from rest_framework.exceptions import APIException

class InvalidRequestBody(APIException):
    status_code = 400
    default_detail = 'Invalid request body'
    default_code = 'invaid_request'

class MethodNotAllowed(APIException):
    status_code = 405
    default_detail = 'Method not allowed'
    default_code = 'method_not_allowed'

class NotAcceptable(APIException):
    status_code = 406
    default_detail = 'Not Acceptable'
    default_code = 'not_acceptable'

class NotFound(APIException):
    status_code = 404
    default_detail = 'Not found'
    default_code = 'not_found'

class PermissionDenied(APIException):
    status_code = 403
    default_detail = 'Permission Denied'
    default_code = 'permission_denied'