import { axiosPublic } from "@/configs/api_config";
import { OrderType } from "@/models/OrderModel";
import { ProductApi } from "@/models/ProductModel";
import styles from "@/styles/AdminPage.module.css";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";

type Data = {
  products: [ProductApi];
  orders: [OrderType];
};

const AdminPage = ({ products, orders }: Data) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin - Toko Pat</title>
      </Head>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {products.map((product) => (
            <tbody key={product?._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    alt=""
                    width={50}
                    height={50}
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{product._id.slice(0, 5) + "..."}</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button className={styles.button}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            <tr className={styles.trTitle}>
              <td>{"1230812938129083018".slice(0, 5) + "..."}</td>
              <td>Just jonh</td>
              <td>$1.231,00</td>
              <td>Paid</td>
              <td>preparing</td>
              <td>
                <button>Next Stage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const productRes = await axiosPublic.get("/api/products");
  const orderRes = await axiosPublic.get("/api/orders");
  console.log("orders and product success");

  return {
    props: {
      orders: orderRes.data.data,
      products: productRes.data.data,
    },
  };
};

export default AdminPage;
