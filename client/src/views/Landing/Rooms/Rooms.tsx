import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import { IHotel, IRoom } from '@/configs/types'
import { useGetRoomsQuery } from '@/redux-rtk/features/room/roomApi'
import React, { useState, useEffect } from 'react'
import RoomCard from './partials/RoomCard'
import SelectCustom, { selectItemType } from '@/components/Forms/SelectCustom'
import { useGetHotelsQuery } from '@/redux-rtk/features/hotel/hotelApi'
import { districtOptions } from '@/configs/districtOptions'
import Input from '@/components/Forms/Input'

type Props = {}

const Rooms = (props: Props) => {

    const [fData, setFdata] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedHotel, setSelectedHotel] = useState<selectItemType | undefined>({ _id: 'xxHotel', label: 'Select Hotel', value: '' });
    const [selectedLocation, setSelectedLocation] = useState<selectItemType | undefined>({ _id: 'xxRole', label: 'Select Location', value: '' });

    // get roles from redux api
    const { data: rooms, isLoading } = useGetRoomsQuery(undefined);
    const { data: hotels, isLoading: hotelLoading } = useGetHotelsQuery(undefined);

    const hotelsOptions = hotels?.data.map((e: IHotel) => {
        return {
            _id: e._id as string,
            label: `${e.name}`,
            value: e._id as string
        }
    }) || []

    // /setting data
    useEffect(() => {
        if (rooms?.data) {
            const locationValue = typeof selectedLocation?.value === 'string' ? selectedLocation.value : '';

            if (selectedHotel?.value && selectedLocation?.value && searchText) {
                const gotDataByHotel = rooms?.data.filter((item: any) => item.hotel?._id === selectedHotel.value && item.hotel?.location.toLowerCase() === locationValue.toLowerCase() && Number(item.roomNumber) === Number(searchText));
                setFdata(gotDataByHotel);
            } else if (searchText) {
                const gotDataBySearchText = rooms?.data.filter((item: any) => Number(item.roomNumber) === Number(searchText));
                setFdata(gotDataBySearchText);
            } else if (selectedHotel?.value) {
                const gotDataByHotel = rooms?.data.filter((item: any) => item.hotel?._id === selectedHotel.value);
                setFdata(gotDataByHotel);
            } else if (selectedLocation?.value) {
                const gotDataByLocation = rooms?.data.filter((item: any) => {
                    return item.hotel?.location.toLowerCase() === locationValue.toLowerCase();
                });
                setFdata(gotDataByLocation);
            } else {
                setFdata(rooms?.data)
            }
        }
    }, [rooms?.data, selectedHotel?.value, selectedLocation?.value, searchText])

    return (
        <main className='bg-bgDark text-white'>
            <SectionLayout>

                <SectionTop
                    subTitle='Available Rooms'
                />

                <div className='w-full flex flex-col lg:flex-row justify-end mb-6 gap-x-5'>
                    <div className='w-[300px] '>
                        <Input
                            label="Search by room number"
                            id="search"
                            placeholder="Search by room number"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>

                    <div className='w-[300px] '>
                        <SelectCustom
                            value={selectedLocation}
                            defaultValue={selectedLocation}
                            onChange={(option: selectItemType) => setSelectedLocation(option)}
                            options={[{ _id: 'xxRole', label: 'Select Location', value: '' }, ...districtOptions]}
                            label='Select Location'
                            placeHolder='Select Location'
                        />
                    </div>
                    <div className='w-[300px] '>
                        <SelectCustom
                            value={selectedHotel}
                            defaultValue={selectedHotel}
                            onChange={(option: selectItemType) => setSelectedHotel(option)}
                            options={[{ _id: 'xxHotel', label: 'Select Hotel', value: '' }, ...hotelsOptions]}
                            label='Select Hotel'
                            placeHolder='Select Hotel'
                        />
                    </div>
                </div>

                {isLoading ? <>Loading...</> : <div className="flex flex-col gap-y-5 md:grid md:grid-cols-2 xl:grid-cols-3 md:items-center md:gap-x-4 lg:gap-[30px]">
                    {fData.map((item: IRoom, index: number) => <RoomCard
                        key={item._id}
                        item={item}
                    />)}
                </div>}

            </SectionLayout>
        </main>
    )
}

export default Rooms