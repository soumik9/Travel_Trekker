import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CustomButton from '@/components/Button/Button'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { profileLink } from '@/configs/constants'
import Link from 'next/link'
import React from 'react'

const Dashboard = () => {
    return (
        <>
            <Breadcrumb />

            <CardLayout title='Dashboard' isNotInitalized >
                <div className='f-center h-[60vh]'>
                    <Link
                        href={profileLink}
                    >
                        <CustomButton
                            text='Update Profile'
                            css='w-[200px]'
                        />
                    </Link>
                </div>
            </CardLayout>
        </>
    )
}

export default Dashboard