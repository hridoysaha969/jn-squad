"use client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { sendEmailVerification } from "firebase/auth";
import { BadgeCheck, BadgeX, GraduationCap, Mail, MapPin } from "lucide-react";
import React from "react";

const Information = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

  if (!currentUser) return null;

  const handleVerifyEmail = async () => {
    if (!currentUser.emailVerified) {
      try {
        await sendEmailVerification(currentUser);
        toast({
          title: "Verification email sent",
          description:
            "A verification email has been sent to your email address. Please verify your email to continue.",
          status: "success",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to send verification email",
          description:
            "There was an error while sending the verification email. Please try again later.",
          status: "error",
        });
      }
    } else {
      toast({
        title: "Email already verified",
        description:
          "This action is not required. Your email is already verified.",
        status: "info",
      });
    }
  };

  return (
    <div className="bg-white shadow-md dark:bg-gray-800 rounded-md p-4 w-full md:w-1/2 lg:w-1/3">
      <h1 className="text-xl border-b border-gray-400 pb-1 font-semibold text-gray-600 dark:text-gray-300">
        Information
      </h1>
      <ul className="mt-2">
        <li className="flex items-center gap-1 justify-between">
          <p className="text-gray-600 text-xs dark:text-gray-300 flex items-center gap-1">
            <Mail className="w-4 h-4" /> {currentUser?.email}{" "}
            {currentUser?.emailVerified ? (
              <BadgeCheck className="w-4 h-4 text-blue-500" />
            ) : (
              <BadgeX className="w-4 h-4 text-red-500" />
            )}
          </p>
          {!currentUser?.emailVerified && (
            <span
              className="text-blue-500 cursor-pointer hover:underline select-none font-semibold text-xs"
              onClick={handleVerifyEmail}
            >
              Verify
            </span>
          )}
        </li>
        <li className="mt-2">
          <p className="text-gray-600 text-xs dark:text-gray-300 flex items-center gap-1">
            <MapPin className="w-4 h-4" /> Address{" "}
            <span className="font-semibold text-gray-600 dark:text-gray-100">
              Dhaka, Bangladesh
            </span>
          </p>
        </li>
        <li className="mt-2">
          <p className="text-gray-600 text-xs dark:text-gray-300 flex items-center gap-1">
            <GraduationCap className="w-4 h-4" /> Group{" "}
            <span className="font-semibold text-gray-600 dark:text-gray-100">
              Science
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Information;
