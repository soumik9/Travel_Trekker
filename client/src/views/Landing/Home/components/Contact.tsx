import React, { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast'
import SectionTop from '@/components/ViewLayout/landing/SectionTop/SectionTop'
import SectionLayout from '@/components/ViewLayout/landing/SectionLayout/SectionLayout'
import CustomButton from '@/components/Button/Button'
import LightDarkCardLayout from '@/components/ViewLayout/landing/LightDarkCardLayout/LightDarkCardLayout'
import { cx } from '@/hooks/helpers'
import { inputCmnClass } from '@/components/Forms/Input'

const Contact: React.FC = () => {

    // refs
    const form = useRef<HTMLFormElement | null>();

    // send emain function
    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.current) {
            emailjs.sendForm('service_y63cj9p', 'template_q86c1pa', form.current, 'yr4eaL11Ynd0jaIXy')
                .then((result) => {
                    toast.success(`Your email has been sent`);
                    form?.current?.reset();
                }, (error) => {
                    toast.error('Something wrong! Please try again.');
                });;
        } else {
            toast.error('Something wrong!');
        }
    };

    return (
        <SectionLayout css='lg:pt-[40px]' id='contactMe'>

            <SectionTop
                subTitle='Contact Us'
            />

            <LightDarkCardLayout>
                <form className='flex flex-col justify-center gap-[1.2rem]' ref={form as React.RefObject<HTMLFormElement>} onSubmit={sendEmail}>
                    <input type="text" name='name' placeholder='Your Full Name' className={cx(
                        inputCmnClass
                    )} required />
                    <input type="text" name='subject' placeholder='Subject' className={cx(
                        inputCmnClass
                    )} required />
                    <input type="email" name='email' placeholder='Your Email Address' className={cx(
                        inputCmnClass
                    )} required />
                    <textarea name="message" rows={7} placeholder='Your Message' className={cx(
                        inputCmnClass
                    )} required></textarea>

                    <div className='flex justify-end'>
                        <CustomButton
                            text='Send Message'
                            type='submit'
                            css='w-[130px]'
                        />
                    </div>
                </form>
            </LightDarkCardLayout>


        </SectionLayout>

    )
}

export default Contact