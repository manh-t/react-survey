import React from 'react';

import { ReactComponent as AlertIcon } from 'assets/images/icons/alert.svg';

interface AlertProps {
  errors: string[];
  'data-test-id'?: string;
}
const Alert = ({ errors, ...rest }: AlertProps): JSX.Element => (
  <div role="alert" {...rest}>
    <div className="bg-black-raisin bg-opacity-60 rounded-xl px-4 py-4 flex flex-row">
      <AlertIcon className="mr-[19px] text-white" />
      <div>
        <p className="text-small text-white font-extrabold mb-2">Error</p>
        <ul className="list-disc list-inside text-white opacity-60 text-x-small">
          {errors.map((error, index) => (
            <li key={`${index}${error}`}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Alert;
