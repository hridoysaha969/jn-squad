import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex flex-1 md:flex-none items-center gap-1 select-none"
    >
      <Image
        src="/jn_logo.png"
        width={50}
        height={50}
        alt="JN Squad Logo"
        className="w-10 h-10 rounded-full"
      />
      <h1 className="text-xl heading-font bg-gradient-to-r to-gray-500 from-gray-950 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent font-extrabold sm:font-bold leading-4 track md:text-2xl">
        JN <span className="">Squad</span>
      </h1>
    </Link>
  );
};

export default Logo;
