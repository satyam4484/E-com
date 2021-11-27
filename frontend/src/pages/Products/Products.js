import { useLocation, useParams, NavLink } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import Spinner from "../../components/UI/Spinner";
import useRequest from "../../hooks/request-hook";

const Products = (props) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const request = useRequest();
  const successHandlder = (response) => {
    setLoading(false);
    
    setProducts(response.data);
  };
  useEffect(() => {
    request.sendRequest(
      {
        url: "products/items/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
        body: { id: params.subcategory },
      },
      successHandlder,
      (error) => console.log(error)
    );
  }, []);

  const convertTo = (x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  return (
    <Fragment>
      {loading && <Spinner />}
      <div className="container mt-5">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h2>Popular Products </h2>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center row mb-5">
          <div className="col-md-10">
            {products.length >0 && products.map((items) => {
              return (
                <div className="row p-2 bg-white border rounded" key={items.id}>
                  <div className="col-md-3 mt-1">
                    <img
                      className="img-fluid img-responsive rounded product-image w-50"
                      src={items.images[0]}
                    />
                  </div>
                  <div className="col-md-6 mt-1">
                    <h5 className=" text-fs-3">{items.item_name}</h5>
                    <div className="mt-2 mb-1 spec-1">
                      <ul>
                        {items.description.map((desc ,index) => (
                          <Fragment>
                            {index < 3 && <li className="mt-2" key={desc}>{desc}</li> }
                          </Fragment>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div className="d-flex flex-row align-items-center">
                      <h4 className="mr-5">&#8377;{convertTo(items.discountPrice)}</h4>
                      <span className="strike-text text-decoration-line-through text-danger">
                        &#8377;{convertTo(items.item_price)}
                      </span>
                    </div>
                    {items.discountPrice > 1000 && (
                      <h6 className="text-success">Free shipping</h6>
                    )}
                    <div className="d-flex flex-column mt-4">
                      <NavLink to={{
                        pathname:`${location.pathname}/product=${items.id}`
                      }} className="btn btn-primary btn-sm" type="button">
                        Details
                      </NavLink>
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        type="button"
                      >
                        Add to wishlist
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
