import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { reviewSlidersData } from '@/configs/constants';
import parse from 'html-react-parser';

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
    return (

        <Swiper {...swiperOptions}>
            {reviewSlidersData.map((slideContent, index) => (<SwiperSlide key={slideContent._id} virtualIndex={index}>
                <div className='bg-lightDark lg:p-[40px] p-[20px] rounded-md min-h-[420px]'>
                    <p className='leading-[160%] text-purple text-justify'>{slideContent.review}</p>

                    <div className='mt-8 flex items-center gap-8'>

                        <Image src={slideContent.img} width={60} height={60} alt={slideContent.name} className='rounded-full p-[1px] border border-primary object-cover' />

                        <div>
                            <h6 className='text-primary'>{slideContent.name}</h6>
                            <p className='text-secondary'>{parse(slideContent.position)}</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>

    )
}

export default HRSlider