import React from 'react';
import "./styles.scss";

const Content: React.FC<{}> = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-20 text-700 text-center">
      <div className="text-[64px] leading-[80px] mb-4 content_l">
        <span className="text-white">Loving <a className="text-[#FFB800]">pet</a> care in your neighborhood<a className="text-[#FFB800]">&trade;</a></span>
      </div>
      <div>
        <span className="text-[#FFB800] text-[32px] leading-[40px] content_m">Book trusted sitters and dog walkers.</span>
      </div>
    </div>
  );
}

export default Content;