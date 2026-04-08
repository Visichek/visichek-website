import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}
