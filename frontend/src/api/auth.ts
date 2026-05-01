import type {
    LoginResponse,
    PatchNameResponse,
    SuccessResponse,
    UserLogin,
    UserSignup,
} from '../type/auth';
import { authClient } from '../utils/axios';

export const login = async ({ email, password }: UserLogin): Promise<LoginResponse> => {
    const res = await authClient.post('/auth/login', { email, password });
    return res.data;
};

export const signup = async ({ email, password, name }: UserSignup): Promise<SuccessResponse> => {
    const res = await authClient.post('/auth/signup', { email, password, name });
    return res.data;
};

export const patchName = async (name: string): Promise<PatchNameResponse> => {
    const res = await authClient.patch('/auth/me', { name });
    return res.data;
};

export const patchPassword = async (
    currentPassword: string,
    newPassword: string,
): Promise<SuccessResponse> => {
    const res = await authClient.patch('/auth/me/password', { currentPassword, newPassword });
    return res.data;
};
