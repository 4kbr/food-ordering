import styles from "@/styles/Order.module.css";
import Image from "next/image";

const Order = () => {
  const status = 0;
  const statusClass = (index: number): string => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
    return "";
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tr className={styles.tr}>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>
                <span className={styles.id}>123921388123</span>
              </td>
              <td>
                <span className={styles.name}>John Doeo</span>
              </td>
              <td>
                <span className={styles.address}>Elston St.Wr 290</span>
              </td>
              <td>
                <span className={styles.total}>$39.90</span>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src={"/img/paid.png"} alt="" width={30} height={30} />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image src={"/img/checked.png"} width={20} height={20} alt="" />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src={"/img/bake.png"} alt="" width={30} height={30} />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image src={"/img/checked.png"} width={20} height={20} alt="" />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src={"/img/bike.png"} alt="" width={30} height={30} />
            <span>On the Way</span>
            <div className={styles.checkedIcon}>
              <Image src={"/img/checked.png"} width={20} height={20} alt="" />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src={"/img/delivered.png"} alt="" width={30} height={30} />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image src={"/img/checked.png"} width={20} height={20} alt="" />
            </div>
          </div>
        </div>
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

export default Order;
