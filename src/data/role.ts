import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { roleClient } from "./client/role";
import { adminOnly, getAuthCredentials, hasAccess } from "@/utils/auth-utils";
import { Routes } from "@/config/routes";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { Config } from "@/config";
import { RolePaginator, RoleQueryOptions } from "@/types";
import { mapPaginatorData } from "@/utils/data-mappers";


export const useCreateRoleMutation = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation(roleClient.create, {
        onSuccess:() => {
            const { permissions } = getAuthCredentials();
            if(hasAccess(adminOnly, permissions)) {
                return router.push(Routes.role.list);
            }
            router.push(Routes.dashboard);
        },
        // Always refetch after error or succes:
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.ROLES);
        },
    });
}

export const useUpdateRoleMutation = () => {
    
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation(roleClient.update, {
        onSuccess: async (data) => {
            await router.push(`/${data?.slug}/edit`, undefined, {
                locale: Config.defaultLanguage
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries(API_ENDPOINTS.ROLES);
        },
    });
};

export const useRolesQuery = (options: Partial<RoleQueryOptions>) => {
    const { data, error, isLoading } = useQuery<RolePaginator, Error>(
        [API_ENDPOINTS.ROLES, options],
        ({ queryKey, pageParam }) =>
            roleClient.paginated(Object.assign({}, queryKey[1], pageParam)),
        {
            keepPreviousData: true,
        }
    );

    return {
        roles: data?.data ?? [],
        paginatorInfo: mapPaginatorData(data),
        error,
        loading: isLoading
    }
}