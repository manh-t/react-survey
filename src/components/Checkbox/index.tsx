import React from 'react';

import CheckboxSvg from 'components/CheckboxSvg';

export const checkboxDataTestIds = {
  base: 'checkbox__base',
};

interface CheckboxProps {
  isValueChecked: boolean;
}

const Checkbox = ({ isValueChecked }: CheckboxProps): JSX.Element => {
  return (
    <div className="flex text-white" data-test-id={checkboxDataTestIds.base}>
      <input
        type="checkbox"
        id="checkbox"
        checked={isValueChecked}
        onChange={() => {
          // Do nothing
        }}
        className="peer relative shrink-0 appearance-none w-[28px] h-[30px] border-[1px] border-white rounded-full mt-1 checked:bg-white"
      />

      <CheckboxSvg />
    </div>
  );
};

export default Checkbox;
