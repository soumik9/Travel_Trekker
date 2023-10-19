import React from 'react'

type Props = {
    children: React.ReactNode;
}

const LightDarkCardLayout = ({ children }: Props) => {
    return (
        <div className="bg-lightDark md:p-[40px] p-[40px_15px] rounded-sm relative w-full">
            {children}
        </div>
    )
}

export default LightDarkCardLayout