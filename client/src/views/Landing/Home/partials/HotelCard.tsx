import { IHotel } from '@/configs/types';
import { cx } from '@/hooks/helpers';
import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    item: IHotel;
};

const HotelCard = ({ item }: Props) => {

    const backgroundImageStyle = {
        backgroundImage: `url(${item.image})`,
    };

    const overlayStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    };

    return (
        <Link href={`rooms-by-hotel/${item._id}`}>
            <div
                className="relative overflow-hidden bg-cover bg-no-repeat min-h-[220px] border-primary border p-5 rounded"
                style={backgroundImageStyle}>
                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed f-center flex-col gap-y-4"
                    style={overlayStyle}>
                    <div className={cx(
                        'text-[32px] text-white'
                    )}>
                        {item.name}
                    </div>

                    <h4 className='text-base md:text-[20px] font-medium text-primary capitalize'>
                        {item.location}
                    </h4>

                    <Rating
                        name="half-rating-read"
                        defaultValue={item.rating}
                        precision={0.5}
                        readOnly
                        sx={{
                            "& .MuiRating-iconEmpty": {
                                color: '#D5D2E4',
                                opacity: 0.55
                            }
                        }}
                    />
                </div>
            </div>
        </Link>
    );
};

export default HotelCard;
