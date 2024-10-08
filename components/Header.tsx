import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Header() {
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
        <NavbarItem>
          <Link color="foreground" href="/login">
            <p className="relative group text-base">
              <span>Login</span>
            </p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/register">
            <p className="relative group text-base">
              <span>Register</span>
            </p>
          </Link>
        </NavbarItem>
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
