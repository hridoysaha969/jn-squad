const page = () => {
  return (
    <section className="md:py-12 py-8">
      <div className="max-w-5xl px-2 md:px-4 mx-auto">
        <h1 className="text-2xl text-center md:text-4xl lg:text-6xl mb-4 md:mb-8 font-semibold bg-gradient-to-r dark:from-slate-50 dark:to-blue-400 from-slate-900 to-blue-400 bg-clip-text text-transparent">
          Batch 16 - A Tale of Friendship <br className="hidden sm:block" />{" "}
          That Endures
        </h1>
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
