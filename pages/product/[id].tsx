import { axiosPublic } from "@/configs/api_config";
import { ExtraOption, ProductApi } from "@/models/ProductModel";
import { addProduct } from "@/redux/cartSlice";
import styles from "@/styles/Product.module.css";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { MouseEvent } from "react";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
type Data = {
  product: ProductApi;
};
const Product = ({ product }: Data) => {
  const [price, setPrice] = useState(product.prices[0]);
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState<ExtraOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const changePrize = (number: number) => setPrice(price + number);

  const handleSize = (sizeIndex: number) => {
    const difference = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex);
    changePrize(difference);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    additional: ExtraOption
  ) => {
    const checked = e.target.checked;
    if (checked) {
      changePrize(additional.price);
      setExtras((prevData: any) => [...prevData, additional]);
    } else {
      changePrize(-additional.price);
      setExtras(extras?.filter((extra) => extra._id !== additional._id));
    }
  };

  /**
   * function yang dipanggil saat menambah barang
   */
  const handleAddCart = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    dispatch(addProduct({ ...product, extras, price, quantity }));
  };

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
        <span className={styles.price}>${price.toLocaleString()}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src={"/img/size.png"} alt="small" fill />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src={"/img/size.png"} alt="medium" fill />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
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
                onChange={(e) => handleChange(e, additional)}
              />
              <label htmlFor={additional._id}>{additional.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            min={1}
            className={styles.quantity}
            defaultValue={1}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button className={styles.button} onClick={handleAddCart}>
            Add to Cart
          </button>
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
