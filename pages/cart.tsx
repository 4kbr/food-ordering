import { axiosPublic } from "@/configs/api_config";
import { Cart, reset } from "@/redux/cartSlice";
import { IRootState } from "@/redux/store";
import styles from "@/styles/Cart.module.css";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const [open, setOpen] = useState(false);

  // This values are the props in the UI
  const currency = "USD";
  const style = { layout: "vertical" };
  const cart = useSelector<IRootState, Cart>((state) => state.cart);
  const amount = cart.total;

  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data: any) => {
    try {
      const res = await axiosPublic.post("/api/orders", data);
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };

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
                      value: amount.toString(),
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
            return actions.order?.capture().then(function (details) {
              console.log("onapprove");
              console.log(details);
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping?.name?.full_name,
                address: shipping?.address?.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza bung - Cart</title>
        <meta name="description" content="Pizza terenak rasa bung enak" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                    ${product.price.toLocaleString()}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${(product.quantity * product.price).toLocaleString()}
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
            <b className={styles.totalTextTitle}>Subtotal:</b>${" "}
            {cart.total.toLocaleString()}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>${" 0"}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$
            {" " + cart.total.toLocaleString()}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton}>CASH ONDELIVERY</button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AQvpZIz_A1mJhCbc_3OW8MM9uqCgK5DGXaHP7RwbhI83J-sJl83pVi7zIYGcAJSxlQqBw_q4XlXolP0t",
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
