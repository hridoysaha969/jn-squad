import Image from "next/image";
import CustomInput from "./CustomInput";
import Link from "next/link";

const Form = ({ type }) => {
  return (
    <section>
      <form>
        {type === "sign-up" && (
          <div className="mb-4">
            <CustomInput
              inputType="text"
              label="Name"
              placeholder="Enter full name"
            />
          </div>
        )}
        <div className="mb-4">
          <CustomInput
            inputType="email"
            label="Email"
            placeholder="e.g. johndoe@gmail.com"
          />
        </div>
        <div className="mb-6">
          <CustomInput
            inputType="password"
            label="Password"
            placeholder="Enter strong password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {/* Devider */}
      <div className="flex items-center justify-center my-4">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-2 text-gray-500 text-sm">Or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-400 rounded-lg bg-transparent">
        <Image
          src="/google.svg"
          width={20}
          height={20}
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        <span className="text-gray-700 font-medium text-sm">
          Sign in with Google
        </span>
      </button>

      <p className="text-center py-2 font-normal text-sm">
        {type === "sign-in"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          className="text-blue-500 text-sm font-semibold hover:underline"
        >
          {type === "sign-in" ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </section>
  );
};

export default Form;
