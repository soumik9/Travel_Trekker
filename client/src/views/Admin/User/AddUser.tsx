import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { addUserLink, usersLink } from '@/configs/constants'
import { useSignupMutation } from '@/redux-rtk/features/auth/authApi'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from './utils/userYupSchema'
import { userDefaultValues } from './utils/userDefaultValues'
import UserForm from './partials/UserForm'
import { selectItemType } from '@/components/Forms/SelectCustom'
import CustomButton from '@/components/Button/Button'
import toast from 'react-hot-toast'

const AddUser = () => {

    // globals
    const [signup, { isLoading: signupLoading, isSuccess }] = useSignupMutation();

    // hooks
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: userDefaultValues,
    });

    // states
    const [selectedRole, setSelectedRole] = useState<selectItemType | undefined>({ _id: 'xxRole', label: 'Select Role', value: '' });
    const [error, setError] = useState({ role: false });

    // error dismiss
    useEffect(() => {
        selectedRole?.value && setError({ ...error, role: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRole?.value])

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            reset();
            setSelectedRole({ _id: 'xxRole', label: 'Select Role', value: '' });
        }
    }, [isSuccess, reset])

    // add new user funtion
    const handleAddUser = (fData: any) => {

        // final data to send server
        const finalData = {
            ...fData,
            role: selectedRole?.value,
        }

        if (finalData.role === '') {
            setError({ ...error, role: true })
            return toast.error('Role is required!');
        }

        // post data to server
        signup(finalData)
    }

    return (
        <>

            <Breadcrumb
                links={[
                    {
                        title: 'Users',
                        url: usersLink,
                    },
                    {
                        title: 'Add User',
                        url: addUserLink,
                    },
                ]}
            />

            <CardLayout title='Add User' isNotInitalized>
                <form onSubmit={handleSubmit(handleAddUser)}>
                    <UserForm
                        control={control}
                        errors={errors}
                        error={error}
                        selectedRole={selectedRole}
                        setSelectedRole={setSelectedRole}
                    />

                    <div className='mt-8 flex justify-end'>
                        <CustomButton
                            text='Add User'
                            css='w-[180px]'
                            loadingText='Adding'
                            isLoading={signupLoading}
                        />
                    </div>

                </form>
            </CardLayout>
        </>
    )
}

export default AddUser