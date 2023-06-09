import styles from "../styles/Add.module.css";

const AddButton = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Add New Pizza
    </div>
  );
};

export default AddButton;
