from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth
import os

app = FastAPI(
    title="Tilda Assignment API",
    description="회원가입/로그인 API",
    version="1.0.0"
)

# CORS 설정 - 환경변수로 허용 오리진 설정
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

# 헬스체크
@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=3001, reload=True)