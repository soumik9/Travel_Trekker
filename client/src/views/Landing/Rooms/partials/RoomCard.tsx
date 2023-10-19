import CustomButton from '@/components/Button/Button';
import { bookNowUrl, loginUrl } from '@/configs/constants';
import { IRoom } from '@/configs/types'
import { cx, useAppSelector } from '@/hooks/helpers';
import Link from 'next/link';
import React from 'react'

type Props = {
    item: IRoom;
}

const RoomCard = ({ item }: Props) => {

    const auth = useAppSelector((state) => state.auth);

    return (
        <div className={cx(
            'border-primary border p-5 rounded f-center flex-col gap-y-4 md:min-h-[220px] hover:bg-lightDark trans'
        )}>
            <div className={cx(
                'text-[32px]'
            )}>
                {item.roomNumber}
            </div>

            <h4 className='text-base md:text-[20px] font-medium text-primary cursor-default'>
                {item.roomType}
            </h4>

            <p className='text-sm lg:text-base text-center cursor-default'>
                {item.hotel.name}
            </p>

            <p className='text-sm lg:text-base text-center text-primary-400 cursor-default capitalize'>
                {item.hotel.location}
            </p>

            <Link href={auth.isAuthenticated ? `/book-now/${item._id}` : loginUrl}>
                <CustomButton
                    text={auth.isAuthenticated ? 'Book Now' : 'Login'}
                    disabled={!auth.isAuthenticated}
                    css='w-[135px]'
                />
            </Link>

        </div>
    )
}

export default RoomCard