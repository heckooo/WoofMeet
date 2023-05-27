"use client"
import React, { useState } from 'react'
import { PetRadio } from './PetRadio';
import { Accomodation } from './Accomodation';
import { SizeInput } from './SizeInput';
import { SearchButton } from './SearchButton';
import { FormInputs } from './FormInputs';

import "./styles.scss";

const orange: string = '#FFB800';

const Form: React.FC<{}> = ({ }) => {
  const [choosePet, setChoosePet] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center flex-col rounded-2xl container w-4/5 xl:w-3/5 xl:py-12 mx-auto mt-16 p-8 mb-12">
    <form>
      <div className="flex justify-center my-4">
        <div onClick={() => setChoosePet(false)}>
          <PetRadio pet="Dog" bgColor={!choosePet ? orange : ''} />
        </div>
        <div onClick={() => setChoosePet(true)}>
          <PetRadio pet="Cat" bgColor={choosePet ? orange : ''} />
        </div>
      </div>
      <Accomodation />
      <FormInputs /> 
      <SizeInput />
      <SearchButton />    
    </form>
    </div>
  );
}

export default Form;