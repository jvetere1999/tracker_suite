import React from 'react';

const ChartsHeader = ({ category, title }) => (
  <div className=" mb-10">
    <p className="text-lg  dark:text-gray-200 dark:bg-secondary-dark-bg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold   dark:text-gray-200 dark:bg-main-dark-bgtracking-tight text-slate-900">{title}</p>
  </div>
);

export default ChartsHeader;
