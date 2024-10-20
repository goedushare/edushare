'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { redirect } from 'next/navigation';
import { logout } from '@/lib/authHelpers';
import { auth } from '@/lib/firebaseConfig';
import { useState, useEffect } from 'react';

export default function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);



  const handleLogout = async () => {
    try {
      await logout();  // Call the logout function
      redirect('/login');  // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar position="sticky">
      <NavbarBrand>
        <Link href="/" className="text-black">
          <p className="font-bold text-inherit text-xl">NSL Forever!</p>
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="end"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link color="foreground" href="/dashboard">
            <p className="relative group text-base">
              <span>Dashboard</span>
            </p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/learn">
            <p className="relative group text-base">
              <span>Learn</span>
            </p>
          </Link>
        </NavbarItem>
        {!isLoggedIn && (
        <NavbarItem>
          <Link color="foreground" href="/login">
            <p className="relative group text-base">
              <span>Login</span>
            </p>
          </Link>
        </NavbarItem>
        )}
        {!isLoggedIn && (
        <NavbarItem>
          <Link color="foreground" href="/register">
            <p className="relative group text-base">
              <span>Register</span>
            </p>
          </Link>
        </NavbarItem>
        )}
        {isLoggedIn && (
          <NavbarItem>
            <Link legacyBehavior color="foreground" href="/">
              <a onClick={handleLogout}>Logout</a>
            </Link>
          </NavbarItem>
        )}
        {/* <NavbarItem>
          <Button
            as={Link}
            className="bg-[#0E793C] text-white"
            href="https://nslforever.github.io/manage/upload"
            variant="flat"
          >
            Upload
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
}
