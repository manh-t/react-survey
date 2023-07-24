import React from 'react';

import classNames from 'classnames';

interface ShimmerProps {
  classAttributes: string;
}

export const shimmerDataTestIds = {
  content: 'shimmer__content',
};

// Ref: https://delba.dev/blog/animated-loading-skeletons-with-tailwind
const Shimmer = ({ classAttributes }: ShimmerProps): JSX.Element => {
  const DEFAULT_CLASSNAME_ATTRIBUTES =
    'relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:from-30% before:via-white/50 before:to-transparent before:to-70% isolate overflow-hidden shadow-xl shadow-black/5';
  return (
    <div className={classNames(DEFAULT_CLASSNAME_ATTRIBUTES, classAttributes)} data-test-id={shimmerDataTestIds.content}>
      <div className={classNames('bg-white bg-opacity-[.12]', classAttributes)}></div>
    </div>
  );
};

export default Shimmer;
