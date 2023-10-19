import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'

type Props = {}

const NewsCard = (props: Props) => {
    return (
        <div className="bg-lightDark overflow-hidden border-b-4 border-primary">
            <img src="https://images.unsplash.com/photo-1573748240263-a4e9c57a7fcd" alt="People" className="w-full object-cover h-32 sm:h-48 md:h-64" />
            <div className="p-4 md:p-6">
                <p className="text-secondaryfont-semibold text-xs mb-1 leading-none">News</p>
                <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">The Coldest Sunset</h3>
                <div className="text-sm flex items-center">
                    <AiOutlineClockCircle />
                    <p className="leading-none">21 Oct 2019</p>
                </div>
            </div>
        </div>
    )
}

export default NewsCard