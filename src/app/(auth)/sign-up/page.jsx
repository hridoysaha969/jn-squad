import AuthForm from "@/components/AuthForm";

const SignUp = () => {
  return (
    <section className="mt-2 pb-8 md:pb-0 md:mt-0 md:w-1/2 w-full order-2 md:order-1 md:flex justify-start p-4 lg:p-0 md:justify-center">
      <div className="flex flex-col justify-center lg:w-1/2 w-full">
        <AuthForm type="sign-up" />
      </div>
    </section>
  );
};

export default SignUp;

export async function generateMetadata() {
  return {
    title: "Sign up - JN Squad | School Memories & Achievements",
    description:
      "Sign up to JN Squad to access your school memories and achievements. Share your school memories with your friends and family.",
    openGraph: {
      type: "website",
      title: "Sign up - JN Squad | School Memories & Achievements",
      description:
        "Sign up to JN Squad to access your school memories and achievements. Share your school memories with your friends and family.",
      url: "https://jnsquad.vercel.app/sign-up",
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
      title: "Sign up - JN Squad | School Memories & Achievements",
      description:
        "Sign up to JN Squad to access your school memories and achievements. Share your school memories with your friends and family.",
      images: ["/jn_logo.png"], // Same image for Twitter
    },
  };
}
