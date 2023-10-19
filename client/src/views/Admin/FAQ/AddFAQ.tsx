import { useCreateFaqMutation } from '@/redux-rtk/features/faq/faqApi';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { faqDefaultValues, faqSchema } from './utils/faqConstant';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import { addFAQLink, faqsLink } from '@/configs/constants';
import CardLayout from '@/components/ViewLayout/admin/CardLayout';
import CustomButton from '@/components/Button/Button';
import FAQForm from './partials/FAQForm';

const AddFAQ = () => {

    // globals
    const [createFaq, { isLoading, isSuccess }] = useCreateFaqMutation();

    // hooks
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(faqSchema),
        defaultValues: faqDefaultValues,
    });

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            reset();
        }
    }, [isSuccess, reset])

    // add new faq funtion
    const handleAddFaq = (fData: any) => {
        createFaq(fData)
    }

    return (
        <>

            <Breadcrumb
                links={[
                    {
                        title: 'Faqs',
                        url: faqsLink,
                    },
                    {
                        title: 'Add Faq',
                        url: addFAQLink,
                    },
                ]}
            />

            <CardLayout title='Add Faq' isNotInitalized>
                <form onSubmit={handleSubmit(handleAddFaq)}>

                    <FAQForm
                        control={control}
                        errors={errors}
                    />

                    <div className='mt-8 flex justify-end'>
                        <CustomButton
                            text='Add Faq'
                            css='w-[180px]'
                            loadingText='Adding'
                            isLoading={isLoading}
                        />
                    </div>

                </form>
            </CardLayout>
        </>
    )
}

export default AddFAQ