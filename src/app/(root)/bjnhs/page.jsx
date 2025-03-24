import ExStudentForm from "@/components/ExStudentForm";

const page = () => {
  return (
    <section className="md:py-12 py-8">
      <div className="max-w-5xl px-2 md:px-4 mx-auto">
        {/* <h1 className="text-2xl text-center md:text-4xl lg:text-6xl mb-4 md:mb-8 font-semibold bg-gradient-to-b dark:from-slate-50 dark:to-blue-400 from-slate-900 to-blue-400 bg-clip-text text-transparent">
          Balakhal J.N. High School and <br className="hidden sm:block" />{" "}
          Technical College
        </h1> */}

        <ExStudentForm />
      </div>
    </section>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "BJNHS - Balakhal J.N. High School and Technical College",
    description:
      "Balakhal J.N. High School and Technical College is an educational institution. It is under Hajiganj Upzilla and Chandpur District.",
    openGraph: {
      type: "website",
      title: "BJNHS - Balakhal J.N. High School and Technical College",
      description:
        "Balakhal J.N. High School and Technical College is an educational institution. It is under Hajiganj Upzilla and Chandpur District.",
      url: "https://jnsquad.vercel.app/bjnhs",
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
      title: "BJNHS - Balakhal J.N. High School and Technical College",
      description:
        "Balakhal J.N. High School and Technical College is an educational institution. It is under Hajiganj Upzilla and Chandpur District.",
      images: ["/jn_logo.png"], // Same image for Twitter
    },
  };
}
