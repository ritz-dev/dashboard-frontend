import LoginForm from "@/components/auth/login-form";
import AuthPageLayout from "@/components/layouts/auth-layout";

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