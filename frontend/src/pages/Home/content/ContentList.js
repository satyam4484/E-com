import { NavLink ,useLocation} from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import useRequest from "../../../hooks/request-hook";

const ContentList = (props) => {
  const [subCategory, setSubCategory] = useState([]);
  const request = useRequest();
  const location = useLocation();

  const successHandlder = (response) => {
    setSubCategory(response.data.slice(0,4));
  };

  useState(() => {
    request.sendRequest(
      {
        url: "products/subCategory/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
        body: {
          id: props.id,
        },
      },
      successHandlder,
      (error) => console.log(error)
    );
  }, []);

  return (
    <Fragment>
      {subCategory.length === 0 && <h1>No more data</h1>}
      {subCategory.length > 0 &&
        subCategory.map((items) => {
          return (
            <div className="col-sm-3 mb-2" key={items.id}>
              <div className="card h-100">
                <img
                  src={items.subCategoryImage}
                  className="img-fluid mx-auto w-50 mt-2 "
                  alt={items.item_SubCategory}
                />
                <NavLink to={{
                  pathname:`/products/cat=${props.id}/sub=${items.id}`
                }} className="nav-link text-dark">
                  <div className="card-body">
                    <h5 className="card-title fs-4 fw-bold text-center btn-link">
                      {items.item_SubCategory}
                    </h5>
                  </div>
                </NavLink>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
};

export default ContentList;
