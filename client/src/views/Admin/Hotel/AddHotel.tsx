import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import { addHotelLink, hotelsLink } from '@/configs/constants'
import { useCreateHotelMutation } from '@/redux-rtk/features/hotel/hotelApi';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { hotelSchema } from './utils/hotelSchema';
import { hotelDefaultValues } from './utils/hotelDefaultValues';
import { selectItemType } from '@/components/Forms/SelectCustom';
import toast from 'react-hot-toast';
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import HotelForm from './partials/HotelForm';
import CustomButton from '@/components/Button/Button';


const AddHotel = () => {

    // globals
    const [createHotel, { isLoading, isSuccess }] = useCreateHotelMutation();

    // hooks
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(hotelSchema),
        defaultValues: hotelDefaultValues,
    });

    // states
    const [selectedLocation, setSelectedLocation] = useState<selectItemType | undefined>({ _id: 'xxRole', label: 'Select Location', value: '' });
    const [error, setError] = useState({ location: false });

    // error dismiss
    useEffect(() => {
        selectedLocation?.value && setError({ ...error, location: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLocation?.value])

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            reset();
            setSelectedLocation({ _id: 'xxLocation', label: 'Select Location', value: '' });
        }
    }, [isSuccess, reset])

    // add new user funtion
    const handleAddHotel = (fData: any) => {

        // final data to send server
        const finalData = {
            ...fData,
            rating: parseFloat(fData.rating),
            location: selectedLocation?.value,
        }

        if (finalData.location === '') {
            setError({ ...error, location: true })
            return toast.error('Role is required!');
        }

        // post data to server
        createHotel(finalData)
    }


    return (
        <>

            <Breadcrumb
                links={[
                    {
                        title: 'Hotels',
                        url: hotelsLink,
                    },
                    {
                        title: 'Add Hotel',
                        url: addHotelLink,
                    },
                ]}
            />

            <CardLayout title='Add Hotel' isNotInitalized>
                <form onSubmit={handleSubmit(handleAddHotel)}>
                    <HotelForm
                        control={control}
                        errors={errors}
                        error={error}
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                    />

                    <div className='mt-8 flex justify-end'>
                        <CustomButton
                            text='Add Hotel'
                            css='w-[180px]'
                            loadingText='Adding'
                            isLoading={isLoading}
                        />
                    </div>

                </form>
            </CardLayout>
        </>
    )
}

export default AddHotel