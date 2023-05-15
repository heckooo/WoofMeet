"use client"
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useUser } from '@/lib/hooks';
import Router from 'next/router';
import Layout from '../layout';

interface IProps {
  firstame: string;
  email: string;
  password: string;
  rpassword: string;
}

const Register: React.FC<IProps> = ({}) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [user, { mutate }] = useUser();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
      name: e.currentTarget.firstname.value,
    };

    if (body.password !== e.currentTarget.rpassword.valueOf) {
      setErrorMsg("Passwords don't match");
      return;
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/');
  }, [user])
  
  return (
    <Layout title="Sign Up">
    <div>
      <h1>Register</h1>
      {!errorMsg ? null : <h1>{errorMsg}</h1>}
      <form className="flex flex-col bg-white p-4 items-center align-center" onSubmit={onSubmit} noValidate>
        <TextField
          name="email"
          label="Email"
          required
        />
        <TextField
          name="firstName"
          label="First Name"
          required
        />
        <TextField 
          type="password"
          label="Password"
          required
        />
        <TextField 
          name="rpassword"
          type="password"
          label="Repeat Password"
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
      <Link href="/">Home</Link>
      <Link href="/login">Already have an account?</Link>
    </div>
    </Layout>
  );
}

export default Register;