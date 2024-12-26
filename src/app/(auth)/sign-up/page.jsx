import AuthForm from "@/components/AuthForm";

const SignUp = () => {
  return (
    <section className="mt-2 pb-8 md:pb-0 md:mt-0 md:w-1/2 w-full order-2 md:order-1 md:flex justify-start p-4 md:p-0 md:justify-center">
      <div className="flex flex-col justify-center md:w-1/2 w-full">
        <AuthForm type="sign-up" />
      </div>
    </section>
  );
};

export default SignUp;
