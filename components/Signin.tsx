"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSignIn = async () => {
    setLoading(true); // Start loading when the button is clicked

    // Sign in with GitHub and redirect after successful authentication
    const result = await signIn("github", { callbackUrl: "http://localhost:3000/contacts" });

    // You can also add further error handling here if needed
    if (!result) {
      // Handle any errors if needed
      setLoading(false); // Reset loading if something went wrong
    }
  };

  return (
    <div className=" bg-gray-50">
      <button
        onClick={handleSignIn}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        disabled={loading} // Disable button during loading
      >
        {loading ? "Processing..." : "Sign in with GitHub"} {/* Show "Processing..." when loading */}
      </button>
    </div>
  );
};

export default SignIn;
