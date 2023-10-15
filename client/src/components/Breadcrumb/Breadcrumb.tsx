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
}

export default function Breadcrumb({ links }: Props) {

    const router = useRouter();

    return (
        <div role="presentation" className='bg-secondary p-5 rounded-md'>
            <Breadcrumbs aria-label="breadcrumb">

                <Link className={cx(
                    router.route === dashboardLink ? 'text-purple-700 font-medium' : 'text-smartian'
                )} href={dashboardLink}>
                    Dashboard
                </Link>

                {links?.length && links.map((item, index) => <Link key={`${index}links`} className={cx(
                    '',
                    router.route === item.url ? 'text-purple-700 font-medium' : 'text-smartian'
                )} href={dashboardLink}>
                    {item.title}
                </Link>)}
            </Breadcrumbs>
        </div>
    );
}
