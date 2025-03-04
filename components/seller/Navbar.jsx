"use client"
import React from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { SignOutButton, useUser, useClerk } from "@clerk/nextjs";

const Navbar = () => {
  const { router } = useAppContext();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk(); 
  const handleLogout = async() =>{
    await signOut()
    router.push("/")
  }

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b">
      <Link
        className="cursor-pointer text-gray-800 w-28 text-3xl md:text-4xl"
        onClick={() => router.push("/")}
        href={"/"}
        alt="logo"
      >
        <span className="font-medium text-orange-600">S</span>hop
        <span className="font-medium text-black">W</span>here
      </Link>
      {isSignedIn && (
          <button onClick={handleLogout} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
            Logout
          </button>
      )}
    </div>
  );
};

export default Navbar;
