import styles from "@/styles/Home.module.css";
import axios from "axios";
import Head from "next/head";
import Featured from "./components/Featured";
import ProductList from "./components/ProductList";
import { GetServerSideProps } from "next";
import Product from "@/models/Product";

type Data = {
  productList: [];
};
export default function Home({ productList }: Data) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza bung</title>
        <meta name="description" content="Pizza terenak rasa bung enak" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList productList={productList} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList: res.data.data,
    },
  };
};
