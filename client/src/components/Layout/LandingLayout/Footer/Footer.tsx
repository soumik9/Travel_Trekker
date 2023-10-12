import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { footerTouchItems, navItems } from '../utils/LandingConstants';
import { cx } from '@/hooks/helpers';
import Link from 'next/link';
import FooterTouchItem from '../components/FooterTouchItem';

const Footer = () => {

    const router = useRouter();

    // const sendMail = () => {
    //     router.push('mailto:'.concat(atob(encodedEmail)));
    // };

    // const phoneCall = () => {
    //     router.push('tel:'.concat(atob(encodedEmail)));
    // };

    // const adressFind = () => {
    //     router.push(atob(encodedAdress));
    // };

    return (
        <>
            <footer className="bg-bgDark pt-10 pb-4">
                <div className="container">

                    <div className="grid xll:grid-cols-[61%_39%] 3xll:grid-cols-2">

                        <div className='text-center md:grid md:grid-cols-3 md:items-center md:text-start'>

                            <div className='col-span-2'>

                                <h4 className='text-primary text-[26px]'>   <i>T</i>ravel &nbsp;<i>T</i>rekker</h4>

                                <p className='text-secondary mt-0 mb-2'>
                                    {`Message me on any of these platforms, and I'll respond within 1-2 business days.`}
                                </p>
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 mt-0 md:mt-9 lg:mt-0'>

                            <div className='mt-7 md:mt-0 flex flex-col items-center md:block'>
                                <span className="block uppercase text-sm font-semibold lg:text-white text-primary">Pages</span>
                                <ul className="mt-4">
                                    {navItems.map((item) => <li key={item.title} className='w-max'>
                                        <Link href={item.url} className="text-secondary font-secondary hover:text-primary-300 font-semibold trans block py-[9px] text-sm group" aria-label={item.title}>
                                            {item.title}
                                        </Link>
                                    </li>)}
                                </ul>
                            </div>

                            <div className='mt-8 md:mt-0 text-center md:text-start'>
                                <span className="block uppercase text-sm font-semibold lg:text-white text-primary">Get in touch</span>

                                <ul className="mt-4 flex flex-col items-center md:items-start">
                                    {footerTouchItems.map((item) => <div key={item.title}>
                                        <FooterTouchItem
                                            text={item.title}
                                            mainCss='py-[9px]'
                                            href={item.url}
                                        />
                                    </div>)}
                                </ul>
                            </div>
                        </div>

                    </div>


                    <hr className="md:my-6 my-4 border-primary-300" />


                    <div className="w-full px-4 mx-auto text-center text-sm">
                        <p className="py-1 uppercase text-secondary">
                            Copyright ©
                            <span id="get-current-year">{new Date().getFullYear()}</span>
                            <span className='text-primary-300'>    <i>T</i>ravel &nbsp;<i>T</i>rekker</span>
                        </p>
                    </div>


                </div>
            </footer>
        </>
    )
}

export default Footer