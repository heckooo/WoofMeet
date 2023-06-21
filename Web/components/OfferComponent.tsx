"use client"
import React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VillaIcon from '@mui/icons-material/Villa';
import StraightenIcon from '@mui/icons-material/Straighten';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useLikeMutation, useLikesQuery, useMeQuery, MeQueryVariables } from '../app/generated/graphql';

interface OfferComponentProps {
  _id: number;
  pet: string;
  accomodation: string;
  address: string;
  dropOff: string;
  pickUp: string;
  _size: string;
  points: number;
}

const OfferComponent: React.FC<OfferComponentProps> = ({ _id, pet, accomodation, address, dropOff, pickUp, _size, points }) => {
  const [, like] = useLikeMutation();
  const [{ data }] = useLikesQuery();
  const [variables] = useMeQuery();

  let likeStatus: boolean = false;

    if (variables.data) {
      data?.likes.map((like) => 
        _id === like.postId &&  variables.data!.me?.id === like.userId 
        ? likeStatus = true : likeStatus = false);
    }
    
  return (
    <div className="flex justify-between bg-[#FFB800]/75 rounded-lg px-4 py-2 text-2xl m-4 w-[480px] shadow-2xl">
      <div>
        <p className="text-lg">Need care for</p>
        <p><StraightenIcon /> {_size} {pet}</p>
        <p> <VillaIcon /> {accomodation}</p>
        <div className="flex flex-row items-center">
          <IconButton 
            onClick={async () => {
              await like({ postId: _id });
            }}
          >
            {likeStatus ? <FavoriteIcon className="text-white" /> 
            : <FavoriteBorderIcon className="text-white" />}
          </IconButton> 
          <p className="ml-2">{points}</p>
        </div>
      </div>
      <div className="ml-12">
        <p>From: {dropOff}</p>
        <p>Until: {pickUp}</p>
        <p><LocationOnIcon /> {address}</p>
      </div>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(OfferComponent);