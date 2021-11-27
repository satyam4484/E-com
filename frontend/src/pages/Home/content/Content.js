import { NavLink } from "react-router-dom";
import ContentList from "./ContentList";
const Content = (props) => {
  const category = props.category;
  return (
    <div className="container-fluid">
      {category.map((items) => {
        return (
          <div key={items.id}>
            <div className="row mt-0 mb-5 bg-light mx-5">
              <h3 className="font-weight-bold text-uppercase mt-2 fs-2 text-dark text-wrap">
                {items.item_category}
                <NavLink
                  to={{
                    // pathname:`/products/cat=${items.item_category}`,
                    pathname: `/products/cat=${items.id}`,
                    state: { id: items.id },
                  }}
                  className="float-end btn btn-info mt-1 btn-sm"
                >
                  See more
                </NavLink>
              </h3>
              <ContentList id={items.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Content;
