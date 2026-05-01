# Tilda Assignment

의료기관종별 진료과목별 진료비 통계 대시보드 및 회원 관리 시스템

## 배포 URL

- **프론트엔드**: https://tilda-assignment-virid.vercel.app/
- **백엔드**: https://tilda-assignment-hrgx.onrender.com

> Render 무료 플랜 특성상 백엔드 첫 요청 시 cold start로 인해 30초~1분 정도 지연될 수 있습니다.

---

## 실행 방법

### Docker

```bash
# 1. 프로젝트 루트에 .env 파일 생성
echo "VITE_OPENAPI_SERVICE_KEY=발급받은_API_키" > .env

# 2. 빌드 및 실행
docker compose up -d --build

# 3. 접속
# 프론트엔드: http://localhost:3000
# 백엔드: http://localhost:3001
```

> 공공데이터포털(https://www.data.go.kr)에서 "의료기관종별 진료과목별 진료비 통계" API 키를 발급받아 사용합니다.

### 로컬 개발

```bash
# 백엔드
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 3001 --reload

# 프론트엔드
cd frontend
npm install
# frontend/.env 파일에 VITE_OPENAPI_SERVICE_KEY 설정 필요
npm run dev
```

## API 명세표

https://tilda-assignment-hrgx.onrender.com/docs

---

## 기술 스택

| 구분        | 기술                                       |
| ----------- | ------------------------------------------ |
| 프론트엔드  | React 19, TypeScript, Vite, Tailwind CSS 4 |
| 상태관리    | Zustand                                    |
| 데이터 패칭 | TanStack React Query                       |
| 테이블      | TanStack React Table                       |
| 차트        | Chart.js + react-chartjs-2                 |
| 폼 검증     | 커스텀 훅 (useLoginForm, useSignupForm 등) |
| 백엔드      | FastAPI, Python 3.11                       |
| 인증        | JWT (python-jose), bcrypt                  |
| 배포        | Vercel (프론트), Render (백엔드)           |
| 컨테이너    | Docker, Docker Compose                     |

---

## 핵심 구현 설명

### 1. 테이블의 데이터 전략 — 전체 fetch + 클라이언트 페이지네이션

테이블에서 정렬 기능을 구현하기 위해, 서버 페이지네이션 대신 전체 데이터를 한 번에 가져온 뒤 클라이언트에서 페이지네이션하는 방식을 선택했습니다.

서버 페이지네이션으로 100건씩 가져오면, 정렬이 해당 페이지 내에서만 적용됩니다. 예를 들어 "환자수 내림차순"으로 정렬해도 현재 페이지의 100건만 정렬되므로, 전체 데이터 기준으로 환자수가 가장 많은 항목을 찾을 수 없습니다. 전체 데이터를 fetch한 뒤 TanStack Table의 `getSortedRowModel`과 `getPaginationRowModel`을 조합하면, 전체 데이터 기준 정렬 후 페이지 단위로 나눠 보여줄 수 있습니다.

같은 이유로 무한스크롤 대신 페이지네이션을 선택했습니다. 무한스크롤은 이미 로드된 데이터만 정렬 가능하고, 새로 로드될 데이터는 정렬 순서에 반영되지 않기 때문입니다.

### 2. 차트와 테이블의 데이터 요청 방식이 다른 이유

차트는 `perPage=10`으로 서버 페이지네이션을, 테이블은 `perPage=5000`으로 전체 데이터를 요청합니다.

차트에 수백 개의 데이터를 한 번에 표시하면 X축 라벨이 겹쳐서 가독성이 떨어집니다. 10개씩 페이지네이션하면 각 진료과목의 라벨과 데이터 포인트를 명확히 읽을 수 있습니다. 반면 테이블은 위에서 설명한 정렬 기능을 위해 전체 데이터가 필요합니다.

또한 차트에서는 React Query의 `placeholderData: (prev) => prev` 옵션을 사용하여, 페이지 전환 시 이전 데이터를 유지하면서 새 데이터를 fetch합니다. 이를 통해 차트가 빈 화면으로 깜빡이는 현상을 방지했습니다.

### 3. 인증 상태를 `null | boolean`으로 설계한 이유

`isAuthenticated` 상태를 `boolean`이 아닌 `null | boolean`으로 설계했습니다.

앱이 처음 로드될 때 localStorage에서 토큰을 아직 확인하지 않은 상태와, 확인 후 인증되지 않은 상태를 구분해야 합니다. 만약 초기값을 `false`로 두면, App 컴포넌트가 마운트되고 `initialize()`가 호출되기 전에 ProtectedRoute가 `false`를 읽어서 로그인 페이지로 리다이렉트합니다. 이미 로그인한 사용자가 마이페이지를 새로고침하면 잠깐 로그인 페이지가 보이는 문제가 발생합니다.

`null`은 "아직 확인 중"을 의미하며, ProtectedRoute에서 `null`일 때는 아무것도 렌더링하지 않아서 위 문제를 방지합니다.

### 4. JWT를 localStorage에 저장한 이유

일반적으로 JWT는 HttpOnly 쿠키에 저장하는 것이 XSS 공격에 대해 더 안전합니다. 하지만 쿠키 기반 인증을 안전하게 사용하려면 Secure 속성이 필요하고, 이는 HTTPS 환경에서만 동작합니다. 로컬 개발 환경에서 HTTPS를 구축하려면 자체 서명 인증서 생성, 브라우저 신뢰 설정 등 추가 작업이 필요하며, 이전에 HTTP 환경에서 Secure 쿠키가 전송되지 않아 인증이 실패하는 문제를 경험한 적이 있습니다.
이번 과제는 로컬에서 Docker로 실행하여 테스트하는 환경이라고 판단했습니다. 그래서 설정 없이도 안정적으로 동작하는 localStorage 저장 방식을 선택했습니다.

---

## 프로젝트 구조

```
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py            # FastAPI 앱 진입점
│       ├── auth.py            # JWT 토큰 생성/검증
│       ├── database.py        # In-memory DB
│       ├── models.py          # Pydantic 모델 및 유효성 검사
│       └── routers/
│           └── auth.py        # 인증 API 라우터
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    └── src/
        ├── api/               # API 호출 함수
        ├── components/
        │   ├── charts/        # 차트 컴포넌트
        │   ├── tables/        # 테이블 컴포넌트
        │   ├── layout/        # Header, Sidebar, Footer
        │   └── mypage/        # 마이페이지 폼
        ├── hook/              # 커스텀 훅 (폼 관리, 데이터 패칭)
        ├── pages/             # 페이지 컴포넌트
        ├── store/             # Zustand 스토어
        ├── type/              # TypeScript 타입 정의
        └── utils/             # 유효성 검사, axios 인스턴스
```
