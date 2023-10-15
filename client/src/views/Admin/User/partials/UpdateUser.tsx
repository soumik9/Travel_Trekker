import CustomButton from '@/components/Button/Button'
import { useUpdateUserMutation } from '@/redux-rtk/features/user/userApi';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userUpdateSchema } from '../utils/userYupSchema';
import { IUser } from '@/configs/types';
import UserForm from './UserForm';
import { selectItemType } from '@/components/Forms/SelectCustom';
import { rolesOptions, usersLink } from '@/configs/constants';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

type Props = {
    data: IUser;
    userId: string | string[] | undefined;
}

const UpdateUser = ({ data, userId }: Props) => {

    const router = useRouter();

    // rtk
    const [updateUser, { isLoading: updateLoading, isSuccess }] = useUpdateUserMutation();

    // hook form
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userUpdateSchema),
        defaultValues: {
            name: data?.name,
            email: data?.email,
            password: '',
        },
    });

    // states
    const [selectedRole, setSelectedRole] = useState<selectItemType | undefined>({ _id: 'xxRole', label: 'Select Role', value: '' });
    const [error, setError] = useState({ role: false });

    // set data on state
    useEffect(() => {
        if (data) {
            setSelectedRole(rolesOptions.find((item: selectItemType) => item.value === data?.role))
        }
    }, [data])

    // error dismiss
    useEffect(() => {
        selectedRole?.value && setError({ ...error, role: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRole?.value])

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            router.push(usersLink)
        }
    }, [isSuccess, router])

    const handleUpdateUser = (fData: any) => {

        // final data to send server
        const updatedData = {
            ...fData,
            role: selectedRole?.value,
        }

        if (updatedData.role === '') {
            setError({ ...error, role: true })
            return toast.error('Role is required!');
        }


        updateUser({
            userId, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleUpdateUser)}>
                <UserForm
                    control={control}
                    errors={errors}
                    error={error}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    editPage
                />

                <div className='mt-8 flex justify-end'>
                    <CustomButton
                        text='Update User'
                        css='w-[180px]'
                        loadingText='Updating'
                        isLoading={updateLoading}
                    />
                </div>

            </form>
        </>
    )
}

export default UpdateUser