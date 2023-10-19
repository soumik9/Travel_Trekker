import Link from 'next/link'
import React from 'react'
import { IoCogOutline, IoTrash } from 'react-icons/io5';
import { IFaq } from '@/configs/types';
import { cx } from '@/hooks/helpers';
import useDelete from '@/hooks/useDelete';
import CircleLoading from '@/components/Icons/CircleLoading/CircleLoading';
import { useDeleteFaqMutation } from '@/redux-rtk/features/faq/faqApi';

type Props = {
    row: IFaq;
}

const actionBtnClass = 'text-[22px] p-1.5 rounded-lg text-white cursor-pointer trans'
const actionBtnIconClass = 'cursor-pointer'

const FAQActionBtn = ({ row }: Props) => {

    // redux query
    const [deleteFaq, { isLoading }] = useDeleteFaqMutation();

    // hooks
    const { sendDeleteRequest } = useDelete();

    return (
        <div className='flex gap-[7px]'>
            <Link
                href={`/room/${row._id}`}
                className={cx(
                    actionBtnClass,
                    'bg-warning hover:bg-warning-hover'
                )}
            >
                <IoCogOutline
                    className={cx(actionBtnIconClass)}
                />
            </Link>
            <button
                className={cx(
                    actionBtnClass,
                    'bg-error hover:bg-error-hover disabled:bg-slate-300'
                )}
                onClick={() => sendDeleteRequest(row._id, deleteFaq)}
            >
                {isLoading ? <CircleLoading /> : <IoTrash
                    className={cx(actionBtnIconClass)}
                />}

            </button>
        </div>
    )
}

export default FAQActionBtn