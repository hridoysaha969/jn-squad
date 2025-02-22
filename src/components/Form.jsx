/* eslint-disable @next/next/no-img-element */
"use client";
import CustomInput from "./CustomInput";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { getIdToken, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { get, ref, set, update } from "firebase/database";
import { setCookie } from "cookies-next";

const Form = ({ type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { signUp, signIn } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === "sign-in") {
        const signInData = {
          email: formData.email,
          password: formData.password,
        };
        const { email, password } = signInData;

        if (!email || !password) {
          setError(true);
          return;
        }

        await signIn(email, password);
        router.push("/");
        // Reset form data
        setFormData({
          email: "",
          password: "",
        });
        setError(false);
      } else {
        const { name, email, password } = formData;
        if (!name || !email || !password) {
          setError(true);
          return;
        }

        await signUp(email, password, name);
        router.push("/");
        // Reset form data
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setError(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await getIdToken(user);
      setCookie("access_token", token, { maxAge: 60 * 60 * 24 * 7, path: "/" });

      const userRef = ref(db, `users/${user.uid}`);

      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        await set(userRef, {
          uuid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          address: "",
          group: "",
          createdAt: new Date().toISOString(),
          metadata: user.metadata,
        });
      } else {
        await update(userRef, {
          lastLogin: new Date().toISOString(),
        });
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error signing with Google",
        description: error.message,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {type === "sign-up" && (
          <div className="mb-4">
            <CustomInput
              inputType="text"
              label="Name"
              name="name"
              value={formData.name}
              handleChange={handleChange}
              error={error}
              placeholder="Enter full name"
            />
          </div>
        )}
        <div className="mb-4">
          <CustomInput
            inputType="email"
            label="Email"
            name="email"
            value={formData.email}
            handleChange={handleChange}
            error={error}
            placeholder="e.g. johndoe@gmail.com"
          />
        </div>
        <div className="mb-6">
          <CustomInput
            inputType="password"
            label="Password"
            name="password"
            value={formData.password}
            handleChange={handleChange}
            error={error}
            placeholder={
              type === "sign-in" ? "Enter password" : "Enter strong password"
            }
          />
        </div>
        <button
          type="submit"
          className="w-full disabled:bg-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      {/* Devider */}
      <div className="flex items-center justify-center my-4">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-2 text-gray-500 dark:text-gray-300 text-sm">
          Or
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <button
        className="flex disabled:cursor-not-allowed items-center justify-center w-full px-4 py-2 border border-gray-400 rounded-lg bg-transparent"
        disabled={loading}
        onClick={handleGoogleSignIn}
      >
        <img
          src="/google.svg"
          width={20}
          height={20}
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
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
