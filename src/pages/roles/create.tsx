import Layout from '@/components/layouts/admin';
import RoleForm from '@/components/role/role-form';

export default function CreateRole() {
    return (
        <>
            <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
                <h1 className="text-lg font-semibold text-heading">
                    {'Create Role'}
                </h1>
            </div>
            <RoleForm />
        </>
    )
}

// CreateRole.authenicate = {
//     permission:
// }

CreateRole.Layout = Layout