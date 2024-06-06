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
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link color="foreground" href="/learn/0/article">
            <p className="relative group text-base">
              <span>Learn</span>
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary-green group-hover:w-1/2 group-hover:transition-all duration-200 mt-0.5"></span>
              <span className="absolute -bottom-1 right-1/2 w-0 h-0.5 bg-primary-green group-hover:w-1/2 group-hover:transition-all duration-200 mt-0.5"></span>
            </p></Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            className="bg-[#0E793C] text-white"
            href="#"
            variant="flat"
          >
            Upload
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
