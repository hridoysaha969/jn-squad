import ActionMenu from "./ActionMenu";
import Logo from "./Logo";
import NavSearchBar from "./NavSearchBar";

const Navbar = () => {
  return (
    <nav className="dark:bg-gray-900 border-b dark:border-gray-700 bg-slate-50 shadow-sm py-3 px-2 sm:px-6 md:px-12 flex justify-between items-center relative">
      <Logo />
      <NavSearchBar />
      <ActionMenu />
    </nav>
  );
};

export default Navbar;
