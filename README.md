## Data sent from frontend to backend:

1. Login: (POST /login)
    {username: string, password: string}

2. Register: (POST /login)
    {username: string, password: string}

3. Dashboard (GET /dashboard)
    includes a token inside the authorization header

## Data sent from backend to frontend:

1. Login: (POST /login):
    if success:
        status: 200 OK
        data: {
            'message': 'User logged in successfully',
            'token': a generated JWT token
        }

    if failure:
        status: 401 Unauthorized
        data: {
            'message': 'Invalid credentials'
        }

2. Register: (POST /register)
    if success:
        status: 201 created
        data: {
            message: 'User registered successfully'
            user: {
                'id': user.id
                'username': user.username
            }
            token: a generated JWT token
        }

    if failure:
        status: 400 bad request
        data: {
            message: 'Failed to create user'
        }

