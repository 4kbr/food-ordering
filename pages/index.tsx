import Head from "next/head";
import Featured from "./components/Featured";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizza bung</title>
        <meta name="description" content="Pizza terenak rasa bung enak" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
    </>
  );
}
