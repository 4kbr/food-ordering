import { ProductModel } from "@/models/ProductModel";
import styles from "@/styles/Product.module.css";
import { axiosPublic } from "@/utils/api_config";
import { convertToK } from "@/utils/global_methods";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";
type Data = {
  product: ProductModel;
};
const Product = ({ product }: Data) => {
  const [size, setSize] = useState(0);
  const additionals = [
    {
      id: "double",
      name: "double",
      text: "Double ingredients",
    },
    {
      id: "cheese",
      name: "cheese",
      text: "Extra Cheese",
    },
    {
      id: "spicy",
      name: "spicy",
      text: "Spicy Sauce",
    },
    {
      id: "garlic",
      name: "garlic",
      text: "Garlic Sauce",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={product.img}
            alt=""
            style={{ objectFit: "contain" }}
            fill
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>
          IDR {convertToK(product.prices[size])}
        </span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src={"/img/size.png"} alt="small" fill />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src={"/img/size.png"} alt="medium" fill />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src={"/img/size.png"} alt="large" fill />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>

        <div className={styles.ingredients}>
          {product.extraOptions.map((additional, i) => (
            <div className={styles.option} key={i}>
              <input
                type="checkbox"
                id={additional._id}
                name={additional._id}
                className={styles.checkbox}
              />
              <label htmlFor={additional._id}>{additional.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input type="number" className={styles.quantity} defaultValue={1} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps<Data> = async ({
  params,
}) => {
  const response = await axiosPublic.get(`/api/products/${params?.id}`);

  return {
    props: {
      product: response.data.data,
    },
  };
};
