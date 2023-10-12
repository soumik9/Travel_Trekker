import { cx } from '@/hooks/helpers';
import React from 'react'

type Props = {
    href?: string;
    text: string;
    mainCss?: string;
    target?: boolean;
    onClick?: any;
}

const FooterTouchItem = ({ href, text, mainCss, target, onClick }: Props) => {
    return (
        <li className={cx(mainCss)}>
            <a
                href={href}
                className='flex items-center gap-1 group cursor-pointer'
                target={target ? '_blank' : ''}
                rel='noreferrer'
                onClick={onClick}
                aria-label={text}
            >
                <p className='group-hover:text-primary trans relative top-[1px] text-secondary font-secondary font-semibold trans text-sm'>
                    {text}
                </p>
            </a>
        </li>
    )
}

export default FooterTouchItem