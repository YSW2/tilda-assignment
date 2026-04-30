from typing import Dict
from app.models import UserInDB

users_db: Dict[str, UserInDB] = {}

def get_user(email: str):
    return users_db.get(email)

def create_user(email: str, name: str, hashed_password: str):
    if email in users_db:
        raise ValueError("이미 존재하는 이메일입니다")
    
    user = UserInDB(email=email, name=name, hashed_password=hashed_password)
    users_db[email] = user
    return user
