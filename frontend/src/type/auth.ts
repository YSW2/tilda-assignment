export type UserLogin = {
    email: string;
    password: string;
};

export type UserSignup = {
    name: string;
} & UserLogin;
