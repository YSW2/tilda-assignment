import type { UserLogin, UserSignup } from '../type/auth';
import { authClient } from '../utils/axios';

export const login = async ({ email, password }: UserLogin) => {
    const res = authClient.post('/auth/login', { params: { email, password } });
    return res;
};

export const signup = async ({ email, password, name }: UserSignup) => {
    const res = authClient.post('/auth/signup', { params: { email, password, name } });
    return res;
};
