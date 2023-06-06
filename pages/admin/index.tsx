import { axiosPublic } from "@/configs/api_config";
import { OrderType } from "@/models/OrderModel";
import { ProductApi } from "@/models/ProductModel";
import styles from "@/styles/AdminPage.module.css";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

type Data = {
  products: ProductApi[];
  orders: OrderType[];
};

const AdminPage = ({ products, orders }: Data) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id: string) => {
    console.log(`id is : ${id}`);
    try {
      const res = await axiosPublic.delete(`/api/products/${id}`);
      setProductList((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

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
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
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
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order?._id?.slice(0, 5) + "..."}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>preparing</td>
                <td>
                  <button>Next Stage</button>
                </td>
              </tr>
            </tbody>
          ))}
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
