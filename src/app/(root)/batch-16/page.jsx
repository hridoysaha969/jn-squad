import FloatingShapes from "@/components/FloatingShapes";
import HeroSection from "@/components/HeroSection";
import StudentCard from "@/components/StudentCard";
import Image from "next/image";

const students = [
  {
    name: "John Doe",
    currentActivity: "Software Engineer at Google",
    thoughts:
      "My school days were the foundation of my success. I learned discipline and teamwork.",
    contactInfo: "john.doe@gmail.com",
    imageUrl: "/jn_logo.png",
  },
  {
    name: "Hridoy Saha",
    currentActivity: "Web Developer at Web Lab",
    thoughts:
      "My school days were the foundation of my success. I learned discipline and teamwork.",
    contactInfo: "john.doe@gmail.com",
    imageUrl: "",
  },
  {
    name: "Hridoy Saha",
    currentActivity: "Web Developer at Web Lab",
    thoughts:
      "My school days were the foundation of my success. I learned discipline and teamwork.",
    contactInfo: "john.doe@gmail.com",
    imageUrl: "/jn_logo.png",
  },
  {
    name: "Hridoy Saha",
    currentActivity: "Web Developer at Web Lab",
    thoughts:
      "My school days were the foundation of my success. I learned discipline and teamwork.",
    contactInfo: "john.doe@gmail.com",
    imageUrl: "",
  },
  {
    name: "Hridoy Saha",
    currentActivity: "Web Developer at Web Lab",
    thoughts:
      "My school days were the foundation of my success. I learned discipline and teamwork.",
    contactInfo: "john.doe@gmail.com",
    imageUrl: "/jn_logo.png",
  },
  {
    name: "Hridoy Saha",
    currentActivity: "Web Developer at Web Lab",
    thoughts:
      "My school days were the foundation of my success. I learned discipline and teamwork.",
    contactInfo: "john.doe@gmail.com",
    imageUrl: "/1.png",
  },
];

const page = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto p-4">
        <div className="masonry-grid">
          {students.map((card, index) => (
            <StudentCard key={index} student={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Batch 16 - A Tale of Friendship",
    description:
      "Explore the power of lasting friendships formed in school, thriving across miles and years.",
    openGraph: {
      type: "website",
      title: "Batch 16 - A Tale of Friendship",
      description:
        "Explore the power of lasting friendships formed in school, thriving across miles and years.",
      url: "https://jnsquad.vercel.app/batch-16",
      images: [
        {
          url: "/jn_logo.png", // The image to appear when sharing
          width: 1200,
          height: 1200,
          alt: "JN Squad Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Batch 16 - A Tale of Friendship",
      description:
        "Explore the power of lasting friendships formed in school, thriving across miles and years.",
      images: ["/jn_logo.png"], // Same image for Twitter
    },
  };
}
