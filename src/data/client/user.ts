import { AuthResponse, LoginInput, QueryOptions, User, UserInput } from "@/types";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./api-endpoints";
import { register } from "module";
import { curdFactory } from "./crud-factory";


export const userClient = {
    ...curdFactory<User, QueryOptions, UserInput>(API_ENDPOINTS.USERS),
    me: () => {
        return HttpClient.get<User>(API_ENDPOINTS.ME);
    },
    login: (variables: LoginInput) => {
        return HttpClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, variables);
    },
    logout: () => {
        return HttpClient.post<any>(API_ENDPOINTS.LOGOUT, {});
    },
}