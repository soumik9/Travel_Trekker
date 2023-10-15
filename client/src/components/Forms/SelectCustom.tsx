import React from 'react'
import Select, { StylesConfig } from 'react-select';

export type selectItemType = {
    _id: string;
    label: string;
    value: string;
};

type Props = {
    id?: string;
    value?: selectItemType;
    options?: selectItemType[];
    defaultValue?: selectItemType;
    label?: string;
    placeHolder?: string;
    isSearchable?: boolean;
    onChange: any;
    required?: boolean;
    isLoading?: boolean;
    error?: boolean;
}

const SelectCustom = ({ label, options, defaultValue, onChange, value, id, placeHolder, isSearchable, required, isLoading, error }: Props) => {

    const customStyle: StylesConfig<selectItemType, false> = {
        control: (provided, state) => ({
            ...provided,
            minHeight: '44px',
            border: state.menuIsOpen || state.isFocused ? error ? "2px solid #F04438" : "2px solid #575fcf" : error ? "2px solid #F04438" : "2px solid #E5E7EB",
            borderRadius: '8px',
            cursor: 'pointer',
            outline: 'none',
            '&:focus': {
                borderColor: error ? "#F04438" : '#575fcf',
            },
            '&:hover': {
                borderColor: error ? "#F04438" : '#d7d9f3',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#3e4393' : 'transparent',
            color: state.isSelected ? 'white' : '#6B7280',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: state.isSelected ? '#575fcf' : '#e5e7eb',
                color: state.isSelected ? 'white' : '#4B5563'
            }
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#6B7280",
        }),
        dropdownIndicator: base => ({
            ...base,
            '&:hover': {
                color: "#d7d9f3",
            }
        }),
    };

    return (
        <div className="mt-0.5 scrollbar">

            {label ? <label
                htmlFor={id}
                className="text-sm font-semibold px-1 text-gray-600"
            >
                {label} {required ? <span className="text-error">*</span> : null}
            </label> : null}

            <div className="mt-1">
                <Select
                    options={options}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                    styles={customStyle}
                    isSearchable={isSearchable ? isSearchable : false}
                    placeholder={placeHolder}
                    className='w-full capitalize'
                    required={required}
                    isLoading={isLoading}
                />
            </div>

            {error && (
                <span className="text-xs ml-1 text-error-hover absolute -bottom-5 left-0">
                    {error}
                </span>
            )}

        </div>
    )
}

export default SelectCustom

