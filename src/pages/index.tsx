import { SUPER_ADMIN } from "@/utils/constants";
import AppLayout from '@/components/layouts/app';
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { allowedRoles, getAuthCredentials, hasAccess, isAuthenticated } from "@/utils/auth-utils";
import { Routes } from "@/config/routes";

const AdminDashboard = dynamic(()=> import('@/components/dashboard/admin'));

export default function Dashboard({
  userPermissions,
} : {
  userPermissions : string[];
}) {
  if(userPermissions?.includes(SUPER_ADMIN)) {
    return <AdminDashboard />;
  }
  return <div className="text-green-500">Not Found</div>
}

Dashboard.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const generateRedirectUrl = Routes.login;
  const {token, permissions} = getAuthCredentials(ctx);
  
  if(!isAuthenticated({token, permissions}) || !hasAccess(allowedRoles, permissions)) {
    return {
      redirect:{
        destination: generateRedirectUrl,
        permanent: false
      }
    };
  }

  return {
    props: {
      userPermissions: permissions
    }
  }
}