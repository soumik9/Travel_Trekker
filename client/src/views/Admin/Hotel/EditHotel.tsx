import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import { hotelsLink } from '@/configs/constants';
import { useGetHotelQuery } from '@/redux-rtk/features/hotel/hotelApi';
import { useRouter } from 'next/router';
import React from 'react'
import UpdateHotel from './partials/UpdateHotel';

const EditHotel = () => {

    // globals
    const { query } = useRouter();
    const hotelId = query.hotelId;

    // redux api
    const { data: hotel, isLoading, isError, isSuccess } = useGetHotelQuery(hotelId);

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Hotels',
                        url: hotelsLink,
                    },
                    {
                        title: 'Edit Hotel',
                        url: `hotel/${hotel?.data?._id}`,
                    },
                ]}
            />

            <CardLayout title={`Update User [${hotel?.data?._id}]`} isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
                <UpdateHotel
                    data={hotel?.data}
                    hotelId={hotelId}
                />
            </CardLayout>
        </>
    )
}

export default EditHotel