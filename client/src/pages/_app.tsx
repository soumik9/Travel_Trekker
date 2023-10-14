import DashboardLayout from '@/components/Layout/DashboardLayout/DashboardLayout';
import LandingLayout from '@/components/Layout/LandingLayout/LandingLayout';
import { dashboardPageLayoutUrls, landingPageLayoutUrls } from '@/configs/constants';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  if (landingPageLayoutUrls.includes(router.pathname)) {
    return (
      <LandingLayout>
        <Component {...pageProps} />
      </LandingLayout>
    );
  }

  if (dashboardPageLayoutUrls.includes(router.pathname)) {
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    );
  }

  return <Component {...pageProps} />
}
