import { Link, NavLink } from "react-router-dom";
const hrStyle = {
    backgroundColor: "rgb(119, 41, 83)",
    border: "4px solid rgb(119, 41, 83)",
    color: "rgb(119, 41, 83)",
    height: "5px",
};

const myclass = {
    overflow: "auto",
    flexWrap:"wrap" 
  
}

const Header = (props) => {
  return (
    <div className="container-fluid">
      <div className="row d-flex" style={myclass}>
        <ul className="d-flex" style={{ listStyleType: "none" }}>
          {props.category.map((item) => {
            const url = item.category_Image;
            return (
              <li key={item.id} className="mx-auto nav-item text-center">
                <Link
                  className="nav-link fs-4 text-dark"
                to={{
                    // pathname:`/products/cat=${item.item_category}`,
                    pathname:`/products/cat=${item.id}`
                }}
                >
                  <img
                    className="card-img-top"
                    src={item.categoryImage}
                    alt="Card image cap"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                  <p>{item.item_category}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <hr style={hrStyle} />
    </div>
  );
};

export default Header;
