import React from 'react'

interface SearchButtonProps {
  text: string;
}

export const SearchButton: React.FC<SearchButtonProps> = ({text}) => {
  return (
    <div className="cursor-pointer bg-[#FFB800] rounded-lg text-[24px] leading-[30px] text-600 px-14 py-2">
      {text}
    </div>
  );
}