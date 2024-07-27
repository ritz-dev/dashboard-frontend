import { NextPage } from "next";

export type NextPageWithLayout <P = {}> = NextPage<P> & {
    authorization?: boolean;
    getLayout?: (page: React.ReactElement) => React.ReactNode;
}

export enum SortOrder {
    Asc = 'asc',
    Desc = 'desc'
}

export interface User {
    id: string;
    full_name: string;
    email: string;
    role: string;
}

export interface Role {
    id?:string;
    name?: string;
    slug?:string
}

export interface RoleInput {
    name: string;
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

export interface GetParams {
    slug: string;
    language: string;
}

export interface QueryOptions {
    language:string;
    limit?: number;
    page?: string;
    orderBy?: string;
    sortedBy?: SortOrder;
}

export interface  RoleQueryOptions extends Omit<QueryOptions, 'language'> {
    name: string;
    parent: number | null;
    is_active?: boolean;
}

export interface PaginatorInfo<T> {
    current_page:number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface RolePaginator extends PaginatorInfo<Role> {}
