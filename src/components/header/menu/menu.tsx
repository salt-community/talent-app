import {
  Link,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

export const Menu = () => {
  return (
    <NavbarContent justify="end">
      <NavbarMenuToggle />
      <NavbarMenu className="z-100 flex flex-col items-center gap-4 pt-10">
        <NavbarMenuItem>
          <Link href="#">Sign Out</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NavbarContent>
  );
};
