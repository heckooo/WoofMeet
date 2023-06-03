import Navbar from '@/components/Navbar/Navbar';
import React from 'react'

interface pageProps {

}

const Offers: React.FC<pageProps> = ({ }) => {
  return (
    <div className="h-[100vh]">
      <Navbar />
    </div>
  );
}

export default Offers;