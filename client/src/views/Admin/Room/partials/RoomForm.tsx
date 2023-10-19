import Input from '@/components/Forms/Input';
import SelectCustom, { selectItemType } from '@/components/Forms/SelectCustom';
import React, { useEffect } from 'react'
import { Controller } from 'react-hook-form';
import { roomTypeOptions, statusOptions } from '../utils/roomConstants';
import { IHotel, IRoom } from '@/configs/types';

type Props = {
    control: any;
    errors: any;
    error?: any;
    editPage?: boolean;
    hotelDatas?: IHotel[];
    selectedStatus: selectItemType | undefined;
    setSelectedStatus: (selectedStatus: selectItemType | undefined) => void;
    selectedRoomType: selectItemType | undefined;
    setSelectedRoomType: (selectedRoomType: selectItemType | undefined) => void;
    selectedHotel: selectItemType | undefined;
    setSelectedHotel: (selectedHotel: selectItemType | undefined) => void;
    roomData?: IRoom;
}

const RoomForm = ({ control, errors, error, editPage, selectedStatus, setSelectedStatus, selectedRoomType, setSelectedRoomType, selectedHotel, setSelectedHotel, hotelDatas, roomData }: Props) => {

    const hotelsOptions = hotelDatas?.map((e: IHotel) => {
        return {
            _id: e._id as string,
            label: `${e.name}`,
            value: e._id as string
        }
    }) || []

    // set data on state
    useEffect(() => {
        if (editPage && roomData?.hotel) {
            setSelectedHotel(hotelsOptions.find((item: selectItemType) => item.value === roomData?.hotel as any));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomData?.hotel, editPage])

    return (
        <div className='grid md:grid-cols-2 gap-x-5 gap-y-7'>
            <Controller
                name="roomNumber"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Hotel Room Number"
                        id="roomNumber"
                        placeholder="ex: 101"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.roomNumber?.message}
                        labelRequired
                    />
                )}
            />

            {/* Email */}
            <Controller
                name="price"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Price"
                        id="price"
                        type="price"
                        placeholder="11000"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.price?.message}
                        labelRequired
                    />
                )}
            />

            <SelectCustom
                value={selectedRoomType}
                defaultValue={selectedRoomType}
                onChange={(option: selectItemType) => setSelectedRoomType(option)}
                options={roomTypeOptions}
                label='Select Room Type'
                placeHolder='Select Room Type'
                required
                error={error.roomType}
            />

            <SelectCustom
                value={selectedHotel}
                defaultValue={selectedHotel}
                onChange={(option: selectItemType) => setSelectedHotel(option)}
                options={hotelsOptions}
                label='Select Hotel'
                placeHolder='Select Hotel'
                required
                error={error.hotel}
            />

            <SelectCustom
                value={selectedStatus}
                defaultValue={selectedStatus}
                onChange={(option: selectItemType) => setSelectedStatus(option)}
                options={statusOptions}
                label='Is Available?'
                placeHolder='Select Status'
                required
                error={error.status}
            />



        </div>
    )
}

export default RoomForm