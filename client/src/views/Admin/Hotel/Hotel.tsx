import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import { addHotelLink, hotelsLink } from '@/configs/constants'
import { useGetHotelsQuery } from '@/redux-rtk/features/hotel/hotelApi';
import React from 'react'
import DataTable from 'react-data-table-component';
import HotelActionBtn from './partials/HotelActionsBtn';
import { IHotel } from '@/configs/types';

const Hotel = () => {

    // get roles from redux api
    const { data: hotels, isLoading, isError, isSuccess } = useGetHotelsQuery(undefined);

    // datas
    const columns: any = [
        {
            name: 'Name',
            selector: (row: IHotel) => row.name,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Location',
            selector: (row: IHotel) => row.location,
            filterable: true,
        },
        {
            name: 'Rating',
            selector: (row: IHotel) => row.rating,
        },
        {
            name: 'Action',
            cell: (row: IHotel) => <HotelActionBtn row={row} />,
        },
    ];

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Hotels',
                        url: hotelsLink,
                    }
                ]}
                addText='Add Hotel'
                addUrl={addHotelLink}
            />

            <CardLayout title='Users' isLoading={false} isError={isError} isSuccess={isSuccess} >
                <DataTable
                    columns={columns}
                    data={hotels?.data}
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

export default Hotel