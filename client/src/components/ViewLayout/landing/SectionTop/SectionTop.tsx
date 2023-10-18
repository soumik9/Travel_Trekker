import { cx } from '@/hooks/helpers';
import React from 'react'

type Props = {
    titleSpan?: string;
    title?: string;
    subTitle: string;
    css?: string;
}

const SectionTop = ({ titleSpan, title, subTitle, css }: Props) => {
    return (
        <center className={cx(
            css,
            'mb-[15px] md:mb-[25px] lg:mb-[60px]'
        )}>
            <h5 className='text-[32px] md:text-[40px] text-secondary uppercase tracking-wider'>{subTitle}</h5>
            <h1 className='mt-[12px] heading-h1 text-secondary font-secondary capitalize'>
                {title} <span className='text-primary'>{titleSpan}</span>
            </h1>
        </center>
    )
}

export default SectionTop