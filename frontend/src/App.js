import Layout from "./components/Layout";
import Pagelinks from "./components/Pagelinks";
import Spinner from "./components/UI/Spinner";
import { useDispatch } from "react-redux";
import {useEffect} from "react";
import { userActions } from "./store/auth";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const user = localStorage.getItem("user");
    if(user) {
      dispatch(userActions.userLogin());
    }
  },[])

  return (
    <Layout>
      <Pagelinks />
    </Layout>
  );
}

export default App;
