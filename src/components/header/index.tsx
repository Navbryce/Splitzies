import { FunctionalComponent, h } from "preact";
import SplitIcon from "../icons/SplitIcon";

const Header: FunctionalComponent = () => {
  return (
    <header class="shadow-lg bg:shadow-slate-900 p-3.5">
      <h1 class="text-3xl flex flex-row items-center">
        <SplitIcon />
        Splitzies
      </h1>
    </header>
  );
};

export default Header;
