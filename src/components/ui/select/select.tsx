import React from 'react';
import ReactSelect, { Props } from 'react-select';
import { selectStyles } from './select.style';

export type Ref = any;

export const Select = React.forwardRef<Ref, Props>((props, ref) => {

  const id = props.id;

  return (
    <ReactSelect
      id={id}
      ref={ref}
      styles={selectStyles}
      {...props}
    />
  );
});

Select.displayName = 'Select';

export default Select;
