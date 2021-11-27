import { useState, useEffect, Fragment } from "react";
import {useSelector} from "react-redux";
import { useParams,useNavigate } from "react-router";
import useRequest from "../../hooks/request-hook";
import Spinner from "../../components/UI/Spinner";
import Messages from "../../components/UI/Messages";


const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVedio, setShowVedio] = useState(false);
  const [Image, setImage] = useState("");
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const request = useRequest();
  const navigate = useNavigate();
  const successHandlder = (response) => {
    setLoading(false);
    setImage(response.data.images[0]);
    setProduct(response.data);
  };
  useEffect(() => {
    request.sendRequest(
      {
        url: `products/items/${params.prod}/`,
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
      },
      successHandlder,
      (error) => console.log(error)
    );
  }, []);

  const changeImageHandler = (e) => {
    setImage(e.target.currentSrc);
  };

  const convertTo = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleVideo = () => {
    if (showVedio) {
      setShowVedio(false);
    } else {
      setShowVedio(true);
    }
  };

  const addToCartHandler = ()=>{
    if(!isLoggedIn) {
      navigate("/login");
    }


    // need to be implemented
    console.log(params);
  }
  return (
    <Fragment>
      {loading && <Spinner />}
      {/* {error && <Messages error={error} message={errorMessage} />} */}
      {!loading && product != null && (
        <div className="container mt-3 mb-3" key={product.id}>
          <div className="row d-flex">
            <div className="col-md-10">
              <div className="card">
                <div className="row">
                  <div className="col-md-7">
                    <div className="images d-flex">
                      <div className="row mx-2">
                        {product.images.map((item) => {
                          return (
                            <div className="thumbnail text-center" key={item}>
                              <img
                                key={item}
                                onClick={changeImageHandler}
                                style={{ cursor: "pointer" }}
                                className="mx-2 mt-2 "
                                src={item}
                                width="50"
                              />
                            </div>
                          );
                        })}
                        {product.vedio && (
                          <button
                            onClick={handleVideo}
                            className="btn btn-primary btn-sm mt-1 "
                          >
                            {showVedio ? "Show Image" : "Show Video"}
                          </button>
                        )}
                      </div>
                      {!showVedio && (
                        <div className="text-center p-4 text-wrap">
                          <img id="main-image" className="w-100" src={Image} />
                        </div>
                      )}
                      {showVedio && (
                        <div className="text-center p-4">
                          <video
                            className="embed-responsive embed-responsive-16by9"
                            poster={product.images[0]}
                            width="300"
                            preload="none"
                            height="150"
                            controls="controls"
                          >
                            <source src={product.vedio} type="video/mp4" />
                          </video>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="product p-4">
                      <div className="mt-4 mb-3">
                        <span className="text-uppercase text-muted brand">
                          Phones
                        </span>
                        <h5 className="text-uppercase fw-bold">
                          {product.item_name}
                        </h5>
                        <div className="price d-flex flex-col align-items-center">
                          <span className="act-price mx-1 fs-5">
                            &#8377;{convertTo(product.discountPrice)}
                          </span>
                          <div className="ml-2">
                            <small className="dis-price mx-1 text-decoration-line-through text-danger">
                              &#8377;{convertTo(product.item_price)}
                            </small>
                            <span className="text-success">
                              {product.item_discount}% OFF
                            </span>
                          </div>
                        </div>
                      </div>

                      <ul>
                        {product.description.map((desc) => {
                          return <li key={desc}>{desc}</li>;
                        })}
                      </ul>

                      <div className="cart mt-4 align-items-center">
                        <button className="btn btn-success text-uppercase me-2 px-2 mb-2 bnt-" onClick={addToCartHandler}>
                          Add to cart
                        </button>
                        <button className="btn btn-warning text-uppercase me-2 px-2 mb-2 ">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default ProductDetail;
