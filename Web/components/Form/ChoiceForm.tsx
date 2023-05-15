import React, { CSSProperties, ReactNode } from 'react';

import './styles.scss';

interface ChoiceFormProps {
  placeholder: string;
  date?: string;
  icon?: ReactNode;
  style?: CSSProperties;
}

export const ChoiceForm: React.FC<ChoiceFormProps> = (props) => {
    return (
      <div className="flex flex-row justify-between rounded-lg input_form p-3 my-4 cursor-pointer mx-2 w-3/4 items-center text-[14px] md:text-[16px] xl:text-[18px]" style={props.style}>
        <input className="bg-transparent no-underline border-0 text-opacity w-4/5" type="text" placeholder={props.placeholder} />
        <span className="text-[11px]">{props.date}</span>
        {props.icon}
      </div>
    );
  }