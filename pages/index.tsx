import Head from "next/head";
import Featured from "./components/Featured";
import ProductList from "./components/ProductList";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza bung</title>
        <meta name="description" content="Pizza terenak rasa bung enak" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList />
    </div>
  );
}
