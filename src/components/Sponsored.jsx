import Image from "next/image";
import Link from "next/link";

const Sponsored = () => {
  return (
    <Link
      href="https://hridoysaha.vercel.app"
      target="_blank"
      className="flex justify-between items-center gap-4 mt-4"
    >
      <div>
        <Image
          src="/sp_1.png"
          height={60}
          width={120}
          alt="Sponsore image"
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="font-semibold text-sm mb-1 text-gray-600 dark:text-gray-300">
          Design Professional Website for Your Company
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          hridoysaha.dev
        </p>
      </div>
    </Link>
  );
};

export default Sponsored;
