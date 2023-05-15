import React, { ReactNode } from 'react'

interface HouseFormProps {
  icon1: ReactNode;
  icon2: ReactNode;
  text: string;
}

export const HouseForm: React.FC<HouseFormProps> = ({icon1, icon2, text}) => {
  return (
    <div className="flex flex-row justify-between bg-black rounded-lg input_form p-4 my-4 cursor-pointer">
      <div className="pr-16 flex items-center">
        {icon1}
        <span className="text-[18px] leading-[24px] ml-2">{text}</span>
      </div>
      <div className="flex text-4xl">
        {icon2}
      </div>
    </div>
  );
}