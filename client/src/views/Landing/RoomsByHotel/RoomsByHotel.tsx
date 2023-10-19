import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout';
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop';
import { IRoom } from '@/configs/types';
import { useGetHotelQuery } from '@/redux-rtk/features/hotel/hotelApi';
import { useRouter } from 'next/router';
import React from 'react'
import HRoomCard from './partials/HRoomCard';

type Props = {}

const RoomsByHotel = (props: Props) => {

    // globals
    const { query } = useRouter();
    const hotelId = query.hotelId;

    // redux api
    const { data: hotel, isLoading } = useGetHotelQuery(hotelId);

    if (isLoading) return <>Loading...</>

    return (
        <main className='bg-bgDark text-white'>
            <SectionLayout>

                <SectionTop
                    subTitle={`${hotel?.data.name} Rooms`}
                />

                {isLoading ? <>Loading...</> : <div className="flex flex-col gap-y-5 md:grid md:grid-cols-2 xl:grid-cols-3 md:items-center md:gap-x-4 lg:gap-[30px]">
                    {hotel?.data?.rooms.map((item: IRoom) => <HRoomCard
                        key={item._id}
                        item={item}
                        hotel={hotel?.data}
                    />)}
                </div>}
            </SectionLayout>
        </main>
    )
}

export default RoomsByHotel