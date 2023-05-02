import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
