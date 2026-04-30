from fastapi import APIRouter, HTTPException, status, Depends
from app.models import (
    UserCreate, LoginRequest, LoginResponse, UserResponse,SuccessResponse
)
from app.database import get_user, create_user
from app.auth import (
    verify_password, get_password_hash, create_access_token, get_current_user
)


router = APIRouter(prefix="/api/auth", tags=["auth"])

#회원가입
@router.post("/signup", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    try:
        hashed_password = get_password_hash(user_data.password)
        create_user(
            email=user_data.email,
            name=user_data.name,
            hashed_password=hashed_password
        )
        return SuccessResponse(success=True, message="회원가입이 완료되었습니다")
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    
#로그인
@router.post("/login", response_model=LoginResponse)
async def login(login_data: LoginRequest):
    user = get_user(login_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="이메일 또는 비밀번호가 잘못되었습니다"
        )
    
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="이메일 또는 비밀번호가 잘못되었습니다"
        )

    token = create_access_token(user.email, user.name)

    return LoginResponse(
        success=True,
        token=token,
        user=UserResponse(email=user.email, name=user.name)
    )

#본인 정보 조회
@router.get("/me", response_model=dict)
async def get_me(current_user: UserResponse = Depends(get_current_user)):
    return {"success": True, "user": current_user}