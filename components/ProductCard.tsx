import styles from "@/styles/ProductCard.module.css";
import { ProductApi } from "@/models/ProductModel";
import Image from "next/image";
import Link from "next/link";
import { convertToK } from "@/configs/global_methods";

type Data = {
  product: ProductApi;
};
const ProductCard = ({ product }: Data) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`} passHref>
        <Image src={product.img} alt="foto pizza" width="200" height="200" />
      </Link>
      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>${convertToK(product.prices[0])}</span>
      <p className={styles.desc}>{product.desc}</p>
    </div>
  );
};

export default ProductCard;
