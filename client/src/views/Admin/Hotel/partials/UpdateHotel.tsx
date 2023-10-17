import CustomButton from '@/components/Button/Button'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IHotel } from '@/configs/types';
import { selectItemType } from '@/components/Forms/SelectCustom';
import { hotelsLink } from '@/configs/constants';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useUpdateHotelMutation } from '@/redux-rtk/features/hotel/hotelApi';
import { hotelSchema } from '../utils/hotelSchema';
import HotelForm from './HotelForm';
import { districtOptions } from '@/configs/districtOptions';

type Props = {
    data: IHotel;
    hotelId: string | string[] | undefined;
}

const UpdateHotel = ({ data, hotelId }: Props) => {

    const router = useRouter();

    // rtk
    const [UpdateHotel, { isLoading: updateLoading, isSuccess }] = useUpdateHotelMutation();

    // hook form
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(hotelSchema),
        defaultValues: {
            name: data?.name,
            rating: data?.rating.toString(),
        },
    });

    // states
    const [selectedLocation, setSelectedLocation] = useState<selectItemType | undefined>({ _id: 'xxlocation', label: 'Select Location', value: '' });
    const [error, setError] = useState({ location: false });

    // set data on state
    useEffect(() => {
        if (data) {
            setSelectedLocation(districtOptions.find((item: selectItemType) => item.value === data?.location))
        }
    }, [data])

    // error dismiss
    useEffect(() => {
        selectedLocation?.value && setError({ ...error, location: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLocation?.value])

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            router.push(hotelsLink)
        }
    }, [isSuccess, router])

    const handleUpdateHotel = (fData: any) => {

        // final data to send server
        const updatedData = {
            ...fData,
            location: selectedLocation?.value,
        }

        if (updatedData.location === '') {
            setError({ ...error, location: true })
            return toast.error('Location is required!');
        }


        UpdateHotel({
            hotelId, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleUpdateHotel)}>
                <HotelForm
                    control={control}
                    errors={errors}
                    error={error}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    editPage
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

export default UpdateHotel