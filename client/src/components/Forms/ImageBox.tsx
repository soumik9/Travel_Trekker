import { cx } from '@/hooks/helpers';
import Image from 'next/image';
import React from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

type Props = {
    demoImgSrc: string;
    width: number;
    height: number;
    name: string;
    imgCss?: string;
    labelCss?: string;
    label: string;
    onChange?: any;
    alt: string;
}

const ImageBox = ({ demoImgSrc, width, height, name, onChange, imgCss, labelCss, label, alt }: Props) => {
    return (
        <div className='flex flex-col items-center'>

            <Image
                width={width}
                height={height}
                src={demoImgSrc}
                alt={alt}
                className={cx(
                    ' p-1 border-primary border mb-2', imgCss
                )}
            />

            {/* <div className='w-full'> */}
            <div className=''>
                <input
                    type="file"
                    name={name}
                    id={name}
                    className="opacity-0 overflow-hidden w-[0.1px] h-[0.1px]" accept="image/png, image/jpeg, image/webp, image/jpg"
                    onChange={onChange}
                />
                <label htmlFor={name} className={cx(
                    'font-semibold text-ellipsis cursor-pointer inline-block overflow-hidden p-[0.625rem_1.25rem] whitespace-nowrap text-white bg-primary-700 hover:bg-primary trans focus:bg-primary-700 rounded-md text-center',
                    labelCss,
                )}>
                    <AiOutlineUpload className='text-[24px] inline-block relative top-[-2px] mr-1.5' />
                    <span>{label}</span>
                </label>
            </div>
        </div>
    )
}

export default ImageBox