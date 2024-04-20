import { GeistSans } from "geist/font/sans";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";

const defaultUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Box Chat",
    template: "%s | Chat Anonymously Inside the Box.",
  },
  description: "Chat Anonymously Inside the Box.",
  keywords: [
    "boxchat",
    "box chat",
    "Supabase realtime chat",
    "supabase chat",
    "Anonymous chat",
    "anonymous",
    "anonym",
    "chat",
    "chat friends",
    "peer",
    "group",
  ],
  creator: "srajankumar",
  openGraph: {
    title: "Box Chat",
    description: "Chat Anonymously Inside the Box.",
    url: defaultUrl,
    siteName: "Box Chat",
    images: [
      {
        url: `${defaultUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Box Chat",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Box Chat",
    description: "Chat Anonymously Inside the Box.",
    creator: "@kumarsrajan02",
    images: [`${defaultUrl}/og.png`],
  },
  icons: {
    icon: "/favicons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <NextTopLoader color="#000000" shadow={false} showSpinner={false} />
        <main>{children}</main>
      </body>
    </html>
  );
}
