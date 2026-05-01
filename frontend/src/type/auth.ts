export type User = {
    email: string;
    name: string;
};

export type UserLogin = {
    email: string;
    password: string;
};

export type UserSignup = {
    email: string;
    password: string;
    name: string;
};

export type LoginResponse = {
    success: boolean;
    token: string;
    user: User;
};

export type SuccessResponse = {
    success: boolean;
    message: string;
};
