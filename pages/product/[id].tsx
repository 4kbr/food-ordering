import styles from "@/styles/Product.module.css";
import Image from "next/image";

const Product = () => {
  const pizza = {
    id: 1,
    img: "/img/pizza.png",
    name: "LEMPER",
    price: [19.9, 23.9, 9.9],
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, perspiciatis?",
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} alt="" style={{ objectFit: "contain" }} fill />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
      </div>
    </div>
  );
};

export default Product;
