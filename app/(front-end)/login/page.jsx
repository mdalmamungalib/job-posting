import React, { Suspense } from "react";
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

      <Suspense
        fallback={
          <div className="min-h-[200px] flex items-center justify-center">
            Loading...
          </div>
        }>
        <Login />
      </Suspense>
    </>
  );
};

export default page;
