import Link from 'next/link'
import React from 'react'
import { IoCogOutline, IoTrash } from 'react-icons/io5';
import { IUser } from '@/configs/types';
import { cx } from '@/hooks/helpers';
import { useDeleteUserMutation } from '@/redux-rtk/features/user/userApi';
import useDelete from '@/hooks/useDelete';
import CircleLoading from '@/components/Icons/CircleLoading/CircleLoading';

type Props = {
    row: IUser;
}

const actionBtnClass = 'text-[22px] p-1.5 rounded-lg text-white cursor-pointer trans'
const actionBtnIconClass = 'cursor-pointer'

const ActionsBtn = ({ row }: Props) => {

    // redux query
    const [deleteUser, { isLoading }] = useDeleteUserMutation();

    // hooks
    const { sendDeleteRequest } = useDelete();

    return (
        <div className='flex gap-[7px]'>
            <Link
                href={`/user/${row._id}`}
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
                disabled={row.email === 'admin@gmail.com' || row.email === 'admin@example.com' || row.email === 'superadmin@gmail.com' || row.email === 'superadmin@example.com'}
                onClick={() => sendDeleteRequest(row._id, deleteUser)}
            >
                {isLoading ? <CircleLoading /> : <IoTrash
                    className={cx(actionBtnIconClass)}
                />}

            </button>
        </div>
    )
}

export default ActionsBtn