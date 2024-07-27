import { Checkbox } from "@headlessui/react";
import classNames from "classnames";
import { Control, Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import TooltipLabel from "./tooltip-label";
import ValidationError from "./form-validation-error";

interface Props {
    control: Control<any>;
    error?: string;
    name: string;
    [key: string]: unknown;
    required?: boolean;
    label?: string;
    toolTipText?: string;
    className?: string;
}

const CheckboxInput = ({
    control,
    label,
    name,
    error,
    required,
    toolTipText,
    className,
    ...rest
}: Props) => {
    return (
        <>
            <div className={twMerge(classNames('flex items-center cursor-pointer', className))}>
                <Controller
                    name={name}
                    control={control}
                    {...rest}
                    render={({ field: { onChange, value } }) => (
                        // <Checkbox
                        //     checked={value}
                        //     onChange={onChange}
                        //     disabled={disabled}
                        //     className={`${
                        //         value ? 'bg-accent' : 'bg-gray-300'
                        //     } relative inline-flex items-center rounded-md focus:outline-none ${
                        //         disabled ? 'cursor-not-allowed bg-[#EEF1F4]' : ''
                        //     }`}
                        //     id={name}
                        // >
                        //     <input
                        //         type="checkbox"
                        //         className="sr-only"
                        //         checked={value}
                        //         onChange={onChange}
                        //         disabled={disabled}
                        //     />
                        //     <div
                        //         className={`${
                        //             value ? 'bg-accent' : 'bg-white'
                        //         } h-4 w-4 rounded-md border-2 border-gray-300 transition-colors`}
                        //     />
                        // </Checkbox>
                        <Checkbox
                        defaultChecked={true}
                        name="terms-of-service"
                        className="group block size-5 rounded border border-base-dark bg-white data-[checked]:bg-accent"
                      >
                        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Checkbox>
                    )}
                />
                {label ? (
                    <TooltipLabel
                        htmlFor={name}
                        className="mb-0"
                        toolTipText={toolTipText}
                        label={label}
                        required={required}
                    />
                ) : null}
            </div>
            {error ? <ValidationError message={error} /> : ''}
        </>
    );
};

export default CheckboxInput;