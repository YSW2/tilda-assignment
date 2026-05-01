# ---- Build Stage ----
FROM node:20-alpine AS build

WORKDIR /app

# 의존성 설치 (캐싱 활용)
COPY package.json package-lock.json ./
RUN npm ci

# 소스 복사
COPY . .

# 빌드 시 환경변수 주입
ARG VITE_AUTH_BASE_URL=http://localhost:3001
ARG VITE_OPENAPI_BASE_URL=https://api.odcloud.kr/api
ARG VITE_OPENAPI_SERVICE_KEY

ENV VITE_AUTH_BASE_URL=$VITE_AUTH_BASE_URL
ENV VITE_OPENAPI_BASE_URL=$VITE_OPENAPI_BASE_URL
ENV VITE_OPENAPI_SERVICE_KEY=$VITE_OPENAPI_SERVICE_KEY

# 빌드
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine

# SPA 라우팅을 위한 nginx 설정
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]