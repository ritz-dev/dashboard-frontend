import { NextPage } from "next";

export type NextPageWithLayout <P = {}> = NextPage<P> & {
    authorization?: boolean;
    getLayout?: (page: React.ReactElement) => React.ReactNode;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    token: string;
    permissions: string[];
    role: string;
}

export interface LoginInput {
    email: string;
    password: string;
}
