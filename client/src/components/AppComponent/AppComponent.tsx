import useAuthCheck from '@/hooks/useAuthCheck';
import React from 'react'
import { Toaster } from 'react-hot-toast';
import LandingLayout from '../Layout/LandingLayout/LandingLayout';
import DashboardLayout from '../Layout/DashboardLayout/DashboardLayout';

type Props = {
    pageProps: any;
    Component: any;
    dashboard?: boolean;
    landing?: boolean;
}

const AppComponent = ({ pageProps, Component, landing, dashboard }: Props) => {

    // authentication checking
    const authChecked = useAuthCheck();
    if (!authChecked) return <div className='text-center'>Checking authentication....</div>

    if (landing) {
        return <LandingLayout>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Component {...pageProps} />
        </LandingLayout>
    } else if (dashboard) {
        return <DashboardLayout>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <Component {...pageProps} />
        </DashboardLayout>
    } else {
        return <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <Component {...pageProps} />
        </>
    }
}

export default AppComponent