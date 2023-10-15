import Input from '@/components/Forms/Input'
import SelectCustom, { selectItemType } from '@/components/Forms/SelectCustom';
import { rolesOptions } from '@/configs/constants';
import React, { useState } from 'react'
import { Controller } from 'react-hook-form';

type Props = {
    control: any;
    errors: any;
    error: any;
    editPage: boolean;
    selectedRole: selectItemType | undefined;
    setSelectedRole: (selectedRole: selectItemType | undefined) => void;
}

const UserForm = ({ control, errors, selectedRole, setSelectedRole, error, editPage }: Props) => {

    // states
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className='grid md:grid-cols-2 gap-x-5 gap-y-7'>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Full Name"
                        id="name"
                        placeholder="ex: Mr Kala Tabij"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.name?.message}
                        labelRequired
                    />
                )}
            />

            {/* Email */}
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Email"
                        id="email"
                        type="email"
                        placeholder="soumik@gmail.com"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.email?.message}
                        labelRequired
                        disabled={editPage ? true : false}
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

            {/* Select Role */}
            <SelectCustom
                value={selectedRole}
                defaultValue={selectedRole}
                onChange={(option: selectItemType) => setSelectedRole(option)}
                options={rolesOptions}
                label='Select Role'
                placeHolder='Select Role'
                required
                error={error.role}
            />



        </div>
    )
}

export default UserForm