import { MarqueeDemo } from "@/components/AuthSidebar";

export const metadata = {
  title: "Sign in - JN Squad | School Memories & Achievements",
  description:
    "Sign in to JN Squad to access your school memories and achievements. Share your school memories with your friends and family.",
};

export default function RootLayout({ children }) {
  return (
    <main className="flex flex-col md:flex-row justify-between">
      {children}
      <MarqueeDemo />
    </main>
  );
}
