import CustomButton from '@/components/Button/Button'
import React, { useEffect, useState } from 'react'
import { selectItemType } from '@/components/Forms/SelectCustom';
import { ordersLink } from '@/configs/constants';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { OrderStatusOptions } from '../utils/orderConst';
import { useUpdateBookingStatusAdminMutation } from '@/redux-rtk/features/booking/bookingApi';
import BookingForm from './BookingForm';

type Props = {
    data: any;
    bookingId: string | string[] | undefined;
}

const UpdateBooking = ({ data, bookingId }: Props) => {

    const router = useRouter();

    // rtk
    const [updateBookingStatusAdmin, { isLoading: updateLoading, isSuccess }] = useUpdateBookingStatusAdminMutation();

    // states
    const [selectedStatus, setSelectedStatus] = useState<selectItemType | undefined>({ _id: 'xxlocations', label: 'Select Status', value: '' });
    const [error, setError] = useState({ status: false });

    // set data on state
    useEffect(() => {
        if (data) {
            setSelectedStatus(OrderStatusOptions.find((item: selectItemType) => item.value === data?.status))
        }
    }, [data])

    // error dismiss
    useEffect(() => {
        selectedStatus?.value && setError({ ...error, status: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStatus?.value])

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            router.push(ordersLink)
        }
    }, [isSuccess, router])

    const handleUpdateBooking = (e: any) => {
        e.preventDefault()
        // final data to send server
        const updatedData = {
            status: selectedStatus?.value,
        }

        if (updatedData.status === '') {
            setError({ ...error, status: true })
            return toast.error('status is required!');
        }


        updateBookingStatusAdmin({
            bookingId, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <>
            <form onSubmit={handleUpdateBooking}>
                <BookingForm
                    error={error}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />

                <div className='mt-8 flex justify-end'>
                    <CustomButton
                        text='Update Hotel'
                        css='w-[180px]'
                        loadingText='Updating'
                        isLoading={updateLoading}
                    />
                </div>

            </form>
        </>
    )
}

export default UpdateBooking