import styles from "@/styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>WARUANG MAKAN EUUNAAKK POOL</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        aliquid repellat mollitia quidem ex porro id minus ut! Nisi, fuga
        doloribus aut ducimus quam est blanditiis. Similique suscipit ad rerum,
        nesciunt quo, unde praesentium sequi totam iure delectus nemo beatae
      </p>
      <div className={styles.wrapper}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductList;
