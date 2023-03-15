import Layout from "@/components/Layout/Layout";
import LoginModal from "@/components/Modal/LoginModal";
import RegisterModal from "@/components/Modal/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <RecoilRoot>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}
