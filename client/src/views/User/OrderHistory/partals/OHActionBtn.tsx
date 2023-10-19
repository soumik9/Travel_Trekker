import Link from 'next/link'
import React from 'react'
import { IoCogOutline, IoTrash } from 'react-icons/io5';
import { IHotel } from '@/configs/types';
import { cx } from '@/hooks/helpers';
import useDelete from '@/hooks/useDelete';
import CircleLoading from '@/components/Icons/CircleLoading/CircleLoading';
import { useDeleteHotelMutation } from '@/redux-rtk/features/hotel/hotelApi';

type Props = {
    row: any;
}

const actionBtnClass = ' p-1.5 rounded-lg text-white cursor-pointer trans'
const actionBtnIconClass = 'cursor-pointer'

const OHActionBtn = ({ row }: Props) => {

    // redux query
    // const [deleteHotel, { isLoading }] = useDeleteHotelMutation();

    // hooks
    // const { sendDeleteRequest } = useDelete();

    return (
        <div className='flex gap-[7px]'>
            <Link
                href={`/review/${row._id}`}
            >
                <button
                    className={cx(
                        actionBtnClass,
                        'bg-warning hover:bg-warning-hover disabled:bg-slate-200 disabled:cursor-not-allowed'
                    )}
                    disabled={row.status !== 'accept'}
                >
                    Review
                </button>
            </Link>

            <Link
                href={`/review/${row._id}`}
            >
                <button
                    className={cx(
                        actionBtnClass,
                        'bg-error hover:bg-error-hover disabled:bg-slate-200 disabled:cursor-not-allowed'
                    )}
                >
                    Cancel
                </button>
            </Link>
        </div>
    )
}

export default OHActionBtn