"use client";
import Head from 'next/head';
import SignUpPage from '@/components/Frontend/SignUpPage/SignUpPage';

export default function Signup() {
  return (
    <>
      <Head>
        <title>Sign Up - Job Posting Platform</title>
        <meta name="description" content="Create your account to start applying for jobs" />
      </Head>
      <SignUpPage
      />
    </>
  );    
}