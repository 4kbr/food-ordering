import styles from "@/styles/ProductCard.module.css";
import { ProductModel } from "@/utils/ProductModel";
import Image from "next/image";
import Link from "next/link";

type Data = {
  product: ProductModel;
};
const ProductCard = ({ product }: Data) => {
  const convertToK = (angka: number) => {
    if (angka >= 1000) {
      const suffixes = ["", "k", "M", "B", "T"];
      const suffixNum = Math.floor(("" + angka).length / 3);
      let shortValue = parseFloat(
        (suffixNum != 0
          ? angka / Math.pow(1000, suffixNum)
          : angka
        ).toPrecision(2)
      );
      if (shortValue % 1 != 0) {
        shortValue = parseInt(shortValue.toFixed(1));
      }
      return shortValue + suffixes[suffixNum];
    }
    return angka;
  };

  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`} passHref>
        <Image src={product.img} alt="foto pizza" width="200" height="200" />
      </Link>
      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>IDR {convertToK(product.prices[0])}</span>
      <p className={styles.desc}>{product.desc}</p>
    </div>
  );
};

export default ProductCard;
