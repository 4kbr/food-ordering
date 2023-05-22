import { ProductApi } from "@/models/ProductModel";
import { Cart } from "@/redux/cartSlice";
import { IRootState } from "@/redux/store";
import styles from "@/styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Cart = () => {
  const [open, setOpen] = useState(false);

  // This values are the props in the UI
  const amount = "2";
  const currency = "USD";
  const style = { layout: "vertical" };

  const dispatch = useDispatch();
  const cart = useSelector<IRootState, Cart>((state) => state.cart);

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }: any) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={{ layout: "vertical" }}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={async (data, actions) => {
            return actions.order?.capture().then(function () {
              // Your code here after capture the order
            });
          }}
        />
      </>
    );
  };
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
            {cart.products.map((product, i) => (
              <tr className={styles.tr} key={i}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      fill
                      alt=""
                      src={`${product.img}`}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra, j) => (
                      <span key={j}>
                        {extra.text +
                          (j < product.extras.length - 1 ? ", " : "")}
                      </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>
                    IDR {product.price.toLocaleString()}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    IDR {(product.quantity * product.price).toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>IDR{" "}
            {cart.total.toLocaleString()}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>IDR{" 0"}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>IDR
            {" " + cart.total.toLocaleString()}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton}>CASH ONDELIVERY</button>
              <PayPalScriptProvider
                options={{
                  "client-id": "test",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
