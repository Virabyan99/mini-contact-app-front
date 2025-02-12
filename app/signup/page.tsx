"use client";

import SignIn from "@/components/Signin";

const SignUp = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
      <p className="mb-6">Create an account to get started:</p>

      {/* Use the SignIn component here */}
      <SignIn />
    </div>
  );
};

export default SignUp;
