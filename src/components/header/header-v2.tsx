import { Search } from "./search";
import { Navbar } from "./navbar";
import { Brand } from "./brand";
import { Menu } from "./menu";

export const HeaderV2 = () => {
  return (
    <Navbar>
      <Brand />
      <Search />
      <Menu />
    </Navbar>
  );
};
