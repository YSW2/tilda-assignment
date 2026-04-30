import axios from 'axios';

// OpenAPI 공공데이터 API 클라이언트
export const openapiClient = axios.create({
    baseURL: import.meta.env.VITE_OPENAPI_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        serviceKey: import.meta.env.VITE_OPENAPI_SERVICE_KEY,
    },
});

// 인증 서버 API 클라이언트
export const authClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
