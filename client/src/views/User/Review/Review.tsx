import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CustomButton from '@/components/Button/Button'
import Input from '@/components/Forms/Input'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { orderHistoryLink } from '@/configs/constants'
import { useGetBookingQuery } from '@/redux-rtk/features/booking/bookingApi'
import { useCreateReviewMutation } from '@/redux-rtk/features/review/reviewApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from "yup";

const reviewSchema = Yup.object().shape({
    review: Yup.string().required("review is required"),
});

const Review = () => {

    // globals
    const { query, push } = useRouter();
    const orderId = query.orderId;

    // redux api
    const { data: booking, isLoading, isError, isSuccess } = useGetBookingQuery(orderId);
    const [createReview, { isLoading: reviewLoading, isSuccess: reviewSuccess }] = useCreateReviewMutation();

    // hooks
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(reviewSchema),
        defaultValues: {
            review: ''
        },
    });

    // if api call success then redirect to dashboard
    useEffect(() => {
        if (reviewSuccess) {
            push(orderHistoryLink)
        }
    }, [reviewSuccess, push])


    const handleAddReview = (fData: any) => {

        const siData = {
            ...fData,
            booking: booking?.data?._id,
            room: booking?.data?.room,
        }

        // post data to server
        createReview(siData)
    }

    return (
        <>

            <Breadcrumb
                links={[
                    {
                        title: 'Bookings',
                        url: orderHistoryLink,
                    },
                    {
                        title: 'Review',
                        url: `/review/`,
                    },
                ]}
            />

            <CardLayout title='Review' isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
                <form onSubmit={handleSubmit(handleAddReview)}>
                    <Controller
                        name="review"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="Give your feedback"
                                id="review"
                                placeholder="ex: abcd"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.review?.message}
                                labelRequired
                            />
                        )}
                    />

                    <div className='mt-8 flex justify-end'>
                        <CustomButton
                            text='Add Review'
                            css='w-[180px]'
                            loadingText='Reviewing'
                            isLoading={reviewLoading}
                        />
                    </div>

                </form>
            </CardLayout>
        </>
    )
}

export default Review