import Layout from "@/components/Layout/Layout";
import Modal from "@/components/Modal/Modal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal title="Test Modal" actionLabel="Submit" isOpen />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
