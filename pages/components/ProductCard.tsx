import styles from "@/styles/ProductCard.module.css";
import Image from "next/image";
const ProductCard = () => {
  return (
    <div className={styles.container}>
      <Image src={"/img/pizza.png"} alt="foto pizza" width="200" height="200" />
      <h1 className={styles.title}>Pizza Bakar Abon</h1>
      <span className={styles.price}>$10.33</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio,
        molestiae!
      </p>
    </div>
  );
};

export default ProductCard;
