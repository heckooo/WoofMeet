import React from 'react'
import Navbar from '@/components/Navbar/Navbar';
import Content from '@/components/Content/Content';
import Form from '@/components/Test/Form';
import Footer from '@/components/Footer/Footer';

const Home: React.FC<{}> = ({}) => {
  return (
    <>
      <Navbar />
      <Content />
      <Form />
      <Footer />
    </>
  );
}

export default Home;