import React, { useState } from 'react';

import { ReactComponent as ArrowDropdown } from 'assets/images/icons/arrow-dropdown.svg';
import { Answer } from 'types/answer';

export const dropdownDataTestIds = {
  base: 'dropdown__base',
};

interface DropdownProps {
  items: Answer[];
  onValueChanged: (value: Answer) => void;
}

const Dropdown = ({ items, onValueChanged }: DropdownProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(items[0].text);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOnSelectValue = (value: Answer) => {
    setSelectedValue(value.text);
    onValueChanged(value);
    toggleDropdown();
  };

  return (
    <div className="relative flex flex-col items-center w-full rounded-lg" data-test-id={dropdownDataTestIds.base}>
      <button
        onClick={toggleDropdown}
        className="w-full h-14 flex items-center justify-between appearance-none bg-white bg-opacity-[.18] rounded-[12px] hover:outline-none hover:ring-transparent px-3 text-white text-regular tracking-survey-tight hover:bg-opacity-30"
      >
        {selectedValue}
        <ArrowDropdown className={isOpen ? 'rotate-180' : ''} />
      </button>
      {isOpen && (
        <div className="bg-white bg-opacity-[.18] absolute top-20 flex flex-col items-start rounded-[12px] p-2 w-full overflow-y-auto max-h-[250px]">
          {items.map((item) => (
            <button
              className="flex w-full justify-between hover:bg-white hover:bg-opacity-30 cursor-pointer py-2 rounded-r-[12px] border-l-transparent hover:border-l-white border-l-4 text-white text-regular tracking-survey-tight"
              key={item.id}
              onClick={() => handleOnSelectValue(item)}
            >
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
