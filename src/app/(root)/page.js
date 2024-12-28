import ResponsiveLayout from "@/components/Layout";

const Home = () => {
  return (
    <>
      <ResponsiveLayout />
    </>
  );
};

export default Home;

export async function generateMetadata() {
  return {
    title: "JN Squad - On Behalf of Batch 2016",
    description:
      "A platform to celebrate school memories and achievements. Create and share events for special occasions, milestones, and student success!",
    openGraph: {
      type: "website",
      title: "JN Squad - On Behalf of Batch 2016",
      description:
        "A platform to celebrate school memories and achievements. Create and share events for special occasions, milestones, and student success!",
      url: "https://jnsquad.vercel.app/",
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
      title: "JN Squad - On Behalf of Batch 2016",
      description:
        "A platform to celebrate school memories and achievements. Create and share events for special occasions, milestones, and student success!",
      images: ["/jn_logo.png"], // Same image for Twitter
    },
  };
}
