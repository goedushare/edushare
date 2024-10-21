'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { redirect } from 'next/navigation';
import { logout } from '@/lib/authHelpers';
import { auth } from '@/lib/firebaseConfig';
import { useState, useEffect } from 'react';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import ProfileModal from "./ProfileModal";
import { getCurrentUser } from "@/lib/authHelpers";

export default function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {
    isOpen: isProfileModalOpen,
    onOpen: onProfileModalOpen,
    onOpenChange: onProfileModalOpenChange,
  } = useDisclosure();

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
    <>
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
            <Button
              as={Link}
              className="bg-[#0E793C] text-white font-semibold"
              href="/login"
              variant="flat"
            >
              Login
            </Button>
          </NavbarItem>
          )}
          {!isLoggedIn && (
          <NavbarItem>
            <Button
              as={Link}
              className="bg-white text-[#0E793C] border-1 border-[#0E793C] font-semibold"
              href="/register"
              variant="flat"
            >
              Register
            </Button>
          </NavbarItem>
          )}
          {/* {isLoggedIn && (
            <NavbarItem>
            <Button
              as={Link}
              className="bg-[#0E793C] text-white font-semibold"
              href="/"
              variant="flat"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </NavbarItem>
          )} */}

          {isLoggedIn && (<NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  as="button"
                  size="sm"
                  src="https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
                  color="primary"
                  isBordered
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions">
                <DropdownItem key="profile" 
                  onPress={() => {
                    onProfileModalOpen();
                  }}> 
                  Profile
                </DropdownItem>
                <DropdownItem key="logout" onClick={handleLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
      <ProfileModal
        isOpen={isProfileModalOpen}
        onOpenChange={onProfileModalOpenChange}
        title="Profile Information"
        actionText="Close"
        onAction={(onClose) => {
          onClose();
        }}
      >
        {getCurrentUser() ? (
          <div>
            <p><strong>Email:</strong> {getCurrentUser()?.email}</p>
            <p><strong>UID:</strong> {getCurrentUser()?.uid}</p>
          </div>
        ) : (
          <p>no user</p>
        )}
      </ProfileModal>
    </>
    
  );
}
