import React from 'react';

export const SearchButton: React.FC<{}> = ({ }) => {
  return (
    <div className="flex justify-center my-4">
      <button className="bg-[#FFB800] rounded-lg text-3xl text-800 px-14 py-2" type="submit">Search</button>
    </div>
  );
}