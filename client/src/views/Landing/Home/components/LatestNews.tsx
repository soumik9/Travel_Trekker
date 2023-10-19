import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import React from 'react'
import NewsCard from '../partials/NewsCard'

type Props = {}

const LatestNews = (props: Props) => {
    return (
        <SectionLayout>

            <SectionTop
                subTitle='Latest News'
            />

            <div>
                <NewsCard />
            </div>


        </SectionLayout>
    )
}

export default LatestNews