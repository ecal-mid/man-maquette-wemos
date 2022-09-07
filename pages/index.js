import Head from "next/head";
import { ChooseWemos } from "../components/ChooseWemos";
import { Header } from "../components/Header";
import { initFirebase } from "../components/firebase";
import styled from "styled-components";
const Container = styled.div``;
export default function Home() {
  initFirebase();
  const numOfWemos = 20;

  return (
    <div>
      <Head>
        <title>Wemos control app</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />{" "}
      </Head>
      <Container>
        <Header></Header>
        <main>
          <ChooseWemos numOfWemos={numOfWemos}></ChooseWemos>
        </main>
      </Container>
    </div>
  );
}
