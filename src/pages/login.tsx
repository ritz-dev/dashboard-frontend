import LoginForm from "@/components/auth/login-form";
import AuthPageLayout from "@/components/layouts/auth-layout";
import { Routes } from "@/config/routes";
import { getAuthCredentials, hasAccess, isAuthenticated } from "@/utils/auth-utils";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoginPage() {

    return(
        <AuthPageLayout>
            <h3 className="mb-6 mt-4 text-center text-base italic text-body">
                {'Login to Dashboard'}
            </h3>
            <LoginForm />
        </AuthPageLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const generateRedirectUrl = Routes.dashboard;
    const {token, permissions} = getAuthCredentials(ctx);
    
    if(isAuthenticated({token, permissions})) {
      return {
        redirect:{
          destination: generateRedirectUrl,
          permanent: false
        }
      };
    }
  
    return {
      props: {}
    }
  }