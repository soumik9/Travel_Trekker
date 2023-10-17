import CustomButton from '@/components/Button/Button'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IHotel, IRoom } from '@/configs/types';
import { selectItemType } from '@/components/Forms/SelectCustom';
import { roomsLink } from '@/configs/constants';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { roomSchema } from '../utils/roomSchema';
import { useUpdateRoomMutation } from '@/redux-rtk/features/room/roomApi';
import { roomTypeOptions, statusOptions } from '../utils/roomConstants';
import RoomForm from './RoomForm';

type Props = {
    data: IRoom;
    roomId: string | string[] | undefined;
    hotelDatas: IHotel[];
}

const UpdateRoom = ({ data, roomId, hotelDatas }: Props) => {

    const router = useRouter();

    // rtk
    const [updateRoom, { isLoading: updateLoading, isSuccess }] = useUpdateRoomMutation();

    // hook form
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(roomSchema),
        defaultValues: {
            roomNumber: data?.roomNumber,
            price: data?.price.toString(),
        },
    });

    // states
    const [selectedStatus, setSelectedStatus] = useState<selectItemType | undefined>(statusOptions[0]);
    const [selectedRoomType, setSelectedRoomType] = useState<selectItemType | undefined>(roomTypeOptions[2]);
    const [selectedHotel, setSelectedHotel] = useState<selectItemType | undefined>({ _id: 'xxHotel', label: 'Select Hotel', value: '' });
    const [error, setError] = useState({ status: false, roomType: false, hotel: false });

    // set data on state
    useEffect(() => {
        if (data) {
            setSelectedStatus(statusOptions.find((item: selectItemType) => item.value === data?.isAvailable));
            setSelectedRoomType(roomTypeOptions.find((item: selectItemType) => item.value === data?.roomType));
        }
    }, [data])

    // error dismiss
    useEffect(() => {
        selectedStatus?.value && setError({ ...error, status: false });
        selectedRoomType?.value && setError({ ...error, roomType: false });
        selectedHotel?.value && setError({ ...error, hotel: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStatus?.value, selectedRoomType?.value, selectedHotel?.value])

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            router.push(roomsLink)
        }
    }, [isSuccess, router])

    const handleUpdateRoom = (fData: any) => {

        // final data to send server
        const updatedData = {
            ...fData,
            price: parseFloat(fData.price),
            status: selectedStatus?.value,
            roomType: selectedRoomType?.value,
            hotel: selectedHotel?.value,
        }

        if (updatedData.roomType === '') {
            setError({ ...error, roomType: true })
            return toast.error('Room type is required!');
        }

        if (updatedData.status === '') {
            setError({ ...error, status: true })
            return toast.error('Status is required!');
        }

        if (updatedData.hotel === '') {
            setError({ ...error, hotel: true })
            return toast.error('Hotel name is required!');
        }

        updateRoom({
            roomId, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleUpdateRoom)}>
                <RoomForm
                    control={control}
                    errors={errors}
                    error={error}
                    hotelDatas={hotelDatas}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    selectedRoomType={selectedRoomType}
                    setSelectedRoomType={setSelectedRoomType}
                    selectedHotel={selectedHotel}
                    setSelectedHotel={setSelectedHotel}
                    editPage
                    roomData={data}
                />

                <div className='mt-8 flex justify-end'>
                    <CustomButton
                        text='Update Room'
                        css='w-[180px]'
                        loadingText='Updating'
                        isLoading={updateLoading}
                    />
                </div>

            </form>
        </>
    )
}

export default UpdateRoom