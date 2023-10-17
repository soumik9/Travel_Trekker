import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { addRoomLink, roomsLink } from '@/configs/constants'
import { cx } from '@/hooks/helpers'
import { useGetRoomsQuery } from '@/redux-rtk/features/room/roomApi'
import React from 'react'
import DataTable from 'react-data-table-component'
import RoomActionBtn from './partials/RoomActionsBtn'
import { IRoom } from '@/configs/types'

const Room = () => {

    // get roles from redux api
    const { data: rooms, isLoading, isError, isSuccess } = useGetRoomsQuery(undefined);

    // datas
    const columns: any = [
        {
            name: 'Hotel Name',
            selector: (row: IRoom) => row.hotel.name,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Room Number',
            selector: (row: IRoom) => row.roomNumber,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Type',
            selector: (row: IRoom) => row.roomType,
            filterable: true,
        },
        {
            name: 'Price',
            selector: (row: IRoom) => row.price,
        },
        {
            name: 'Status',
            selector: (row: IRoom) => <div
                className={cx(
                    row.isAvailable && 'bg-success',
                    !row.isAvailable && 'bg-error',
                    'px-2.5 py-1 rounded-md capitalize text-white text-[12px] w-[100px] text-center'
                )}
            >
                {row.isAvailable ? 'Available' : 'Unavailable'}
            </div>,
        },
        {
            name: 'Action',
            cell: (row: IRoom) => <RoomActionBtn row={row} />,
        },
    ];

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Rooms',
                        url: roomsLink,
                    }
                ]}
                addText='Add Room'
                addUrl={addRoomLink}
            />

            <CardLayout title='Rooms' isLoading={false} isError={isError} isSuccess={isSuccess} >
                <DataTable
                    columns={columns}
                    data={rooms?.data}
                    highlightOnHover
                    progressPending={isLoading}
                    pagination
                    persistTableHead={true}
                    paginationPerPage={15}
                />
            </CardLayout >
        </>
    )
}

export default Room