import { useRouter } from "next/router";
import { getAuthCredentials, hasAccess } from "./auth-utils";
import { useEffect } from "react";
import { Routes } from "@/config/routes";
import AccessDeniedPage from "@/components/common/access-denied";
import Loader from "@/components/ui/loader/loader";

const PrivateRoute: React.FC<{
    authProps: any;
    children?: React.ReactNode
}> = ({ children,authProps }) => {

    const router = useRouter();
    const { token, permissions } = getAuthCredentials();
    const isUser = !!token;
    const hasPermission = Array.isArray(permissions) && !!permissions.length && hasAccess(authProps.permissions,permissions);

    useEffect(()=> {
        if(!isUser){
            router.replace(Routes.login);
        }
    },[isUser, router]);

    if(isUser && hasPermission) {
        return <>{children}</>;
    }

    if(isUser && !hasPermission) {
        return <AccessDeniedPage />;
    }

    return <Loader showText={true} />;
}

export default PrivateRoute;