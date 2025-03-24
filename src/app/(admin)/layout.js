import PrivateLayout from "@/components/PrivateLayout";

export default function RootLayout({ children }) {
  const admin = process.env.NEXT_PUBLIC_AUTH_ADMIN;

  return (
    <main>
      <PrivateLayout admin={admin}> {children} </PrivateLayout>
    </main>
  );
}
