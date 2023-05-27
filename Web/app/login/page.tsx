"use client"
import { Form, Formik } from 'formik';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '@/utils/toErrorMap';
import { useRouter } from 'next/navigation';
import { InputField } from '../../components/InputField';
import Link from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '@/utils/createUrqlClient';

const Login: React.FC<{}> = ({ }) => {
  const router = useRouter();
  const [,login] = useLoginMutation()
  return (
    <div className="flex items-center align-center justify-center h-[100vh]">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "", }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          console.log(response);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            //Worked properly
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <InputField name="usernameOrEmail" placeholder="Username or Email" />
            <InputField  type="password" name="password" placeholder="Password"/>
            <LoadingButton 
              type="submit" 
              loading={isSubmitting}
              className="my-4 bg-[#FFB800] rounded-lg text-3xl text-800 px-14 py-2 text-white"
            >
              Login
            </LoadingButton>
            <Link href="/forgot-password">Forgot password?</Link>
            <Link href="/register">Don't have an account?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(Login);