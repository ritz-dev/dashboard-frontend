import Card from "@/components/common/card";
import Layout from '@/components/layouts/admin';
import PageHeading from "@/components/common/page-heading";
import { adminOnly } from "@/utils/auth-utils";
import LinkButton from "@/components/ui/link-button";
import { Routes } from "@/config/routes";
import { GetStaticProps } from "next";
import RoleList from "@/components/role/role-list";
import { useState } from "react";
import { SortOrder } from "@/types";
import { useRolesQuery } from "@/data/role";

export default function AllRolesPage() {

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [orderBy, setOrder] = useState('created_at');
    const [sortedBy,  setColumn] = useState<SortOrder>(SortOrder.Desc);
    const { roles, paginatorInfo, loading, error} = useRolesQuery({
        name: searchTerm,
        limit: 10,
        page,
        orderBy,
        sortedBy
    });
    function handleSearch({ searchText }: { searchText:string }) {
        setSearchTerm(searchTerm);
    }

    function handlePagination(current:any) {
        setPage(current);
    }
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
            <RoleList
                roles={roles}
                paginatorInfo={paginatorInfo}
                onPagination={handlePagination}
                onOrder={setOrder}
                onSort={setColumn}
            />
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