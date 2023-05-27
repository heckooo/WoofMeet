import React from 'react';

export const SizeInput: React.FC<{}> = ({ }) => {
  return (
    <div className="flex items-center my-4 justify-center">
      <select className="bg-black rounded-lg p-4 my-4 cursor-pointer outline-0 text-2xl mr-0 pr-0" required>
        <option value="" selected disabled hidden>Size</option>
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
      </select>
    </div>
  );
}