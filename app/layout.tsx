import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sip Bikas | Scaffolding Training in Kathmandu",
  description:
    "Practical scaffolding training, certificate, free lodging, and overseas employment guidance for Nepali men.",
  openGraph: {
    title: "Sip Bikas | Scaffolding Training in Kathmandu",
    description:
      "Prepare for Gulf construction jobs with practical scaffolding training.",
    images: [{ url: "/logo.jfif" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        
        <Script id="meta-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}
    (window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', '1031983809718468');
    fbq('track', 'PageView');
  `}
</Script>
        {children}
      </body>
    </html>
  );
}