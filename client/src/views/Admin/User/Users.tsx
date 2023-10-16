import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { ENUM_USER_ROLE, addUserLink, usersLink } from '@/configs/constants'
import React from 'react'
import DataTable from 'react-data-table-component'
import ActionsBtn from './partials/ActionsBtn'
import { IUser } from '@/configs/types'
import Image from 'next/image'
import { cx } from '@/hooks/helpers'
import { useGetUsersQuery } from '@/redux-rtk/features/user/userApi'

const Users = () => {

    // get roles from redux api
    const { data: users, isLoading, isError, isSuccess } = useGetUsersQuery(undefined);

    // datas
    const columns: any = [
        {
            name: 'Avatar',
            selector: (row: IUser) => <Image
                width={50} height={50} src={row.image} alt={row.name}
                className='my-2 rounded-full w-[50px] h-[45px] border border-warning oject-cover'
            />,
            maxWidth: '20px'
        },
        {
            name: 'Name',
            selector: (row: IUser) => row.name,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: IUser) => row.email,
            filterable: true,
        },
        {
            name: 'Role',
            selector: (row: IUser) => <div
                className={cx(
                    row.role === ENUM_USER_ROLE.ADMIN && 'bg-purple-300',
                    row.role === ENUM_USER_ROLE.SUPER_ADMIN && 'bg-purple-300',
                    row.role === ENUM_USER_ROLE.USER && 'bg-purple-300',
                    'px-2.5 py-1 rounded-md capitalize text-white text-[12px] w-[100px] text-center'
                )}
            >
                {row.role}
            </div>,
        },
        {
            name: 'Action',
            cell: (row: any) => <ActionsBtn row={row} />,
        },
    ];

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Users',
                        url: usersLink,
                    }
                ]}
                addText='Add User'
                addUrl={addUserLink}
            />

            <CardLayout title='Users' isLoading={false} isError={isError} isSuccess={isSuccess} >


                <div>
                    <DataTable
                        columns={columns}
                        data={users?.data}
                        highlightOnHover
                        progressPending={isLoading}
                        pagination
                        persistTableHead={true}
                        paginationPerPage={15}
                    />
                </div>

            </CardLayout>
        </>
    )
}

export default Users