import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { reviewSlidersData } from '@/configs/constants';
import parse from 'html-react-parser';
import { useGetReviewsQuery } from '@/redux-rtk/features/review/reviewApi';

const swiperOptions = {
    navigation: true,
    modules: [Autoplay, Navigation],
    spaceBetween: 40,
    grabCursor: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },
};

const HRSlider = () => {

    // get roles from redux api
    const { data: reviews, isLoading } = useGetReviewsQuery(undefined);

    return (
        <>
            {isLoading ? <>Loading...</> :
                <Swiper {...swiperOptions}>
                    {reviews?.data?.map((slideContent: any, index: number) => (<SwiperSlide key={slideContent._id} virtualIndex={index}>
                        <div className='bg-lightDark lg:p-[40px] p-[20px] rounded-md min-h-[300px]'>
                            <p className='leading-[160%] text-purple text-justify'>{slideContent.review.slice(0, 250)}...</p>

                            <div className='mt-8 flex items-center gap-8'>

                                <Image
                                    src={slideContent.user?.image}
                                    width={60}
                                    height={60}
                                    alt={slideContent.user?.name}
                                    className='rounded-full p-[1px] border border-primary object-cover'
                                />

                                <div>
                                    <h6 className='text-primary'>{slideContent.user?.name}</h6>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>}
        </>
    )
}

export default HRSlider