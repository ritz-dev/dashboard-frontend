import Layout from '@/components/layouts/admin';
import CreateOrUpdateRoleForm from '@/components/role/role-form';

export default function CreateRole() {
    return (
        <>
            <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
                <h1 className="text-lg font-semibold text-heading">
                    {'Create Role'}
                </h1>
            </div>
            <CreateOrUpdateRoleForm />
        </>
    )
}

// CreateRole.authenicate = {
//     permission:
// }

CreateRole.Layout = Layout