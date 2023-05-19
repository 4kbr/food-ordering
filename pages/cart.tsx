import styles from "@/styles/Cart.module.css";
import Image from "next/image";

const Cart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    fill
                    alt=""
                    src={"/img/pizza.png"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>CORAL29</span>
              </td>
              <td>
                <span className={styles.extras}>
                  Double ingredients, with sambal
                </span>
              </td>
              <td>
                <span className={styles.price}>$19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>$39.90</span>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    fill
                    alt=""
                    src={"/img/pizza.png"}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>CORAL29</span>
              </td>
              <td>
                <span className={styles.extras}>
                  Double ingredients, with sambal
                </span>
              </td>
              <td>
                <span className={styles.price}>$19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>$39.90</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$79.80
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$9.80
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$70.00
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
