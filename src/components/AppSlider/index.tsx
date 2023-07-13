import React from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const appSliderDataTestIds = {
  base: 'app-slider__base',
};

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  onValueChanged: (position: number) => void;
}

const AppSlider = ({ min = 1, max = 100, step = 1, onValueChanged }: SliderProps): JSX.Element => {
  const handleOnChange = (value: number) => {
    onValueChanged(value);
  };

  return (
    <div className="flex w-full h-[56px] justify-center items-center" data-test-id={appSliderDataTestIds.base}>
      <Slider
        trackStyle={{
          background: 'rgba(255, 255, 255, 1)',
          height: '2px',
          borderRadius: '12px',
        }}
        railStyle={{
          height: '2px',
          background: 'rgba(255, 255, 255, 0.18)',
          borderRadius: '12px',
        }}
        handleStyle={{
          width: '28px',
          height: '28px',
          background: 'white',
          marginTop: '-12px',
          opacity: 1,
          borderRadius: '100px',
          border: '0.5px solid rgba(0, 0, 0, 0.04)',
          boxShadow:
            '0px 3px 1px 0px rgba(0, 0, 0, 0.10), 0px 1px 1px 0px rgba(0, 0, 0, 0.16), 0px 3px 8px 0px rgba(0, 0, 0, 0.15)',
        }}
        min={min}
        max={max}
        step={step}
        onChange={(value) => handleOnChange(value as number)}
      />
    </div>
  );
};

export default AppSlider;
