import DashboardLayout from '@/components/Layout/DashboardLayout/DashboardLayout';
import LandingLayout from '@/components/Layout/LandingLayout/LandingLayout';
import { dashboardPageLayoutUrls, landingPageLayoutUrls } from '@/configs/constants';
import { store } from '@/redux-rtk/app/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  if (landingPageLayoutUrls.includes(router.pathname)) {
    return (
      <Provider store={store}>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />

        <LandingLayout>
          <Component {...pageProps} />
        </LandingLayout>
      </Provider>
    );
  }

  if (dashboardPageLayoutUrls.includes(router.pathname)) {
    return (
      <Provider store={store}>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />

        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </Provider>
    );
  }

  return <Provider store={store}>

    <Toaster
      position="top-right"
      reverseOrder={false}
    />

    <Component {...pageProps} />
  </Provider>
}
