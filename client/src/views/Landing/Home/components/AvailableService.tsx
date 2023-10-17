import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import { availableService } from '@/configs/constants'
import React from 'react'
import ASCard from '../partials/ASCard'

type Props = {}

const AvailableService = (props: Props) => {
    return (
        <SectionLayout >
            <SectionTop
                subTitle='Available Services'
            />

            <div className="flex flex-col gap-y-5 md:grid md:grid-cols-2 xl:grid-cols-3 md:items-center md:gap-x-4 lg:gap-[30px]">
                {availableService.map((item, index) => <ASCard
                    key={`as${index}`}
                    item={item}
                />)}
            </div>
        </SectionLayout>
    )
}

export default AvailableService