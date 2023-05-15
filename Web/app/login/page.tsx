"use client"
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useUser } from '@/lib/hooks';
import Router from 'next/router';
import Layout from '../layout';

interface IProps {
  username: string;
  password: string;
}

const Login: React.FC<IProps> = ({}) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [user, { mutate }] = useUser();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })

    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg('Incorect username or password');
    }
  }

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.push('/');
  }, [user])
  
  return (
    <Layout title="Sign In">
    <div>
      <h1>Register</h1>
      {!errorMsg ? null : <h1>{errorMsg}</h1>}
      <form className="flex flex-col bg-white p-4 items-center align-center" onSubmit={onSubmit} noValidate>
        <TextField
          name="username"
          label="Username"
          required
        />
        <TextField 
          type="password"
          label="Password"
          required
        />
        <Button type="submit">Sign In</Button>
      </form>
      <Link href="/">Home</Link>
      <Link href="/register">Don't have an account?</Link>
    </div>
    </Layout>
  );
}

export default Login;