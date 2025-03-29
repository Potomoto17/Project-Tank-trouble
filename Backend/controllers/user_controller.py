import json

def login(data):
    if data["username"] == "user123" and data["password"] == "pass456":
        return json.dumps(dict(status="success", user_id=123))
    else:
        return json.dumps(dict(status="error", message="Invalid credentials"))