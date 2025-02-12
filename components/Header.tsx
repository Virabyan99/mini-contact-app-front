"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Assuming you have a reusable button component
import { useRouter } from "next/navigation"; // Import useRouter to navigate

const Header = () => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const router = useRouter(); // Initialize router

  // Handle "Try for Free" click to navigate to the sign-in page
  const handleTryForFree = () => {
    router.push("/signup"); // Redirect to /signin page
  };

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <h1 className="text-3xl font-semibold">Contact Management App</h1>
      
      {/* Conditionally render Try for Free or User info */}
      {status === "authenticated" ? (
        <div className="relative">
          {/* User's profile picture, clicking shows dropdown */}
          {session?.user?.image && (
            <button onClick={toggleDropdown} className="focus:outline-none">
              <Image
                src={session.user.image}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
          )}

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-10">
              <div className="p-4">
                <span className="block text-lg font-semibold">{session?.user?.name}</span>
              </div>
              <Button
                variant="outline"
                onClick={() => signOut()}
                className="w-full px-4 py-2 text-red-600 hover:bg-red-100"
              >
                Sign out
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Button
          variant="outline"
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleTryForFree} // Navigate to sign-in page when clicked
        >
          Try for Free
        </Button>
      )}
    </div>
  );
};

export default Header;
