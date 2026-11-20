import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Config Transfer Test",
  description: "Controlled runtime check for a Vercel Global Config Store connection.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: "32px", lineHeight: 1.5 }}>
        {children}
      </body>
    </html>
  );
}
