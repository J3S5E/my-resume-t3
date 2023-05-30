import Head from "next/head";

import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Jesse Marr | Portfolio</title>
        <meta name="description" content="Jesse Marr's portfolio website, showcasing a collection of projects and skills as a software engineer." />
        <meta name="og:title" content="Jesse Marr | Portfolio" />
        <meta name="og:description" content="Jesse Marr's portfolio website, showcasing a collection of projects and skills as a software engineer." />
        <meta name="og:image" content="https://jesse-marr.net/logo.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col bg-gradient-to-b from-[#210050] to-[#0a0a16] text-white min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-grow px-4 py-8">
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}
