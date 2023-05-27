"use client"
import { InputField } from '@/components/InputField';
import { createUrqlClient } from '@/utils/createUrqlClient';
import { LoadingButton } from '@mui/lab';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../generated/graphql';

const ForgotPassword: React.FC<{}> = ({ }) => {
  const [complete, setComplete] = useState<boolean>(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <div className="flex items-center align-center justify-center h-[100vh]">
      <Formik
        initialValues={{ email: "", }}
        onSubmit={async (values) => {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
        {({ isSubmitting }) => complete ? <h1 className="text-4xl text-center">If account with that email exists, we sent you a verification link to change your password</h1> : (
          <Form className="flex flex-col">
            <InputField type="email" name="email" placeholder="Email" />
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              className="my-4 bg-[#FFB800] rounded-lg text-3xl text-800 px-14 py-2 text-white"
            >
              Send
            </LoadingButton>
            <Link href="/login">Back to sign in</Link>
            <Link href="/">Home</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);