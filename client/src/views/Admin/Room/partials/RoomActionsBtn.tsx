import Link from 'next/link'
import React from 'react'
import { IoCogOutline, IoTrash } from 'react-icons/io5';
import { IRoom } from '@/configs/types';
import { cx } from '@/hooks/helpers';
import useDelete from '@/hooks/useDelete';
import CircleLoading from '@/components/Icons/CircleLoading/CircleLoading';
import { useDeleteRoomMutation } from '@/redux-rtk/features/room/roomApi';

type Props = {
    row: IRoom;
}

const actionBtnClass = 'text-[22px] p-1.5 rounded-lg text-white cursor-pointer trans'
const actionBtnIconClass = 'cursor-pointer'

const RoomActionBtn = ({ row }: Props) => {

    // redux query
    const [deleteRoom, { isLoading }] = useDeleteRoomMutation();

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
                onClick={() => sendDeleteRequest(row._id, deleteRoom)}
            >
                {isLoading ? <CircleLoading /> : <IoTrash
                    className={cx(actionBtnIconClass)}
                />}

            </button>
        </div>
    )
}

export default RoomActionBtn