import Layout from '@/components/layouts/admin';
import CreateOrUpdateRoleForm from "@/components/role/role-form";
import ErrorMessage from '@/components/ui/error-message';
import Loader from "@/components/ui/loader/loader";
import { useRoleQuery } from '@/data/role';
import { useRouter } from "next/router";

export default function UpdateRole() {
    const { query } = useRouter();

    const { 
        role,
        isLoading: loading,
        error,
    } = useRoleQuery({
        slug: query.roleSlug as string,
    });

    if(loading) return <Loader text={('Loading')} />;
    if (error) return <ErrorMessage message={error?.message as string} />;

    return (
        <>
            <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
                <h1 className="text-lg font-semibold text-heading">
                    {'Edit Role'}
                </h1>
            </div>
            <CreateOrUpdateRoleForm initialValues={role}/>
        </>
    )
}

UpdateRole.Layout = Layout
