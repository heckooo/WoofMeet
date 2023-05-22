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
    <div className="h-[100vh] flex items-center justify-center bg-white text-black">
      <Formik
        initialValues={{ username: "", password: "", }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({options: values});
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
            {/* <Field id="username" name="username" placeholder="Username" className="p-2" />
            <Field id="password" name="password" type="password" placeholder="Password" className="p-2" /> */}
            <InputField name="username" placeholder="Username" />
            <InputField  type="password" name="password" placeholder="Password"/>
            <LoadingButton 
              type="submit" 
              loading={isSubmitting}
              className="mt-4"
            >
              Login
            </LoadingButton>
            <Link href="/register">Don't have an account?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(Login);