"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
  Spacer,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { redirect } from "next/navigation";
import { logout } from "@/lib/authHelpers";
import { auth } from "@/lib/firebaseConfig";
import { useState, useEffect } from "react";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import ProfileModal from "./ProfileModal";
import { getCurrentUser } from "@/lib/authHelpers";
import Image from "next/image";

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
      await logout(); // Call the logout function
      redirect("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
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

          {isLoggedIn && (
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger className="ml-4">
                  <Avatar
                    as="button"
                    size="sm"
                    src={
                      getCurrentUser()?.photoURL ||
                      "/images/default-profile-picture.png"
                    }
                    color="primary"
                    isBordered
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions">
                  <DropdownItem
                    key="profile"
                    onPress={() => {
                      onProfileModalOpen();
                    }}
                  >
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
            <Avatar
              as="button"
              size="md"
              src={
                getCurrentUser()?.photoURL ||
                "/images/default-profile-picture.png"
              }
              color="primary"
              isBordered
            />
            <div className="mt-4  ">
              <p>
                <strong>Email:</strong> {getCurrentUser()?.email}
              </p>
              <p>
                <strong>Username:</strong> {getCurrentUser()?.displayName}
              </p>

              <p>
                <strong>UID:</strong> {getCurrentUser()?.uid}
              </p>
            </div>
          </div>
        ) : (
          <p>No User Found</p>
        )}
      </ProfileModal>
    </>
  );
}
