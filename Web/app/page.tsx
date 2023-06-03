import React from 'react'
import Navbar from '@/components/Navbar/Navbar';
import Content from '@/components/Content/Content';
import Form from '@/components/Form/Form';

const Home: React.FC<{}> = ({}) => {
  return (
    <>
      <Navbar />
      <Content />
      <Form />   
    </>
  );
}

export default Home;