import React, { ButtonHTMLAttributes } from "react";
import CircleLoading from "../Icons/CircleLoading/CircleLoading";
import { cx } from "@/hooks/helpers";

type Props = {
  isLoading?: boolean;
  uppercase?: boolean;
  text: string;
  variant?: "contained" | "outlined";
  variantColor?: 'error' | 'warning';
  css?: string;
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({ type, loadingText, isLoading, text, variant, variantColor, uppercase, css, startIcon, endIcon, ...props }: Props) => {
  return (
    <button
      type="submit"
      className={cx(
        "!transition !ease-in-out !duration-500 text-white !py-2.5 !font-medium !bg-purple-600 hover:!bg-purple disabled:!bg-purple-300 disabled:!text-gray-300 rounded-lg",

        variant === "outlined" && "!bg-transparent hover:!bg-purple-600 hover:!text-white !border-primary hover:!border-primary-300 !text-primary",

        (variantColor === 'error' && !variant?.length) && 'hover:!bg-error !bg-error-hover',

        (variantColor === 'warning' && variant === "outlined") && 'hover:!bg-warning hover:!text-white !border-warning !text-warning !outline-none',

        uppercase ? '!uppercase' : '!capitalize',

        (isLoading || startIcon) && '!text-white flex items-center justify-center',

        (startIcon && !isLoading) && 'gap-1',

        css
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <CircleLoading />}
      {(startIcon && !isLoading) && startIcon}
      {(loadingText && isLoading) ? loadingText : text}
    </button>
  );
};

export default CustomButton;

