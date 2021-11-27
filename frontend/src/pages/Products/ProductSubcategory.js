import { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import useRequest from "../../hooks/request-hook";
import Spinner from "../../components/UI/Spinner";

const ProductSubcategory = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const params = useParams();
  const request = useRequest();
  const [items, setItems] = useState([]);

  const successHandlder = (response) => {
    setLoading(false);
    setItems(response.data);
  };
  useEffect(() => {
    request.sendRequest(
      {
        url: "products/subCategory/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
        body: {
          id: params.category,
        },
      },
      successHandlder,
      (error) => console.log(error)
    );
  }, []);
  return (
    <Fragment>
      {loading && <Spinner />}
      <div className="container mt-3 mb-3">
        <div className="row">
          {items.map((item) => {
            return (
              <div className="col-md-3 mb-5" key={item.id} >
                <div className="card" style={{border:"none"}}>
                  <div className="img-container text-center" >
                    <img src={item.subCategoryImage} className="img-fluid w-75" />
                  </div>
                  <div className=" text-center">
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="mb-0 mt-1 text-center">{item.item_SubCategory}</h2>
                    </div>
                    <div className="mt-2">
                      <NavLink
                        to={{
                          pathname: `${location.pathname}/sub=${item.id}`,
                        }}
                        className="btn btn-primary btn-block mb-2"
                      >
                        View all
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductSubcategory;
