import { Field } from 'formik';
import React from 'react'

interface PetRadioProps {
  pet: string;
  bgColor?: string;
  selected?: boolean;
}

export const PetRadio: React.FC<PetRadioProps> = ({ pet, bgColor, selected }) => {
  return (
    <div>
      <label className="flex cursor-pointer box-border rounded-2xl border-solid border-2 w-[173px] h-[58px] items-center justify-center mx-2 text-600 text-[24px] leading-[30px]" style={{ backgroundColor: bgColor }} htmlFor={pet}>{pet}</label>
      <Field className="hidden" type="radio" name="pet" selected={selected} value={pet} id={pet} />
    </div>
  );
}