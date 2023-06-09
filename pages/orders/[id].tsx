import { axiosPublic } from "@/configs/api_config";
import { OrderType } from "@/models/OrderModel";
import styles from "@/styles/Order.module.css";
import { GetServerSideProps } from "next";
import Image from "next/image";

type Data = {
  order: OrderType;
};

const Order = ({ order }: Data) => {
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
            <tr className={styles.trTitle}>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Address</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <span className={styles.id}>{order._id}</span>
              </td>
              <td>
                <span className={styles.name}>{order.customer}</span>
              </td>
              <td>
                <span className={styles.address}>{order.address}</span>
              </td>
              <td>
                <span className={styles.total}>${order.total}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src={"/img/paid.png"} alt="" width={30} height={30} />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                src={"/img/checked.png"}
                className={styles.checkedIcon}
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src={"/img/bake.png"} alt="" width={30} height={30} />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                src={"/img/checked.png"}
                className={styles.checkedIcon}
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src={"/img/bike.png"} alt="" width={30} height={30} />
            <span>On the Way</span>
            <div className={styles.checkedIcon}>
              <Image
                src={"/img/checked.png"}
                className={styles.checkedIcon}
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src={"/img/delivered.png"} alt="" width={30} height={30} />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                src={"/img/checked.png"}
                className={styles.checkedIcon}
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${order.total}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  const res = await axiosPublic.get(`/api/orders/${context?.params?.id}`);

  return {
    props: {
      order: res.data.data,
    },
  };
};

export default Order;
