import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import React from 'react'
import HRSlider from '../partials/HRSlider'

const ClientsReview = () => {
    return (
        <SectionLayout>

            <SectionTop
                subTitle='Clients Review'
            />

            <div className="">
                <HRSlider />
            </div>

        </SectionLayout>
    )
}

export default ClientsReview