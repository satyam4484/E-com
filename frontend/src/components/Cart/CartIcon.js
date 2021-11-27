const CartIcon = (props) => {
  return (
    <span class="cart-basket d-flex align-items-center justify-content-center">
      <i class="fas fa fa-shopping-cart fa-lg">{props.itemcount}</i>
    </span>
  );
};

export default CartIcon;
