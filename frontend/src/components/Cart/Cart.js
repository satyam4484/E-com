import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";

const Cart = () => {
  const item = useSelector((state) => state.cart.cartItems);
  const [showCart, setShowCart] = useState(false);

  const CartHandler =()=>{
      console.log("clicked");
  }
  return (
    <Fragment>
      <CartIcon onClick={CartHandler} itemcount ={item.length}/>
      {showCart && <h1>hello</h1>}
    </Fragment>
  );
};

export default Cart;
