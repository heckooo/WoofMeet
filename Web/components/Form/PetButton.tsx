import React from 'react';
import './styles.scss';

interface PetButtonProps {
  pet: string;
  bgColor?: string;
}

export const PetButton: React.FC<PetButtonProps> = ({ pet, bgColor }) => {
  return (
    <div className="pet_button flex cursor-pointer box-border border rounded-2xl border-solid border-2 w-[173px] h-[58px] items-center justify-center mx-2" style={{ backgroundColor: bgColor}} >
      <p className="text-600 text-white text-[24px] leading-[30px] hover:bg-">{pet}</p>
    </div>
  );
}