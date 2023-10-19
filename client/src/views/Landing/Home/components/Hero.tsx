import CustomButton from '@/components/Button/Button'
import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {

    return (
        <SectionLayout>
            <div className='grid md:grid-cols-2 items-center'>
                <Image
                    src='/heroSection.png'
                    width={600}
                    height={350}
                    alt='hero'
                    className='w-full'
                />

                <div>
                    <h1 className='lg:text-[28px] text-primary text-center'>We offer a range of hotels to suit your needs and preferences.</h1>

                    <p className='text-secondary text-justify my-3'>{`Welcome to our hotel booking website. We offer a range of hotels to suit your needs and preferences. Whether you're looking for a luxury experience or a cozy getaway, we have you covered. Explore our selection of hotels below and book your stay today!`}</p>

                    <Link href={'#contactMe'}>
                        <CustomButton
                            text='Contact Us'
                            css='w-[130px]'
                        />
                    </Link>
                </div>
            </div>
        </SectionLayout>
    )
}

export default Hero