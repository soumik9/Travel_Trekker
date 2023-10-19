import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import { addFAQLink, faqsLink } from '@/configs/constants';
import { IFaq } from '@/configs/types';
import { useGetFaqsQuery } from '@/redux-rtk/features/faq/faqApi';
import React from 'react'
import DataTable from 'react-data-table-component';
import FAQActionBtn from './partials/FAQActionBtn';

const FAQ = () => {

    // get roles from redux api
    const { data: faqs, isLoading, isError, isSuccess } = useGetFaqsQuery(undefined);

    // datas
    const columns: any = [
        {
            name: 'Question',
            selector: (row: IFaq) => row.question,
            filterable: true,
            sortable: true,
        },
        {
            name: 'Answer',
            selector: (row: IFaq) => row.answer,
            width: '300px'
        },
        {
            name: 'Action',
            cell: (row: IFaq) => <FAQActionBtn row={row} />,
            width: '300px'
        },
    ];

    return (
        <>
            <Breadcrumb
                links={[
                    {
                        title: 'FAQS',
                        url: faqsLink,
                    }
                ]}
                addText='Add Faq'
                addUrl={addFAQLink}
            />

            <CardLayout title='Faqs' isLoading={false} isError={isError} isSuccess={isSuccess} >
                <DataTable
                    columns={columns}
                    data={faqs?.data}
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

export default FAQ