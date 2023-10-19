import { cx } from "@/hooks/helpers";
import React from "react";

type Props = {
    label: string;
    id: string;
    placeholder: string;
    onChange?: any;
    required?: boolean;
    error?: boolean;
    inputCss?: string;
    divCss?: string;
    value?: any;
    disabled?: boolean;
};

const TextArea = ({ label, id, placeholder, onChange, required, error, inputCss, value, disabled, divCss }: Props) => {
    return (
        <div className={cx(
            divCss,
            "w-full relative"
        )}>
            <label htmlFor={id} className="text-sm font-semibold px-1 text-gray-600">
                {label} {required ? <span className="text-error">*</span> : null}
            </label>

            <textarea
                id={id}
                name={id}
                className={cx(
                    inputCss,
                    error ? 'border-error focus:!border-error' : 'border-gray-200 hover:border-primary-100',
                    "w-full px-3 py-2 rounded-lg border-2 outline-none focus:border-primary trans mt-1 text-gray-600 disabled:border-secondary-200 disabled:bg-secondary-100 disabled:text-secondary-700 resize-none"
                )}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                disabled={disabled}
                rows={5}
            />

            {error && (
                <span className="text-xs ml-1 text-error-hover absolute -bottom-5 left-0">
                    {error}
                </span>
            )}
        </div>
    );
};

export default TextArea;