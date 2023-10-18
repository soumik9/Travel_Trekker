import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import { useGetHotelsQuery } from '@/redux-rtk/features/hotel/hotelApi';
import React from 'react'
import HotelCard from '../partials/HotelCard';
import { IHotel } from '@/configs/types';

const HomeHotels = () => {

    // get roles from redux api
    const { data: hotels, isLoading, isError, isSuccess } = useGetHotelsQuery(undefined);

    return (
        <SectionLayout>

            <SectionTop
                subTitle='Available Hotels'
            />

            {isLoading ? <>Loading...</> : <div className="flex flex-col gap-y-5 md:grid md:grid-cols-2 xl:grid-cols-3 md:items-center md:gap-x-4 lg:gap-[30px]">
                {hotels?.data.slice(0, 3).map((item: IHotel, index: number) => <HotelCard
                    key={`hotel${index}`}
                    item={item}
                />)}
            </div>}


        </SectionLayout>
    )
}

export default HomeHotels