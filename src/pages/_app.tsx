import Layout from "@/components/Layout/Layout";
import LoginModal from "@/components/Modal/LoginModal";
import RegisterModal from "@/components/Modal/RegisterModal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import EditModal from "@/components/Modal/EditModal";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <RecoilRoot>
          <Toaster />
          <RegisterModal />
          <EditModal />
          <LoginModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}
