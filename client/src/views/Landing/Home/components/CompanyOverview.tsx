import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import { hotelOverviews } from '@/configs/constants'
import Image from 'next/image'
import React from 'react'

const CompanyOverview = () => {
    return (
        <SectionLayout>
            <SectionTop
                subTitle='Company Overview'
                css='lg:!mb-[40px]'
            />

            <div>
                <p className='text-center text-secondary mb-6'>
                    {`Welcome to our hotel booking website. We offer a range of hotels to suit your needs and preferences. Whether you're looking for a luxury experience or a cozy getaway, we have you covered. Explore our selection of hotels below and book your stay today!`}
                </p>

                <div className="grid gap-6 md:grid-cols-3">

                    {hotelOverviews.map((item, index) => <div
                        key={`over${index}`}
                        className="flex md:flex-col xl:flex-row md:justify-center xl:justify-start items-center gap-4 p-4 bg-lightDark hover:bg-bgDark trans border border-primary rounded-md cursor-default"
                    >
                        <Image src={item.img} width={125} height={100} alt={item.title} />

                        <div>
                            <p className="mb-2 font-medium text-primary text-[18px] lg:text-[22px] md:text-center xl:text-start">{item.title}</p>
                            <p className="text-sm font-normal text-secondary text-justify">{item.desc}</p>
                        </div>
                    </div>)}
                </div>

            </div>
        </SectionLayout>
    )
}

export default CompanyOverview