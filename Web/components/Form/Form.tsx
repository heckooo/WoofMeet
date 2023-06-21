"use client"
import React, { useState } from 'react'
import { PetRadio } from './PetRadio';
import { Accomodation } from './Accomodation';
import { SizeInput } from './SizeInput';
import { SearchButton } from './SearchButton';
import { FormInputs } from './FormInputs';
import { Formik, Form } from 'formik';
import { useCreatePostMutation, useMeQuery } from '../../app/generated/graphql';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

import "./styles.scss";

const orange: string = '#FFB800';

const Post_Form: React.FC<{}> = ({ }) => {
  const [choosePet, setChoosePet] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const [, createPost] = useCreatePostMutation();
  const [{ data }] = useMeQuery();

  return (
    <div className="flex justify-center items-center flex-col rounded-2xl container w-4/5 xl:w-3/5 xl:py-12 mx-auto mt-16 p-8 mb-12">
    <Formik
      initialValues={{ pet: "Dog", accomodation: "House Sitting", address: "", dropOff: "", pickUp: "", size: "" }}
      onSubmit={async (values, actions) => {
        const response = await createPost({options: values});
        console.log(response, data?.me);
        if (!data?.me) {
          setIsLogged(false);
        } else {
          //Everything worked correctly and user is logged in
          setIsLogged(true);
          actions.resetForm();
        }
      }}
    >
    {({ isSubmitting }) => (
    <Form>
      <div className="flex justify-center my-4">
        <div onClick={() => setChoosePet(false)}>
          <PetRadio pet="Dog" selected={true} bgColor={!choosePet ? orange : ''} />
        </div>
        <div onClick={() => setChoosePet(true)}>
          <PetRadio pet="Cat" bgColor={choosePet ? orange : ''} />
        </div>
      </div>
      <Accomodation />
      <FormInputs /> 
      <SizeInput />
      <SearchButton load={isSubmitting} />
      <h1 className="text-center text-[#a11] text-lg font-bold">{isLogged ? null : "You have to be logged in to create a post"}</h1>
    </Form>
    )}
    </Formik>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(Post_Form);