import AuthForm from "@/components/AuthForm";
import { MarqueeDemo } from "@/components/AuthSidebar";

const SignIn = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between">
        <AuthForm type="sign-in" />
        <MarqueeDemo />
      </div>
    </section>
  );
};

export default SignIn;
