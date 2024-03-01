import { Search } from "./search";
import { Navbar } from "./navbar";
import { Brand } from "./brand";

export const HeaderV2 = () => {
  return (
    <Navbar>
      <Brand />
      <Search />
    </Navbar>
  );
};
