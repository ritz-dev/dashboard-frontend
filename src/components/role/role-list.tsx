import { MappedPaginatorInfo, Role, SortOrder } from "@/types"
import { AlignType, Table } from '@/components/ui/table';
import { NoDataFound } from "../icons/no-data-found";
import Pagination from "../ui/pagination";
import { useState } from "react";
import TitleWithSort from "../ui/title-with-sort";
import Badge from "../ui/badge/badge";
import LanguageSwitcher from "../ui/lang-action/action";
import { Routes } from "@/config/routes";


type IProps = {
    roles: Role[],
    paginatorInfo: MappedPaginatorInfo | null;
    onPagination: (current: number) => void;
    onSort: (current: any) => void;
    onOrder: (current: string) => void;
}

const RoleList = ({
    roles,
    paginatorInfo,
    onPagination,
    onSort,
    onOrder
}: IProps) => {

    const [sortingObj, setSortingObj] = useState<{
        sort: SortOrder;
        column: string | null;
    }>({
        sort: SortOrder.Desc,
        column: null
    });

    const onHeaderClick = (column: string | null) => ({
        onClick: () => {
            onSort((currentSortDirection: SortOrder) =>
                currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc 
            );
            onOrder(column!);

            setSortingObj({
                sort:
                  sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
                column: column,
              });
        }
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'left' as AlignType,
            width: 130,
            render: (id: number) => `${id}`,
        },
        {
            title: (
                <TitleWithSort
                  title={'Role'}
                  ascending={
                    sortingObj.sort === SortOrder.Asc && sortingObj.column === 'name'
                  }
                  isActive={sortingObj.column === 'name'}
                />
            ),
            dataIndex: 'name',
            key: 'name',
            align: 'left' as AlignType,
            width: 250,
            className: 'cursor-pointer',
            onHeaderCell: () => onHeaderClick('name'),
            render: (name: any, { slug }: any) => (
                <div className="flex items-center">
                    <span className="truncate whitespace-nowrap font-medium">
                        {name}
                    </span>
                </div>
            ),
        },
        {
            title: 'Description',
            dataIndex:'description',
            key:'description',
            align: 'left' as AlignType,
            width:1000,
            className: 'cursor-pointer',
            render: (description: any) => (
                <div className="flex items-center">
                    <span className="truncate whitespace-nowrap font-medium">
                        {description}
                    </span>
                </div>
            )
        },
        {
            title: 'Actions',
            dataIndex: 'slug',
            key: 'actions',
            align: 'right' as AlignType,
            width: 120,
            render: (slug: string, record: Role) => (
              <LanguageSwitcher
                slug={slug}
                record={record}
                deleteModalView="DELETE_ROLE"
                routes={Routes?.role}
              />
            ),
        },
    ]

    return (
        <>
            <div className="mb-6 overflow-hidden rounded shadow">
                <Table
                    columns={columns}
                    emptyText={() => (
                        <div className="flex flex-col items-center py-7">
                            <NoDataFound className="w-52" />
                            <div className="mb-1 pt-6 text-base font-semibold text-heading">
                                {'Empty Table Data'}
                            </div>
                            <p className="text-[13px]">{'Empty Table Text'}</p>
                        </div>
                    )}
                    data={roles}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                />
            </div>
            {!!paginatorInfo?.total && (
                <div className="flex item-center justify-end">
                    <Pagination
                        total={paginatorInfo.total}
                        current={paginatorInfo.currentPage}
                        pageSize={paginatorInfo.perPage}
                        onChange={onPagination}
                    />
                </div>
            )}
        </>
    )
}

export default RoleList;