import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import { orderHistoryLink } from '@/configs/constants';
import { cx } from '@/hooks/helpers';
import { useGetBookingsByIdQuery } from '@/redux-rtk/features/booking/bookingApi';
import React from 'react'
import DataTable from 'react-data-table-component';
import OHActionBtn from './partals/OHActionBtn';

const OrderHistory = () => {

    // get roles from redux api
    const { data: bookings, isLoading, isError, isSuccess } = useGetBookingsByIdQuery(undefined);

    // datas
    const columns: any = [
        {
            name: 'Room Number',
            selector: (row: any) => row.room?.roomNumber,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Type',
            selector: (row: any) => row.room?.roomType,
            filterable: true,
        },
        {
            name: 'Starting Date',
            selector: (row: any) => row.bookingStartDate,
        },
        {
            name: 'Ending Date',
            selector: (row: any) => row.bookingEndDate,
        },
        {
            name: 'Cost',
            selector: (row: any) => <>{row.totalCost} BDT</>,
        },
        {
            name: 'Status',
            selector: (row: any) => <div
                className={cx(
                    row.status === 'pending' && 'bg-purple',
                    row.status === 'accept' && 'bg-green-300',
                    row.status === 'cancel' && 'bg-red-500',
                    row.status === 'reject' && 'bg-red-700',
                    row.status === 'adjust' && 'bg-yellow-700',
                    'px-2.5 py-1 rounded-md capitalize text-white text-[12px] w-[100px] text-center'
                )}
            >
                {row.status}
            </div>,
        },
        {
            name: 'Action',
            cell: (row: any) => <OHActionBtn row={row} />,
        },
    ];

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'Orders History',
                        url: orderHistoryLink,
                    }
                ]}
            // addText='Add User'
            // addUrl={addUserLink}
            />

            <CardLayout title='Order History' isLoading={false} isError={isError} isSuccess={isSuccess} >
                <DataTable
                    columns={columns}
                    data={bookings?.data}
                    highlightOnHover
                    progressPending={isLoading}
                    pagination
                    persistTableHead={true}
                    paginationPerPage={15}
                />
            </CardLayout>
        </>
    )
}

export default OrderHistory