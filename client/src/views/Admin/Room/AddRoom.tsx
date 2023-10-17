import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { addRoomLink, roomsLink } from '@/configs/constants'
import { useCreateRoomMutation } from '@/redux-rtk/features/room/roomApi'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import RoomForm from './partials/RoomForm'
import { roomSchema } from './utils/roomSchema'
import { roomDefaultValues } from './utils/roomDefaultValues'
import CustomButton from '@/components/Button/Button'
import { selectItemType } from '@/components/Forms/SelectCustom'
import { roomTypeOptions, statusOptions } from './utils/roomConstants'
import { useGetHotelsQuery } from '@/redux-rtk/features/hotel/hotelApi'
import toast from 'react-hot-toast'

const AddRoom = () => {


    // globals
    const [createRoom, { isLoading: roomLoading, isSuccess: roomSuccess }] = useCreateRoomMutation();
    const { data: hotels, isLoading, isError, isSuccess } = useGetHotelsQuery(undefined);

    // console.log(hotels?.data);


    // hooks
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(roomSchema),
        defaultValues: roomDefaultValues,
    });

    // states
    const [selectedStatus, setSelectedStatus] = useState<selectItemType | undefined>(statusOptions[0]);
    const [selectedRoomType, setSelectedRoomType] = useState<selectItemType | undefined>(roomTypeOptions[2]);
    const [selectedHotel, setSelectedHotel] = useState<selectItemType | undefined>({ _id: 'xxHotel', label: 'Select Hotel', value: '' });
    const [error, setError] = useState({ status: false, roomType: false, hotel: false });

    // error dismiss
    useEffect(() => {
        selectedStatus?.value && setError({ ...error, status: false });
        selectedRoomType?.value && setError({ ...error, roomType: false });
        selectedHotel?.value && setError({ ...error, hotel: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStatus?.value, selectedRoomType?.value, selectedHotel?.value])

    // after succes of api fetch set input initial
    useEffect(() => {
        if (roomSuccess) {
            reset();
            setSelectedStatus(statusOptions[0]);
            setSelectedRoomType(roomTypeOptions[2]);
            setSelectedHotel({ _id: 'xxHotel', label: 'Select Hotel', value: '' });
        }
    }, [roomSuccess, reset])

    const handleAddRoom = (fData: any) => {
        console.log(selectedHotel);

        // final data to send server
        const finalData = {
            ...fData,
            price: parseFloat(fData.price),
            status: selectedStatus?.value,
            roomType: selectedRoomType?.value,
            hotel: selectedHotel?.value,
        }

        if (finalData.roomType === '') {
            setError({ ...error, roomType: true })
            return toast.error('Room type is required!');
        }

        if (finalData.status === '') {
            setError({ ...error, status: true })
            return toast.error('Status is required!');
        }

        if (finalData.hotel === '') {
            setError({ ...error, hotel: true })
            return toast.error('Hotel name is required!');
        }

        // post data to server
        createRoom(finalData)
    }

    return (
        <>

            <Breadcrumb
                links={[
                    {
                        title: 'Rooms',
                        url: roomsLink,
                    },
                    {
                        title: 'Add Room',
                        url: addRoomLink,
                    },
                ]}
            />

            <CardLayout title='Add Room' isLoading={isLoading} isError={isError} isSuccess={isSuccess}>
                <form onSubmit={handleSubmit(handleAddRoom)}>
                    <RoomForm
                        control={control}
                        errors={errors}
                        error={error}
                        hotelDatas={hotels?.data}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        selectedRoomType={selectedRoomType}
                        setSelectedRoomType={setSelectedRoomType}
                        selectedHotel={selectedHotel}
                        setSelectedHotel={setSelectedHotel}
                    />

                    <div className='mt-8 flex justify-end'>
                        <CustomButton
                            text='Add Room'
                            css='w-[180px]'
                            loadingText='Adding'
                            isLoading={roomLoading}
                        />
                    </div>

                </form>
            </CardLayout>
        </>
    )
}

export default AddRoom