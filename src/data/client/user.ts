import { AuthResponse, LoginInput, RegisterInput, User } from "@/types";
import { HttpClient } from "./http-client";
import { API_ENDPOINTS } from "./api-endpoints";
import { register } from "module";

export const userClient = {
    me: () => {
        return HttpClient.get<User>(API_ENDPOINTS.ME);
    },
    login: (variables: LoginInput) => {
        return HttpClient.post<AuthResponse>(API_ENDPOINTS.LOGIN, variables);
    },
    logout: () => {
        return HttpClient.post<any>(API_ENDPOINTS.LOGOUT, {});
    },
    register: (variables: RegisterInput) => {
        return HttpClient.post<AuthResponse>(API_ENDPOINTS.TOKEN, variables);
    }
}