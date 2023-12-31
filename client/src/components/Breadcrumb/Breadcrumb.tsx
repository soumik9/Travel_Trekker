import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { dashboardLink } from '@/configs/constants';
import Link from 'next/link';
import { cx } from '@/hooks/helpers';
import { useRouter } from 'next/router';

type Props = {
    links?: {
        title: string;
        url: string;
    }[];
    addText?: string;
    addUrl?: string;
}

export default function Breadcrumb({ links, addText, addUrl }: Props) {

    const router = useRouter();

    return (
        <div role="presentation" className='bg-secondary p-5 rounded-md flex items-center justify-between'>
            <Breadcrumbs aria-label="breadcrumb">

                <Link className={cx(
                    router.route === dashboardLink ? 'text-purple-700 font-medium' : 'text-smartian'
                )} href={dashboardLink}>
                    Dashboard
                </Link>

                {links?.length && links.map((item, index) => <Link key={`${index}links`} className={cx(
                    '',
                    router.route === item.url ? 'text-purple-700 font-medium' : 'text-smartian'
                )} href={item.url}>
                    {item.title}
                </Link>)}
            </Breadcrumbs>

            {addText ? <Link
                href={addUrl ? addUrl : '#'}
                className={cx(
                    'text-white p-2.5 font-medium bg-purple-600 hover:bg-purple disabled:bg-primary-300 disabled:text-gray-300 rounded-lg trans'
                )}
            >
                {addText}
            </Link> : null}

        </div>
    );
}
