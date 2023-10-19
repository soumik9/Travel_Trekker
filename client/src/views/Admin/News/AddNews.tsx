import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import CardLayout from '@/components/ViewLayout/admin/CardLayout'
import { addNewsLink, newsLink } from '@/configs/constants'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@/components/Button/Button'
import { useCreateNewsMutation } from '@/redux-rtk/features/news/newsApi'
import * as Yup from "yup";
import Input from '@/components/Forms/Input';
import toast from 'react-hot-toast';
import ImageBox from '@/components/Forms/ImageBox';
import axios from 'axios';

export const newsSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    desc: Yup.string().required("Title is required"),
});

const AddNews = () => {

    // globals
    const [createNews, { isLoading, isSuccess }] = useCreateNewsMutation();

    // hooks
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(newsSchema),
        defaultValues: {
            title: '',
            desc: '',
        },
    });

    const [imgSrc, setImgSrc] = useState<string>('');
    const [image, setImage] = useState<File | string>('');
    const [error, setError] = useState({ image: false });

    // after succes of api fetch set input initial
    useEffect(() => {
        if (isSuccess) {
            reset();
            setImgSrc('');
            setImage('');
            setError({ image: false });
        }
    }, [isSuccess, reset])

    // image validation
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;

        if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|PNG|webp)$/)) {
            setImgSrc('');
            setImage('')
            setError({ ...error, image: true });
            toast.error('');
        } else {
            setError({ ...error, image: false });
            setImgSrc(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0])
        }
    }

    // add new user funtion
    const handleAddNews = async (fData: any) => {

        if (!image) {
            toast.error('Image is require');
            return;
        }

        // creating form data
        var formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_MAIN_UPLOAD_PRESET as string);

        let simage = '';

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_MAIN_CLOUD_NAME}/image/upload`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            // post data to server
            simage = response.data.secure_url;
            createNews({ ...fData, image: simage });
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    }

    return (
        <>

            <Breadcrumb
                links={[
                    {
                        title: 'News',
                        url: newsLink,
                    },
                    {
                        title: 'Add News',
                        url: addNewsLink,
                    },
                ]}
            />

            <CardLayout title='Add News' isNotInitalized>
                <form onSubmit={handleSubmit(handleAddNews)}>

                    <div className='mb-5'>
                        <ImageBox
                            width={320}
                            height={100}
                            demoImgSrc={imgSrc ? imgSrc : '/globals/demo-user.png'}
                            name='websiteLogoLight'
                            imgCss=' h-[130px] w-[200px]'
                            label={`Choose a picture`}
                            onChange={handleImageChange}
                            alt='user photo'
                        />
                    </div>



                    <div className='grid md:grid-cols-2 gap-x-5 gap-y-7'>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Title"
                                    id="title"
                                    placeholder="ex: title here"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.title?.message}
                                    labelRequired
                                />
                            )}
                        />
                        <Controller
                            name="desc"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label="Description"
                                    id="desc"
                                    placeholder="description here"
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.desc?.message}
                                    labelRequired
                                />
                            )}
                        />
                    </div>

                    <div className='mt-8 flex justify-end'>
                        <CustomButton
                            text='Add News'
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

export default AddNews