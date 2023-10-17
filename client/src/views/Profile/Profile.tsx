import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { profileLink } from '@/configs/constants'
import { useAppSelector } from '@/hooks/helpers'
import { useGetUserQuery } from '@/redux-rtk/features/user/userApi'
import React from 'react'
import UpdateProfile from './partials/UpdateProfile'


const Profile = () => {

    const auth = useAppSelector((state) => state.auth);
    const { data: user, isLoading, isError, isSuccess } = useGetUserQuery(auth?.user?._id);

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Profile',
                        url: profileLink,
                    }
                ]}
            />

            <CardLayout title='Profile' isLoading={isLoading} isError={isError} isSuccess={isSuccess} >
                <UpdateProfile
                    data={user?.data}
                    userId={auth?.user?._id}
                />
            </CardLayout>
        </>
    )
}

export default Profile