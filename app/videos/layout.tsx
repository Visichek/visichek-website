import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`antialiased bg-[#1A1A1A]`}>
      <div>{children}</div>
    </section>
  );
}
