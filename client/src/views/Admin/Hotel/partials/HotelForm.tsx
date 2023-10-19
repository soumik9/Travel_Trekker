import Input from '@/components/Forms/Input';
import SelectCustom, { selectItemType } from '@/components/Forms/SelectCustom';
import { districtOptions } from '@/configs/districtOptions';
import React from 'react'
import { Controller } from 'react-hook-form';

type Props = {
    control: any;
    errors: any;
    error: any;
    editPage?: boolean;
    selectedLocation: selectItemType | undefined;
    setSelectedLocation: (selectedLocation: selectItemType | undefined) => void;
}

const HotelForm = ({ control, errors, selectedLocation, setSelectedLocation, error, editPage }: Props) => {
    return (
        <div className='grid md:grid-cols-2 gap-x-5 gap-y-7'>
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Hotel Name"
                        id="name"
                        placeholder="ex: Hotel Mollika Inn"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.name?.message}
                        labelRequired
                    />
                )}
            />

            {/* Email */}
            <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                    <Input
                        label="Rating"
                        id="rating"
                        placeholder="4.5"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.rating?.message}
                        labelRequired
                    />
                )}
            />

            <SelectCustom
                value={selectedLocation}
                defaultValue={selectedLocation}
                onChange={(option: selectItemType) => setSelectedLocation(option)}
                options={districtOptions}
                label='Select Location'
                placeHolder='Select Location'
                required
                error={error.location}
                isSearchable
            />
        </div>
    )
}

export default HotelForm