import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import { IFaq } from '@/configs/types';
import { useGetFaqsQuery } from '@/redux-rtk/features/faq/faqApi';
import React from 'react'

const FAQ = () => {

    // get roles from redux api
    const { data: faqs, isLoading } = useGetFaqsQuery(undefined);

    return (
        <SectionLayout>

            <SectionTop
                subTitle='Hotel FAQ'
            />

            {isLoading ? <>Loading...</> : <div className="flex flex-col gap-y-5 md:grid md:grid-cols-2 xl:grid-cols-3 md:items-center md:gap-x-4 lg:gap-[30px]">
                {faqs?.data.slice(0, 6).map((item: IFaq) =>
                    <div className="w-full" key={item._id}>
                        <div className="bg-lightDark p-5 rounded-md hover:bg-bgDark trans border border-primary">
                            <p className="mb-4 font-bold">Anim pariatur cliche reprehenderit?</p>
                            <p className="text-secondary text-justify">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                                autem numquam dolore molestias aperiam culpa alias veritatis
                                architecto eos, molestiae vitae ex eligendi libero eveniet
                                dolorem, doloremque rem aliquid perferendis.
                            </p>
                        </div>
                    </div>)}
            </div>}

        </SectionLayout>
    )
}

export default FAQ