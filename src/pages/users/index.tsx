import Layout from '@/components/layouts/admin';
import Card from "@/components/common/card";
import PageHeading from "@/components/common/page-heading";
// import UserList from "@/components/user/user-list";

export default function AllUsersPage() {
    return (
        <>
            <Card>
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <PageHeading title={'Users'} />
                </div>
            </Card>
            {/* <UserList/> */}
        </>
    )
}

AllUsersPage.Layout = Layout