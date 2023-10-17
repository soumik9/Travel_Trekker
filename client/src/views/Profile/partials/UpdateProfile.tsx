import CustomButton from '@/components/Button/Button'
import { useUpdateUserByAuthenticatedMutation } from '@/redux-rtk/features/user/userApi';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUser } from '@/configs/types';
import { dashboardLink } from '@/configs/constants';
import { useRouter } from 'next/router';
import { userUpdateSchema } from '@/views/Admin/User/utils/userYupSchema';
import UserForm from '@/views/Admin/User/partials/UserForm';

type Props = {
    data: IUser;
    userId: string | undefined;
}

const UpdateProfile = ({ data, userId }: Props) => {

    const router = useRouter();

    // rtk
    const [updateUserByAuthenticated, { isLoading: updateLoading, isSuccess }] = useUpdateUserByAuthenticatedMutation();

    // hook form
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userUpdateSchema),
        defaultValues: {
            name: data?.name,
            email: data?.email,
            password: '',
        },
    });

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            router.push(dashboardLink)
        }
    }, [isSuccess, router])

    const handleUpdateProfile = (fData: any) => {

        // final data to send server
        const updatedData = {
            ...fData,
        }

        updateUserByAuthenticated({
            userId, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <UserForm
                    control={control}
                    errors={errors}
                    profilePage
                />

                <div className='mt-8 flex justify-end'>
                    <CustomButton
                        text='Update Profile'
                        css='w-[180px]'
                        loadingText='Updating'
                        isLoading={updateLoading}
                    />
                </div>

            </form>
        </>
    )
}

export default UpdateProfile