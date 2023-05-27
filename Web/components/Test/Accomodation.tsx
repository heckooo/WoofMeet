import React from 'react';
import HouseIcon from '@mui/icons-material/House';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Accomodation: React.FC<{}> = ({ }) => {
  return (
    <div className="flex justify-center my-4 text-2xl relative items-center w-[3/5]">
      <select name="sitting" className="bg-black rounded-lg p-4 px-8 my-4 cursor-pointer px-4 appearance-none w-full text-center outline-0">
        <option>House Sitting</option>
        <option>Pet Hotel</option>
      </select>
      <HouseIcon className="text-4xl text-[#FFB800] absolute left-4" />
      <KeyboardArrowDownIcon className="text-4xl absolute right-4" />
    </div>
  );
}