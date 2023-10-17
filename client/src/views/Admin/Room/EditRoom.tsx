import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import { roomsLink } from '@/configs/constants';
import { useGetHotelsQuery } from '@/redux-rtk/features/hotel/hotelApi';
import { useGetRoomQuery } from '@/redux-rtk/features/room/roomApi';
import { useRouter } from 'next/router';
import React from 'react'
import UpdateRoom from './partials/UpdateRoom';

const EditRoom = () => {

    // globals
    const { query } = useRouter();
    const roomId = query.roomId;

    // redux api
    const { data: room, isLoading, isError, isSuccess } = useGetRoomQuery(roomId);
    const { data: hotels, isLoading: hotelsLoading, isError: hotelsError, isSuccess: hotelSuccess } = useGetHotelsQuery(undefined);

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Rooms',
                        url: roomsLink,
                    },
                    {
                        title: 'Edit Room',
                        url: `room/${room?.data?._id}`,
                    },
                ]}
            />

            <CardLayout title={`Update User [${room?.data?._id}]`} isLoading={isLoading || hotelsLoading} isError={isError || hotelsError} isSuccess={isSuccess || hotelSuccess}>
                <UpdateRoom
                    data={room?.data}
                    roomId={roomId}
                    hotelDatas={hotels?.data}
                />
            </CardLayout>
        </>
    )
}

export default EditRoom