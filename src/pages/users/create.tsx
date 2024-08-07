import Layout from '@/components/layouts/admin';
import UserCreateForm from '@/components/user/user-form';


export default function CreateUserPage() {
    return (
        <>
            <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
                <h1 className="text-lg font-semibold text-heading">
                    {'Create User'}
                </h1>
            </div>
            <UserCreateForm/>
        </>
    )
}

CreateUserPage.Layout = Layout;