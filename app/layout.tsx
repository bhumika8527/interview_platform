// import type { Metadata } from "next";
// import { Mona_Sans } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";

// const monaSans = Mona_Sans({
//   variable: "--font-mona-sans",
//   subsets: ["latin"],
// });



// export const metadata: Metadata = {
//   title: "Mockify.ai",
//   description: "Your AI companion for interview success.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <body
//         className={`${monaSans.className} antialiased pattern`}
//       >
//         {children}

//         <Toaster/>
//       </body>
//     </html>
//   );
// }




import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mockify.ai",
  description: "Your AI companion for interview success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}

        <Toaster />

        {/* ✅ Add Vapi Widget Script Here */}
        <script
          src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
          async
          type="text/javascript"
        ></script>
      </body>
    </html>
  );
}
