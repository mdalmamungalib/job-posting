"use client";
import Head from "next/head";
import Login from "@/components/Frontend/Login/Loagin";

const page = () => {
  return (
    <>
      <Head>
        <title className="">Login - Job Posting Platform</title>
        <meta
          name="description"
          content="Create your account to start applying for jobs"
        />
      </Head>
      <Login />
    </>
  );
};

export default page;
