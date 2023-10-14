import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Input from '@/components/Forms/Input';
import CustomButton from '@/components/Button/Button';
import { ILogin } from '@/configs/types';

const loginchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
});

const loginDefaultValues = {
    email: '',
    password: '',
}

const Login = () => {

    // hooks
    const { control, handleSubmit, formState: { errors }, setValue, getValues, reset, watch, trigger } = useForm({
        resolver: yupResolver(loginchema),
        defaultValues: loginDefaultValues,
    });

    const [showPassword, setShowPassword] = useState<boolean>(false);


    const handleLogin = (data: ILogin) => {
        console.log(data);
    }



    return (
        <form className='h-screen f-center' onSubmit={handleSubmit(handleLogin)}>
            <Card className='!bg-lightDark min-w-[375px] md:min-w-[600px] text-secondary p-5 pb-12'>
                <CardContent>
                    <p className="text-secondary text-[26px] text-center font-medium">
                        Login
                    </p>

                    <div className='border text-secondary my-2'> </div>

                    <div className='space-y-5'>
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
                                />
                            )}
                        />
                    </div>
                </CardContent>

                <CardActions>
                    <CustomButton
                        text='Login'
                        variant="contained"
                        // onClick={addItemOnClick}
                        css='w-full'
                    // isLoading={loading}
                    // loadingText={loadingText}
                    // disabled={isDisabled}
                    />
                </CardActions>
            </Card>
        </form>
    )
}

export default Login