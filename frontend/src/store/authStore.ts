import { create } from 'zustand';
import type { User } from '../type/auth';

type AuthStore = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean | null;

    initialize: () => void;
    login: (token: string, user: User) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    isAuthenticated: null,

    initialize: () => {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('auth_user');

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                set({ token, user, isAuthenticated: true });
            } catch (error) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
            }
        } else {
            set({ isAuthenticated: false });
        }
    },

    login: (token: string, user: User) => {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
        set({ token, user, isAuthenticated: true });
    },

    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        set({ token: null, user: null, isAuthenticated: false });
    },
}));
