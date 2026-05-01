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

def update_user_name(email: str, new_name: str) -> UserInDB:
    user = users_db.get(email)
    if not user:
        raise ValueError("사용자를 찾을 수 없습니다")
    
    user.name = new_name
    users_db[email] = user
    return user

def update_user_password(email: str, new_hashed_password: str) -> UserInDB:
    user = users_db.get(email)
    if not user:
        raise ValueError("사용자를 찾을 수 없습니다")
    
    user.hashed_password = new_hashed_password
    users_db[email] = user
    return user