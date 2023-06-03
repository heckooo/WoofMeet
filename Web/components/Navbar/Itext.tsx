import Link from 'next/link';
import React, { ReactNode } from 'react';

interface Itext {
  icon: ReactNode;
  text: string;
}

export const Itext: React.FC<Itext> = ({ icon, text }) => {
  return (
    <Link href="/offers" className="itext ml-10 text-[#F5F5F5] items-center flex flex-row cursor-pointer">
      <i>{icon}</i>
      <p className="text-[24px] leading-[30px] mx-1">{text}</p>
    </Link>
  );
}