import Header from "./Header";
import Content from "./content/Content";
import Spinner from "../../components/UI/Spinner";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import useRequest from "../../hooks/request-hook";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);

  const request = useRequest();
  const successHandlder = (response) => {
      setLoading(false);
      setCategory(response.data);
  }

  useEffect(() => {
    request.sendRequest({
      url: "products/category/",
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
    },successHandlder,(error)=>{console.log(error)});
  }, []);

  return (
    <Fragment>
      {loading && <Spinner />}
      <Header category={category.slice(0,6)}/>
      <Content category={category}/>
    </Fragment>
  );
};

export default Home;
