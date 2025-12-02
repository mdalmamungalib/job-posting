import Head from "next/head";
import SignUpPage from "@/components/Frontend/SignUpPage/SignUpPage";

const page = () => {
  return (
    <>
      <Head>
        <title className="">Sign Up - Job Posting Platform</title>
        <meta
          name="description"
          content="Create your account to start applying for jobs"
        />
      </Head>
      <SignUpPage />
    </>
  );
};

export default page;
