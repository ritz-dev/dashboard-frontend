import { useMutation, useQuery, useQueryClient } from "react-query";
import { userClient } from "./client/user";
import { useRouter } from "next/router";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { User } from "@/types";
import { Routes } from "@/config/routes";
import axios from "axios";
import { setEmailVerified } from "@/utils/auth-utils";

export const useMeQuery = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useQuery<User, Error>([API_ENDPOINTS.ME], userClient.me, {
        retry: false,

        onSuccess: () => {
            if(router.pathname === Routes.verifyLicense) {
                router.replace(Routes.dashboard);
            }
            if(router.pathname === Routes.verifyEmail) {
                setEmailVerified(true);
                router.replace(Routes.dashboard);
            }
        },
        onError: (err) => {
            if(axios.isAxiosError(err)) {
                if(err.response?.status === 417) {
                    router.replace(Routes.verifyLicense);
                    return;
                }

                if(err.response?.status === 409) {
                    setEmailVerified(false);
                    router.replace(Routes.verifyEmail);
                }

                queryClient.clear();
                router.replace(Routes.login);
            }
        },
    })
};

export function useLogin() {
    return useMutation(userClient.login);
}