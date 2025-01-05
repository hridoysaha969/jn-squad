import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Sponsored from "./Sponsored";

const RightSideBar = () => {
  const [sponsors, setSponsors] = useState([
    {
      imgUrl: "/sp_1.png",
      title: "Design Professional Website for Your Company",
      siteUrl: "hridoysaha.dev",
    },
  ]);

  return (
    <aside className="fixed inset-y-0 w-1/4 right-0 z-40 transform transition-transform lg:static lg:translate-x-0 hidden lg:block">
      <div className="flex flex-col h-full overflow-y-auto sidebar-scrollbar p-4">
        <h2 className="text-sm border-b border-gray-400 pb-2 font-semibold text-gray-600 dark:text-gray-300 uppercase mb-2">
          <span>Sponsored</span>
        </h2>

        {sponsors.length > 0 ? (
          <div>
            <Sponsored />
            <Sponsored />
            <Sponsored />
          </div>
        ) : (
          <div className="p-3 flex flex-col items-center">
            <Image
              src="/sp.svg"
              width={50}
              height={50}
              alt="Empty"
              className="aspect-square w-full opacity-50"
            />
            <p className="text-gray-500 text-sm">
              Contract for sponsor your brand
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RightSideBar;
