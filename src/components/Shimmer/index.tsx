import React from 'react';

import { dashboardScreenTestIds } from 'screens/Dashboard';

interface ShimmerProps {
  classAttributes: string;
}

// Ref: https://delba.dev/blog/animated-loading-skeletons-with-tailwind
const Shimmer = ({ classAttributes }: ShimmerProps): JSX.Element => {
  return (
    <div
      className={`relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:from-30% before:via-white/50 before:to-transparent before:to-70% isolate overflow-hidden shadow-xl shadow-black/5 ${classAttributes}`}
      data-test-id={dashboardScreenTestIds.shimmer}
    >
      <div className={`bg-white bg-opacity-[.12] ${classAttributes}`}></div>
    </div>
  );
};

export default Shimmer;
