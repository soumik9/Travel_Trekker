import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { addNewsLink, addUserLink, newsLink } from '@/configs/constants'
import React from 'react'
import DataTable from 'react-data-table-component'
import Image from 'next/image'
import { useGetNewsQuery } from '@/redux-rtk/features/news/newsApi'
import NewsActionBtn from './partials/NewsActionBtn'

const News = () => {

    // get roles from redux api
    const { data: news, isLoading, isError, isSuccess } = useGetNewsQuery(undefined);

    // datas
    const columns: any = [
        {
            name: 'Image',
            selector: (row: any) => <Image
                width={50} height={50} src={row.image} alt={row.name}
                className='my-2 rounded-full w-[50px] h-[45px] border border-warning oject-cover'
            />,
        },
        {
            name: 'Name',
            selector: (row: any) => row.title,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row: any) => <NewsActionBtn row={row} />,
        },
    ];

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'News',
                        url: newsLink,
                    }
                ]}
                addText='Add News'
                addUrl={addNewsLink}
            />

            <CardLayout title='News' isLoading={false} isError={isError} isSuccess={isSuccess} >
                <DataTable
                    columns={columns}
                    data={news?.data}
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

export default News