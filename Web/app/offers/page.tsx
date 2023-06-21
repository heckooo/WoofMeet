"use client"
import Navbar from '@/components/Navbar/Navbar';
import React from 'react'
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import OfferComponent from '../../components/OfferComponent';


const Offers: React.FC<{}> = ({ }) => {
  const [{ data }] = usePostsQuery();
  return (
    <div className="min-h-[95vh]">
      <Navbar />
      <div className="flex flex-wrap items-center align-center justify-center justify-center mt-8">
        {!data ? (
          <div>loading...</div>
        ) : (
          data.posts.map((p) => 
          <OfferComponent 
            key={p.id} _id={p.id} pet={p.pet} accomodation={p.accomodation} 
            address={p.address} dropOff={p.dropOff} 
            pickUp={p.pickUp} _size={p.size} 
            points={p.points} 
        />)
        )}
      </div>
    </div>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Offers);