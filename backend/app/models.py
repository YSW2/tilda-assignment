from pydantic import BaseModel, EmailStr, field_validator
import re

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

    @field_validator('password')
    @classmethod
    def validate_password(cls, v: str):
        if len(v) < 8:
            raise ValueError('비밀번호는 최소 8자 이상이어야 합니다')
        
        #영문, 숫자 ,특수문자 포함 검증
        if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$', v):
            raise ValueError('비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다')
        return v
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str):
        if ' ' in v:
            raise ValueError('이름에 공백을 포함할 수 없습니다')
        if not 2 <= len(v) <= 8:
            raise ValueError('이름은 2자 이상 8자 이하여야 합니다')
        return v
    
class UserInDB(UserBase):
    hashed_password: str

class UserResponse(UserBase):
    pass

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    success: bool
    token: str
    user: UserResponse

class UpdateNameRequest(BaseModel):
    name: str
    
    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        if ' ' in v:
            raise ValueError('이름에 공백을 포함할 수 없습니다')
        if not 2 <= len(v) <= 8:
            raise ValueError('이름은 2자 이상 8자 이하여야 합니다')
        return v

class UpdatePasswordRequest(BaseModel):
    currentPassword: str
    newPassword: str
    
    @field_validator('newPassword')
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError('비밀번호는 최소 8자 이상이어야 합니다')
        if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$', v):
            raise ValueError('비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다')
        return v

class SuccessResponse(BaseModel):
    success: bool
    message: str

class ErrorResponse(BaseModel):
    success: bool
    message: str