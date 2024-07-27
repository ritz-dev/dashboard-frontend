import Card from "@/components/common/card";
import Layout from '@/components/layouts/admin';
import PageHeading from "@/components/common/page-heading";
import { adminOnly } from "@/utils/auth-utils";
import LinkButton from "@/components/ui/link-button";
import { Routes } from "@/config/routes";
import { GetStaticProps } from "next";

export default function AllRolesPage() {
    return (
        <>
            <Card className="mb-8 flex flex-col items-center md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <PageHeading title={'Roles'} />
                </div>
                <div className="flex w-full flex-col items-center justify-end ms-auto md:w-1/2 md:flex-row">
                    
                    <LinkButton
                        href={`${Routes.role.create}`}
                    >
                        <span>+ add role</span>
                    </LinkButton>
                </div>
        
            </Card>
        </>
    );
}

// AllRolesPage.authenticate = {
//     permissions: adminOnly
// };

AllRolesPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => ({
    props:{}
});