/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Jack",
    img: "/1.png",
  },
  {
    name: "Jill",
    img: "/2.png",
  },
  {
    name: "John",
    img: "/3.png",
  },
  {
    name: "James",
    img: "/6.png",
  },
  {
    name: "Jane",
    img: "/4.png",
  },
  {
    name: "Jenny",
    img: "/5.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]">
      <div className="aspect-[16/9]">
        <Image
          className="rounded-md w-full h-full"
          width="600"
          height="32"
          alt={name}
          src={img}
          priority
        />
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex order-1 md:order-2 md:h-screen h-1/2 md:w-1/2 w-full flex-col items-center justify-center overflow-hidden border bg-white dark:bg-gray-800 md:shadow-sm">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-gray-50 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-gray-50 dark:from-background"></div>
    </div>
  );
}
