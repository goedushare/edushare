import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import React from "react";

export default function Header() {
  return (
    <Navbar position="static">
      <NavbarBrand>
        <p className="font-bold text-inherit">NSL Forever!</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Modules
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} className="bg-[#0E793C] text-white" href="#" variant="flat">
            Upload
          </Button>
        </NavbarItem>
        <NavbarItem>
          123456
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
