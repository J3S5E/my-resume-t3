import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import Router from "next/router";
import { useEffect, useState } from "react";

import { api } from "../utils/api";

import "../styles/globals.css";
import Layout from "../components/layout";
import LoadingSpinner from "../components/loading";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <SessionProvider session={session}>
      <Layout>
        <LoadingBar />
        <>{loading ? <LoadingSpinner /> : <Component {...pageProps} />}</>
      </Layout>
    </SessionProvider>
  );
};

const LoadingBar = () => {
  return (
    <NextNProgress
      color="hsl(125,100%,60%)"
      stopDelayMs={50}
      height={1}
      showOnShallow={false}
      options={{ easing: "ease", speed: 500 }}
      // set spinner to hidden
      transformCSS={(css: string) => {
        const split = css.split("#nprogress .spinner {");
        split[1] = `
              display: none !important;
              ${split[1] || ""}
              `;
        css = split.join("#nprogress .spinner {");
        return <style>{css}</style>;
      }}
    />
  );
};

export default api.withTRPC(MyApp);
