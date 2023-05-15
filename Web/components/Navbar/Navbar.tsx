"use client"
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Itext } from './Itext';
import "./styles.scss";
import Link from 'next/link';

const Navbar: React.FC<{}> = ({}) => {
  return (
    <div className="px-5 py-5 flex justify-between flex-row w-full">
      <div className="flex flex-row items-center woof">
        <h1 className="font-semibold text-[40px] leading-[50px] text-[#FFB800]">Woof Meets</h1>
        <Itext icon={<FavoriteIcon />} text={"Become Sitter"} />        
        <Itext icon={<SearchIcon />} text={"Search Sitter"} />
      </div>
      <div className="sign items-center flex flex-row cursor-pointer text-[#F5F5F5] mr-10">
        <Link href="/register">
          <p className="text-[24px] leading-[30px] mx-8">Sign Up</p>
        </Link>
        <Link href="/login">
          <p className="text-[24px] leading-[30px]">Sign In</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;