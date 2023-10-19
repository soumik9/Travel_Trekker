import Link from 'next/link'
import React from 'react'
import { cx } from '@/hooks/helpers';

type Props = {
    row: any;
}

const actionBtnClass = ' p-1.5 rounded-lg text-white cursor-pointer trans'

const OHActionBtn = ({ row }: Props) => {

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