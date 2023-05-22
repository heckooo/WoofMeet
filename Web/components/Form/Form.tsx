"use client"
import React, { useState, useEffect } from 'react';
import { PetButton } from './PetButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HouseIcon from '@mui/icons-material/House';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './styles.scss';
import { ChoiceForm } from './ChoiceForm';
import { SearchButton } from './SearchButton';
import { HouseForm } from './HouseForm';

interface FormProps {
  
}

const orange: string = '#FFB800';

let house: React.JSX.Element = <HouseIcon className="h-[24px] w-[24px]" style={{ color: orange}} />
let arrow_down: React.JSX.Element = <KeyboardArrowDownIcon className="ml-2"/>

const Form: React.FC<FormProps> = ({}) => {
  //false -> dog | true -> cat
  const [choosePet, setChoosePet] = useState<boolean>(false);
  
  return (
    <div className="flex justify-center items-center flex-col rounded-2xl container w-4/5 xl:w-3/5 xl:py-12 mx-auto mt-16 p-8 mb-12">
      <div className="flex flex-row">
        <div onClick={() => setChoosePet(false)}>
          <PetButton bgColor={!choosePet ? orange : ''} pet={'Dog'} />
        </div>
        <div onClick={() => setChoosePet(true)}>
          <PetButton bgColor={choosePet ? orange : ''} pet={'Cat'} />
        </div>
      </div>
      <div className="text-[16px] leading-[20px] mt-8 flex flex-row align-center items-center justify-center">
        <ArrowBackIosIcon />
        <span className="flex items-center pr-1 m-0">For When You're away</span>
        <ArrowForwardIosIcon />
      </div>
      <div>
        <HouseForm icon1={house} text={'House Sitting'} icon2={arrow_down}/>
      </div>
      <div className="flex flex-col lg:flex-row items-center">
        <ChoiceForm placeholder='Zip Code or Address' />
        <ChoiceForm placeholder='Drop Off' date={'DD/MM/YYYY'} icon={arrow_down} />
        <ChoiceForm placeholder='Pick Up' date={'DD/MM/YYYY'} icon={arrow_down} />
      </div>
      <div className="flex justify-center">
        <ChoiceForm placeholder='Size' icon={arrow_down} style={{ flexDirection: 'row-reverse', justifyContent: 'center', width: '35%', paddingLeft: '0', paddingRight: '0.2rem'}} />
      </div>
      <div>
        <SearchButton text={'Search'} />
      </div>
      
    </div>
  );
}

export default Form;