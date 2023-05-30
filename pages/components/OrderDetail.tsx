import styles from "@/styles/OrderDetail.module.css";
import { MouseEvent, useState } from "react";

type Data = {
  total: number;
  createOrder: (data: any) => Promise<void>;
};
const OrderDetail = ({ total, createOrder }: Data) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay $20 after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            placeholder="John nana"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
            value={customer}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+62 823123213131"
            className={styles.input}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Escl. st 800 NY"
            className={styles.textarea}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
