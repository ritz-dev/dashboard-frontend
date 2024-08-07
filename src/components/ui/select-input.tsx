import TooltipLabel from '@/components/ui/tooltip-label';
import dynamic from 'next/dynamic';
import { Controller } from 'react-hook-form';
import { GetOptionLabel } from 'react-select';

interface SelectInputProps {
  control: any;
  rules?: any;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  getOptionLabel?: GetOptionLabel<unknown>;
  getOptionValue?: GetOptionLabel<unknown>;
  isMulti?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  [key: string]: unknown;
  placeholder?: string;
  required?: boolean;
  label?: string;
  toolTipText?: string;
}

const SelectInput = ({
  control,
  options,
  name,
  rules,
  getOptionLabel,
  getOptionValue,
  disabled,
  isMulti,
  isClearable,
  isLoading,
  placeholder,
  label,
  required,
  toolTipText,
  ...rest
}: SelectInputProps) => {

  const labelClasses = 'text-lg';

  const Select = dynamic(() => import('@/components/ui/select/select'), { ssr: false });

  return (
    <>
      {label ? (
        <TooltipLabel
          htmlFor={name}
          toolTipText={toolTipText}
          label={label}
          required={required}
          className={labelClasses}
        />
      ) : (
        ''
      )}
      <Controller
        control={control}
        name={name}
        rules={rules}
        {...rest}
        render={({ field }) => (
          <Select
            {...field}
            value={options.find(option => option.value === field.value) || null}
            onChange={(selectedOption) => field.onChange((selectedOption as any)?.value || '')}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            placeholder={placeholder}
            isMulti={isMulti}
            isClearable={isClearable}
            isLoading={isLoading}
            options={options}
            isDisabled={disabled as boolean}
          />
        )}
      />
    </>
  );
};

export default SelectInput;
