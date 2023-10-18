import AppComponent from '@/components/AppComponent/AppComponent';
import { dashboardPageLayoutUrls, landingPageLayoutUrls } from '@/configs/constants';
import { store } from '@/redux-rtk/app/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  if (landingPageLayoutUrls.includes(router.pathname)) {
    return (
      <Provider store={store}>
        <AppComponent Component={Component} pageProps={pageProps} landing />
      </Provider>
    );
  }

  if (dashboardPageLayoutUrls.includes(router.pathname)) {
    return (
      <Provider store={store}>
        <AppComponent Component={Component} pageProps={pageProps} dashboard />
      </Provider>
    );
  }

  return <Provider store={store}>
    <AppComponent Component={Component} pageProps={pageProps} />
  </Provider>
}
