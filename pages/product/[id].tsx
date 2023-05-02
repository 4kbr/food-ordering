import styles from "@/styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";

const Product = () => {
  const [size, setSize] = useState(0);
  const pizza = {
    id: 1,
    img: "/img/pizza.png",
    name: "PIZZA NATABONA",
    price: [19.9, 23.9, 39.9],
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure dolores odio, quam amet sequi vel velit quo vero iste! Alias quod iure nulla animi veritatis veniam molestiae maxime, cupiditate vitae!",
  };

  const additionals = [
    {
      id: "double",
      name: "double",
      text: "Double ingredients",
    },
    {
      id: "cheese",
      name: "cheese",
      text: "Extra Cheese",
    },
    {
      id: "spicy",
      name: "spicy",
      text: "Spicy Sauce",
    },
    {
      id: "garlic",
      name: "garlic",
      text: "Garlic Sauce",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} alt="" style={{ objectFit: "contain" }} fill />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>${pizza.price[size]}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src={"/img/size.png"} alt="small" fill />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src={"/img/size.png"} alt="medium" fill />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src={"/img/size.png"} alt="large" fill />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>

        <div className={styles.ingredients}>
          {additionals.map((additional, i) => (
            <div className={styles.option} key={i}>
              <input
                type="checkbox"
                id={additional.id}
                name={additional.name}
                className={styles.checkbox}
              />
              <label htmlFor={additional.id}>{additional.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input type="number" className={styles.quantity} defaultValue={1} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
