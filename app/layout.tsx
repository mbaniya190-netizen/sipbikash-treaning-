import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sip Bikas | Scaffolding Training in Kathmandu",
  description: "Practical scaffolding training, certificate, free lodging, and overseas employment guidance for Nepali men.",
  openGraph: {
    title: "Sip Bikas | Scaffolding Training in Kathmandu",
    description: "Prepare for Gulf construction jobs with practical scaffolding training.",
    images: [{ url: "/logo.jfif" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
