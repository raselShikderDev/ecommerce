"use client";
import React, { useEffect, useState } from "react";
import { assets, CartIcon, BagIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import Loading from "./Loading";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSellerDashboard = () => {
    setIsLoading(true)
    if (isSignedIn) {
      router.push("/seller");
    } else {
      openSignIn();
    }
    setIsLoading(false)
  };
    <Loading/>
  }
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Link
        className="cursor-pointer text-gray-800 w-28 text-3xl md:text-4xl"
        onClick={() => router.push("/")}
        href={"/"}
        alt="logo"
      >
        <span className="font-medium text-orange-600">S</span>hop
        <span className="font-medium text-black">W</span>here
      </Link>
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && (
          <button
            // onClick={() => router.push("/seller")}
            onClick={handleSellerDashboard}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {isSignedIn ? (
          <UserButton>
            <UserButton.MenuItems>
            <UserButton.Action
            label="Cart"
            labelIcon={<CartIcon />}
            onClick={() => router.push("/cart")}
          />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
            <UserButton.Action
            label="My Orders"
            labelIcon={<BagIcon />}
            onClick={() => router.push("/my-orders")}
          />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {isSignedIn ? (
          <UserButton />
        ) : (
          <button className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
