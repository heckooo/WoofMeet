"use client"
import { InputField } from '@/components/InputField';
import { createUrqlClient } from '@/utils/createUrqlClient';
import { toErrorMap } from '@/utils/toErrorMap';
import { LoadingButton } from '@mui/lab';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useChangePasswordMutation } from '../../generated/graphql';

function ChangePassword({ params }: { params: { token: string }}) {
// const ChangePassword: NextPage<{token: string}> = ({ token }) => {
  const router = useRouter();
  const [,changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <div className="h-[100vh] flex items-center justify-center bg-white text-black">      <Formik
        initialValues={{ newPassword: "",}}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({ 
            newPassword: values.newPassword,
            token: params.token,
          });

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            //Worked properly
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col">
            <InputField type="password" name="newPassword" placeholder="New Password" />
            {tokenError ? 
            <div className="flex flex-col text-lg font-semibold">
              <h1 className="text-[#c00]">{tokenError}</h1>
              <Link className="underline" href="/forgot-password">Retry password reset</Link>
            </div> : null}
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              className="mt-4"
            >
              Change
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default withUrqlClient(createUrqlClient)(ChangePassword);