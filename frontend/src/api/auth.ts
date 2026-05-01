import type { LoginResponse, SuccessResponse, UserLogin, UserSignup } from '../type/auth';
import { authClient } from '../utils/axios';

export const login = async ({ email, password }: UserLogin): Promise<LoginResponse> => {
    const res = await authClient.post('/auth/login', { email, password });
    return res.data;
};

export const signup = async ({ email, password, name }: UserSignup): Promise<SuccessResponse> => {
    const res = await authClient.post('/auth/signup', { email, password, name });
    return res.data;
};
