import React from 'react'
import Navbar from '@/components/Navbar/Navbar';
import Content from '@/components/Content/Content';
import Form from '@/components/Form/Form';
import Footer from '@/components/Footer/Footer';

interface pageProps {

}

const Home: React.FC<pageProps> = ({}) => {
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