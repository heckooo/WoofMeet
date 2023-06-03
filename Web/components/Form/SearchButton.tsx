import React from 'react';

type IProps = {
  load: boolean;
}

export const SearchButton: React.FC<IProps> = ({ load }) => {
  return (
    <div className="flex justify-center my-4">
      <button disabled={load} className="bg-[#FFB800] rounded-lg text-3xl text-[#fff] text-800 px-14 py-2" type="submit">Search</button>
    </div>
  );
}