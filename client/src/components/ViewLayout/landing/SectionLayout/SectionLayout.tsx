import { cx } from '@/hooks/helpers';
import React from 'react'

type Props = {
    children: React.ReactNode;
    css?: string;
    id?: string;
}

const SectionLayout = ({ children, css, id }: Props) => {
    return (
        <section id={id} className={cx(
            css,
            'lg:py-[80px] md:py-[60px] py-[40px]'
        )}>
            <div className="container">
                {children}
            </div>
        </section>
    )
}

export default SectionLayout