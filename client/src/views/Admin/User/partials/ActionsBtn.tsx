import Link from 'next/link'
import React from 'react'
import { IoCogOutline, IoTrash } from 'react-icons/io5';
import { IUser } from '@/configs/types';
import { cx } from '@/hooks/helpers';

type Props = {
    row: IUser;
}

const actionBtnClass = 'text-[22px] p-1.5 rounded-lg text-white cursor-pointer trans'
const actionBtnIconClass = 'cursor-pointer'

const ActionsBtn = ({ row }: Props) => {
    return (
        <div className='flex gap-[7px]'>
            <Link
                href={`/admin/user/${row._id}`}
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
                    'bg-error hover:bg-error-hover'
                )}
                disabled={row.email === 'admin@gmail.com'}
            // onClick={() => handleDeleteUser(row._id)}
            >
                <IoTrash
                    className={cx(actionBtnIconClass)}
                />
            </button>
        </div>
    )
}

export default ActionsBtn