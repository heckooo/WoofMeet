"use client"
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Itext } from './Itext';
import "./styles.scss";
import Link from 'next/link';
import { useLogoutMutation, useMeQuery } from '@/app/generated/graphql';
import { LoadingButton } from '@mui/lab';
import { createUrqlClient } from '@/utils/createUrqlClient';
import { withUrqlClient } from "next-urql";

const Navbar: React.FC<{}> = ({ }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {

    //User not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Link href="/register" className="mr-4">Sign Up</Link>
        <Link href="/login">Sign In</Link>
      </>
    )
    //User logged in, display a user
  } else {
    body = (
      <>
        <p>{data.me.username}</p>
        <LoadingButton 
          loading={logoutFetching} 
          onClick={() => { logout() } } 
          className="bg-[#FFB800] text-white ml-4">
            Logout
          </LoadingButton>
      </>
    )
  }

  return (
    <div className="px-5 py-5 flex justify-between flex-row w-full">
      <div className="flex flex-row items-center woof">
        <Link href="/" className="font-semibold text-[40px] leading-[50px] text-[#FFB800]">
          Woof Meets
        </Link>
        <Itext icon={<FavoriteIcon />} text={"Become Sitter"} />
        <Itext icon={<SearchIcon />} text={"Search Sitter"} />
      </div>
      <div className="sign items-center justify-center flex flex-row text-[#F5F5F5] mr-10 text-[24px] leading-[30px]">
        {body}
      </div>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(Navbar);