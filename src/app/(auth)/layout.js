import { MarqueeDemo } from "@/components/AuthSidebar";

export default function RootLayout({ children }) {
  return (
    <main className="flex flex-col md:flex-row justify-between">
      {children}
      <MarqueeDemo />
    </main>
  );
}
