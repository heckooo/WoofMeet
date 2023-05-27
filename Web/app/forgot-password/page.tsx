"use client"
import { InputField } from '@/components/InputField';
import { createUrqlClient } from '@/utils/createUrqlClient';
import { LoadingButton } from '@mui/lab';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({}) =>{
  const [complete, setComplete] = useState<boolean>(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <div className="h-[100vh] flex items-center justify-center bg-white text-black">      <Formik
        initialValues={{ email: "",}}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) => complete ? <h1>We sent you a verification link to change your password</h1> : (
          <Form className="flex flex-col">
            <InputField type="email" name="email" placeholder="Email" />
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              className="mt-4"
            >
              Send
            </LoadingButton>
            <Link href="/">Home</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);