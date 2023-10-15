import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import { usersLink } from '@/configs/constants';
import { useGetUserQuery } from '@/redux-rtk/features/user/userApi';
import { useRouter } from 'next/router';
import React from 'react'
import UpdateUser from './partials/UpdateUser';

type Props = {}

const EditUser = (props: Props) => {

    // globals
    const { query } = useRouter();
    const userId = query.userId;

    // redux api
    const { data: user, isLoading, isError, isSuccess } = useGetUserQuery(userId);

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Users',
                        url: usersLink,
                    },
                    {
                        title: 'Edit User',
                        url: `user/${user?.data?._id}`,
                    },
                ]}
            />

            <CardLayout title={`Update User [${user?.data?._id}]`} isLoading={false} isError={isError} isSuccess={isSuccess}>
                <UpdateUser
                    data={user?.data}
                    userId={userId}
                />
            </CardLayout>

        </>
    )
}

export default EditUser