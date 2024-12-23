import { Ubuntu } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "JN Squad - On Behalf of 2016 Batch",
  description:
    "A platform to celebrate school memories and achievements. Create and share events for special occasions, milestones, and student success!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ubuntu.className} ${lato.className}`}>
      <body className="dark:bg-gray-950 bg-slate-100">{children}</body>
    </html>
  );
}
