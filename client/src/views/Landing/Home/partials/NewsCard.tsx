/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'

type Props = {
    item: any;
}

const NewsCard = ({ item }: Props) => {
    return (
        <div className="bg-lightDark overflow-hidden border-b-4 border-primary cursor-default">
            <img src={item.image} alt={item.title} className="w-full object-cover h-32 sm:h-48 md:h-64" />
            <div className="p-4 md:p-6">
                <p className="text-secondaryfont-semibold text-xs mb-1 leading-none">News</p>
                <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal text-primary">{item.title.slice(0, 28)}...</h3>
                <div className="text-sm flex items-center">
                    <AiOutlineClockCircle />
                    <p className="leading-none ml-2">{item.createdAt}</p>
                </div>
            </div>
        </div>
    )
}

export default NewsCard