import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import React from 'react'
import NewsCard from '../partials/NewsCard'
import { useGetNewsQuery } from '@/redux-rtk/features/news/newsApi'

type Props = {}

const LatestNews = (props: Props) => {

    // get roles from redux api
    const { data: news, isLoading } = useGetNewsQuery(undefined);

    return (
        <SectionLayout>

            <SectionTop
                subTitle='Latest News'
            />

            {isLoading ? <>Loading...</> : <div className="flex flex-col gap-y-5 md:grid md:grid-cols-2 xl:grid-cols-3 md:items-center md:gap-x-4 lg:gap-[30px]">
                {news?.data.map((item: any) => <NewsCard
                    key={item._id}
                    item={item}
                />)}
            </div>}

        </SectionLayout>
    )
}

export default LatestNews