"use client";
import { useState } from "react";
import ActionMenu from "./ActionMenu";
import Logo from "./Logo";
import NavSearchBar from "./NavSearchBar";

const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="dark:bg-gray-900 border-b dark:border-gray-700 bg-slate-50 shadow-sm py-3 px-2 sm:px-6 md:px-12 flex justify-between items-center relative">
      <Logo />
      <NavSearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
      <ActionMenu isFocused={isFocused} setIsFocused={setIsFocused} />
    </nav>
  );
};

export default Navbar;
