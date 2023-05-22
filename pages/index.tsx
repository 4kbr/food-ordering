import styles from "@/styles/Home.module.css";
import { axiosPublic } from "@/configs/api_config";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Featured from "./components/Featured";
import ProductList from "./components/ProductList";

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
  const res = await axiosPublic.get("/api/products");
  return {
    props: {
      productList: res.data.data,
    },
  };
};
