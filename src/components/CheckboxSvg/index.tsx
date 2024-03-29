import React from 'react';

export const checkboxSvgDataTestIds = {
  base: 'checkbox-svg__base',
};

interface CheckboxSvgProps {
  className?: string;
}

const DEFAULT_CLASSNAMES = 'absolute pointer-events-none hidden peer-checked:block mt-1 outline-none';

const CheckboxSvg = ({ className = DEFAULT_CLASSNAMES }: CheckboxSvgProps): JSX.Element => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="30"
      viewBox="0 0 28 30"
      fill="none"
      data-test-id={checkboxSvgDataTestIds.base}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 15C2 8.37258 7.37258 3 14 3C20.6274 3 26 8.37258 26 15C26 21.6274 20.6274 27 14 27C7.37258 27 2 21.6274 2 15Z"
        fill="currentColor"
      />
      <path
        d="M12.5537 17.2422L19.005 10.7908C19.3928 10.4031 20.0216 10.4031 20.4094 10.7908C20.7971 11.1786 20.7971 11.8074 20.4094 12.1952L12.5537 20.0508L7.99104 15.4881C7.60325 15.1004 7.60325 14.4716 7.99104 14.0838C8.37883 13.696 9.00756 13.696 9.39535 14.0838L12.5537 17.2422Z"
        fill="#15151A"
      />
    </svg>
  );
};

export default CheckboxSvg;
