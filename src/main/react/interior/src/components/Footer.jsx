import React from 'react';

const Footer = ({ category}) => (
  <div className=" mb-10">
    <p className="text-lg  dark:text-gray-200 text-slate-900">{category}</p>
  </div>
);

export default Footer;
