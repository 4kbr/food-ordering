import { ProductModel } from "@/models/ProductModel";
import { Cart } from "@/redux/cartSlice";
import { IRootState } from "@/redux/store";
import styles from "@/styles/Navbar.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity: number = useSelector<IRootState, number>(
    (state) => state.cart.quantity
  );
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src="/img/telephone.png"
            alt="telephone pizza bung"
            width={32}
            height={32}
          />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Coba Sekarang!</div>
          <div className={styles.text}>+62 812 2345 2321</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Homepage</li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo.png" alt="logo" width={160} height={69} />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Image src="/img/cart.png" alt="keranjang" width={30} height={30} />
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
