import Input from '@/components/Forms/Input';
import TextArea from '@/components/Forms/TextArea';
import React from 'react'
import { Controller } from 'react-hook-form';

type Props = {
    control: any;
    errors: any;
}

const FAQForm = ({ control, errors }: Props) => {
    return (
        <div className='flex flex-col gap-4'>

            <Controller
                name="question"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Question"
                        id="question"
                        placeholder="ex: What is the benefit?"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.question?.message}
                        labelRequired
                    />
                )}
            />

            <Controller
                name="answer"
                control={control}
                render={({ field }) => (
                    <TextArea
                        label="Answer"
                        id="answer"
                        placeholder="ex: What is the benefit?"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.answer?.message}
                        required
                    />
                )}
            />
        </div>
    )
}

export default FAQForm