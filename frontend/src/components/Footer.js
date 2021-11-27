const footerStyle = {
    position: "absolute",
    bottom:"auto",
    width:"100%",
    // marginTop: "200px"
}

const Footer = () => {
  return (
    <footer id="sticky-footer" className="py-4 bg-dark text-white-50" style={footerStyle}>
    <div className="container text-center">
      <small>Copyright &copy; SHOPIFY </small>
    </div>
  </footer>
  );
};

export default Footer;
