import { cx } from '@/hooks/helpers';
import React from 'react'

type Props = {
    item: {
        icon: React.ReactNode,
        title: string;
        desc: string;
    }
}

const ASCard = ({ item }: Props) => {
    return (
        <div className={cx(
            'border-primary border p-5 rounded f-center flex-col gap-y-4 md:min-h-[220px] hover:bg-lightDark trans'
        )}>
            <div className={cx(
                'text-[32px]'
            )}>
                {item.icon}
            </div>

            <h4 className='text-base md:text-[20px] font-medium text-primary cursor-default'>
                {item.title}
            </h4>

            <p className='text-sm lg:text-base text-center cursor-default'>
                {item.desc}
            </p>

        </div>
    )
}

export default ASCard