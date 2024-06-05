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
          <p className="font-bold text-inherit">NSL Forever!</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/learn/0/article">
            Modules
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
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
        <NavbarItem>123456</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
