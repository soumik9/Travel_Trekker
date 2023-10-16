import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Input from '@/components/Forms/Input';
import CustomButton from '@/components/Button/Button';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/hooks/helpers';
import { useSignupMutation, useUserSignupMutation } from '@/redux-rtk/features/auth/authApi';
import { dashboardLink, homeLink, loginUrl } from '@/configs/constants';
import { IUser } from '@/configs/types';
import Link from 'next/link';

const signupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
});

const signupDefaultValues = {
    name: '',
    email: '',
    password: '',
}

const Signup = () => {

    // global
    const router = useRouter();
    const auth = useAppSelector((state) => state.auth);
    const [userSignup, { isLoading, isSuccess }] = useUserSignupMutation();

    // hooks
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema),
        defaultValues: signupDefaultValues,
    });

    // states
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // if success
    useEffect(() => {
        if (isSuccess) {
            router.push(loginUrl);
        }
    }, [isSuccess, router])

    // if authenticated then redirect to dashboard
    useEffect(() => {
        if (auth.isAuthenticated) {
            router.push(dashboardLink);
        }
    }, [auth.isAuthenticated, router])


    // handler
    const handleSignupUser = (data: Partial<IUser>) => { userSignup(data) }

    return (
        <form className='h-screen f-center' onSubmit={handleSubmit(handleSignupUser)}>
            <Card className='!bg-lightDark min-w-[375px] md:min-w-[600px] text-secondary p-5 pb-12'>
                <CardContent>
                    <p className="text-secondary text-[26px] text-center font-medium">
                        Signup
                    </p>

                    <div className='border text-secondary my-2'> </div>

                    <div className='space-y-5'>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Name"
                                    id="name"
                                    placeholder="Soumik Ahammed"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.name?.message}
                                    labelRequired
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Email"
                                    id="email"
                                    placeholder="user@example.com"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.email?.message}
                                    labelRequired
                                    autoComplete="off"
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Password"
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.password?.message}
                                    labelRequired
                                    passwordToggle={true}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    autoComplete="off"
                                />
                            )}
                        />
                    </div>
                </CardContent>

                <CardActions className='flex flex-col'>
                    <CustomButton
                        text='Signup'
                        variant="contained"
                        css='w-full'
                        isLoading={isLoading}
                        loadingText={'Login....'}
                        disabled={isLoading}
                    />

                    <Link href={loginUrl} className='text-purple-600 mt-3 hover:text-purple hover:underline trans'>
                        Login Here
                    </Link>

                    <Link href={homeLink} className='text-purple-600 mt-3 hover:text-purple hover:underline trans'>
                        Back To Home
                    </Link>
                </CardActions>

            </Card>
        </form>
    )
}

export default Signup