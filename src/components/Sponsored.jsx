import Image from "next/image";
import Link from "next/link";

const Sponsored = ({ sponsor }) => {
  return (
    <Link
      href={sponsor.siteUrl}
      target="_blank"
      className="flex justify-between items-center gap-4 mt-4"
    >
      <div>
        <Image
          src={sponsor.imgUrl}
          height={60}
          width={120}
          alt="Sponsore image"
          className="rounded-lg"
        />
      </div>
      <div>
        <h2 className="font-semibold text-sm mb-1 text-gray-600 dark:text-gray-300">
          {sponsor.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {sponsor.siteUrl}
        </p>
      </div>
    </Link>
  );
};

export default Sponsored;
