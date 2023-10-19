import Link from 'next/link'
import React from 'react'
import { cx } from '@/hooks/helpers';
import { useUpdateBookingStatusCancelUserMutation } from '@/redux-rtk/features/booking/bookingApi';

type Props = {
    row: any;
}

const actionBtnClass = ' p-1.5 rounded-lg text-white cursor-pointer trans'

const OHActionBtn = ({ row }: Props) => {

    // rtk
    const [updateBookingStatusCancelUser, { isLoading: updateLoading, isSuccess }] = useUpdateBookingStatusCancelUserMutation();


    const handleUpdateStatusCancel = () => {

        // final data to send server
        const updatedData = {}
        const bookingId = row._id;

        updateBookingStatusCancelUser({
            bookingId, updatedData, headers: {
                'Content-Type': 'application/json',
            }
        })
    }

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
                    disabled={row.status !== 'accept' || row.isReviewed}
                >
                    Review
                </button>
            </Link>


            <button
                className={cx(
                    actionBtnClass,
                    'bg-error hover:bg-error-hover disabled:bg-slate-200 disabled:cursor-not-allowed'
                )}
                onClick={handleUpdateStatusCancel}
                disabled={row.status === 'cancel' || row.status === 'accept'}
            >
                Cancel
            </button>

        </div>
    )
}

export default OHActionBtn