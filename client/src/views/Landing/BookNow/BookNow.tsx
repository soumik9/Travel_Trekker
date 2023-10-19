import CustomButton from '@/components/Button/Button';
import Input from '@/components/Forms/Input';
import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout';
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop';
import { cx, useAppDispatch, useAppSelector } from '@/hooks/helpers';
import { useGetRoomQuery } from '@/redux-rtk/features/room/roomApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { bookingDefaultValues, bookingSchema } from './utils/bookNowConstant';
import { useCreateBookingMutation } from '@/redux-rtk/features/booking/bookingApi';
import { homeLink, loginUrl } from '@/configs/constants';
import { userLoggedOut } from '@/redux-rtk/features/auth/authSlice';

const BookNow = () => {

    // globals
    const { query, push } = useRouter();
    const roomId = query.roomId;

    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    // redux api
    const { data: room, isLoading } = useGetRoomQuery(roomId);
    const [createBooking, { isLoading: bookingLoading, isSuccess }] = useCreateBookingMutation();

    // hooks
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: yupResolver(bookingSchema),
        defaultValues: bookingDefaultValues,
    });

    //states
    const [totalDays, setTotalDays] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        if (isSuccess) {
            push(homeLink)
        }
    }, [isSuccess, push])

    // if profile api failed to fetch
    useEffect(() => {
        if (!auth.isAuthenticated) {
            dispatch(userLoggedOut());
            push(loginUrl);
        }
    }, [auth.isAuthenticated, dispatch, push])

    const bookingStartDate = watch('bookingStartDate');
    const bookingEndDate = watch('bookingEndDate');

    useEffect(() => {
        if (bookingStartDate && bookingEndDate) {
            const startDate: any = new Date(bookingStartDate);
            const endDate: any = new Date(bookingEndDate);
            const timeDiff = endDate - startDate;
            const days = timeDiff / (1000 * 60 * 60 * 24);
            setTotalDays(days);

            // Calculate and set the total cost if needed
            if (room?.data?.price) {
                const pricePerNight = room.data.price;
                const totalCost = pricePerNight * days;
                setTotalCost(totalCost);
            }
        }
    }, [bookingStartDate, bookingEndDate, room?.data?.price]);

    const handleBookNow = (fData: any) => {
        const finalData = { ...fData, totalDays, totalCost, room: room?.data._id }
        createBooking(finalData)
    }

    if (isLoading) return <>Loading...</>
    if (!auth.isAuthenticated) return null;

    return (
        <main className='bg-bgDark text-white'>
            <SectionLayout>

                <SectionTop
                    subTitle={`${room?.data.hotel?.name}`}
                />

                <div className={cx(
                    'border-primary border p-5 rounded hover:bg-lightDark trans mb-8 flex flex-col gap-y-4'
                )}>
                    <p className='text-sm lg:text-base text-center cursor-default'>
                        Total Costing - {totalCost} BDT
                    </p>
                    <p className='text-sm lg:text-base text-center cursor-default'>
                        Total Days - {totalDays} DAY
                    </p>
                </div>

                <div className='grid grid-cols-2 gap-[30px]'>

                    <div className={cx(
                        'border-primary border p-5 rounded f-center flex-col gap-y-4 md:min-h-[220px] hover:bg-lightDark trans'
                    )}>
                        <div className={cx(
                            'text-[32px]'
                        )}>
                            {room?.data?.hotel?.name}
                        </div>

                        <h4 className='text-base md:text-[20px] font-medium text-primary capitalize cursor-default'>
                            {room?.data?.hotel?.location}
                        </h4>

                        <p className='text-sm lg:text-base text-center cursor-default'>
                            Room number - {room?.data?.roomNumber}
                        </p>

                        <p className='text-sm lg:text-base text-center cursor-default'>
                            Room Type - {room?.data?.roomType}
                        </p>
                        <p className='text-sm lg:text-base text-center cursor-default'>
                            Price - {room?.data?.price} BDT
                        </p>

                    </div>

                    <div className={cx(
                        'border-primary border p-5 rounded hover:bg-lightDark trans '
                    )}>
                        <form onSubmit={handleSubmit(handleBookNow)} className='flex flex-col gap-y-4'>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Address"
                                        id="name"
                                        placeholder="ex: Naogaon"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.address?.message}
                                        labelRequired
                                    />
                                )}
                            />
                            <Controller
                                name="bookingStartDate"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Strating Date"
                                        id="bookingStartDate"
                                        type='date'
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.bookingStartDate?.message}
                                        labelRequired
                                    />
                                )}
                            />
                            <Controller
                                name="bookingEndDate"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Ending Date"
                                        id="bookingEndDate"
                                        type='date'
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors.bookingEndDate?.message}
                                        labelRequired
                                    />
                                )}
                            />
                            <div className='mt-8 flex justify-end'>
                                <CustomButton
                                    text='Book Now'
                                    css='w-[180px]'
                                    loadingText='Booking'
                                    isLoading={bookingLoading}
                                />
                            </div>

                        </form>
                    </div>
                </div>
            </SectionLayout>
        </main>
    )
}

export default BookNow