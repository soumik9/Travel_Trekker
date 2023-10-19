import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import { ordersLink } from '@/configs/constants';
import { useGetBookingQuery } from '@/redux-rtk/features/booking/bookingApi';
import { useRouter } from 'next/router';
import React from 'react'
import UpdateBooking from './partials/UpdateBooking';

const EditOrder = () => {

    // globals
    const { query } = useRouter();
    const orderId = query.orderId;

    // redux api
    const { data: booking, isLoading, isError, isSuccess } = useGetBookingQuery(orderId);

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Booking',
                        url: ordersLink,
                    },
                    {
                        title: 'Edit Order',
                        url: `order/${booking?.data?._id}`,
                    },
                ]}
            />

            <CardLayout title={`Update Order [${booking?.data?._id}]`} isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
                <UpdateBooking
                    data={booking?.data}
                    bookingId={orderId}
                />
            </CardLayout>
        </>
    )
}

export default EditOrder