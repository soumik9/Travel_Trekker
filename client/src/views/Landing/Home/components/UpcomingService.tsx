import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import { upcomingServices } from '@/configs/constants'
import React from 'react'
import ASCard from '../partials/ASCard'

type Props = {}

const UpcomingService = (props: Props) => {
    return (
        <SectionLayout >
            <SectionTop
                subTitle='Upcoming Services'
            />

            <div className="flex flex-col gap-y-5 md:grid md:grid-cols-2 xl:grid-cols-3 md:items-center md:gap-x-4 lg:gap-[30px]">
                {upcomingServices.map((item, index) => <ASCard
                    key={`up${index}`}
                    item={item}
                />)}
            </div>
        </SectionLayout>
    )
}

export default UpcomingService