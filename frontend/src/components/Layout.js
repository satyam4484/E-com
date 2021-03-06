import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      {props.children}
      <Footer/>
    </Fragment>
  );
};

export default Layout;
