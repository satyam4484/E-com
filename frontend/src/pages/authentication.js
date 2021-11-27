import { Fragment, useState } from "react";
import shopping from "../shoping.jpg";
import useRequest from "../hooks/request-hook";
import Messages from "../components/UI/Messages";
import { useDispatch } from "react-redux";
import { userActions } from "../store/auth";
import { useNavigate } from "react-router";

const st = {
  boderRadius: "55px",
};

const Auth = () => {
  const [Signup, setSignup] = useState(false);
  const [username, setUserName] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [password, SetPassword] = useState("");
  const [validpassword, setValidPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [isvalidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const request = useRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateUserNameHandler = () => {
    if (!Signup) {
      return;
    }
    const validate = (response) => {
      if (response.error) {
        setUsernameValid(false);
      } else {
        setUsernameValid(true);
      }
    };
    request.sendRequest(
      {
        url: "accounts/validate/",
        method: "POST",
        body: { username: username },
      },
      validate,
      (error) => console.log(error)
    );
  };

  const validateEmailHandler = () => {
    if (!Signup) {
      return;
    }
    setIsValidEmail(email.includes("@"));
  };

  const passwordChageHandler = (e) => {
    SetPassword(e.target.value);
    if (!Signup) return;
    setTimeout(() => {
      if (password.length < 7) {
        setValidPassword(false);
      } else {
        setValidPassword(true);
      }
    }, 500);
  };
  const ChangeFormToRegisterHandler = (e) => {
    e.preventDefault();
    if (Signup) {
      setSignup(false);
    } else {
      setSignup(true);
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (Signup) {
      const onResponse = (response) => {
        if (response.error) {
          setError("danger");
          setErrorMessage(response.message);
        } else {
          setError("success");
          setErrorMessage(response.message);
          setSignup(false);
        }
        setEmail("");
        SetPassword("");
        setUserName("");
      };
      if (!validpassword || !isvalidEmail || !usernameValid) return;
      request.sendRequest(
        {
          url: "accounts/createuser/",
          method: "POST",
          body: {
            username: username,
            email: email,
            password: password,
          },
        },
        onResponse,
        (error) => {
          console.log(error);
        }
      );
    } else {
      const successResponse = (response) => {
        if (response.detail) {
          setError("danger");
          setErrorMessage(response.detail);
        } else {
          
          localStorage.setItem("token",response.access);
          localStorage.setItem("refresh",response.refresh);


          const setUSer = (response) => {
            dispatch(userActions.userLogin());
            localStorage.setItem("user",JSON.stringify(response.data));
          }
          request.sendRequest({
            url:'accounts/getuser/',
            headers:{
              "Content-Type": "multipart/form-data",
              "Content-Type": "application/json",
              "Authorization":`Bearer ${response.access}`
            },
          },setUSer,(error)=>console.log(error));
          navigate("/");
        }
      };
      request.sendRequest(
        {
          url: "token/",
          method: "POST",
          body: {
            username: username,
            password: password,
          },
        },
        successResponse,
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return (
    <Fragment>
      {error && <Messages error={error} message={errorMessage} />}
      <div className="container mt-5 bg-grey">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={st}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <h1 className="text-center fw-bold">Welcome to SHOPIFY </h1>
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      {Signup ? "Register Form" : "Login Form"}
                    </p>
                    <form
                      className="mx-1 mx-md-4"
                      method="post"
                      onSubmit={submitFormHandler}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa fa-user me-3 fs-4"></i>
                        <div className="form-outline flex-fill ">
                          <input
                            type="text"
                            className={`form-control ${
                              usernameValid ? "" : "is-invalid"
                            }`}
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            onBlur={validateUserNameHandler}
                          />
                          {!usernameValid && (
                            <div className="invalid-feedback">
                              Sorry, that username's taken. Try another?
                            </div>
                          )}
                        </div>
                      </div>
                      {Signup && (
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa fa-envelope me-3 fs-4"></i>
                          <div className="form-outline flex-fill ">
                            <input
                              type="text"
                              className={`form-control ${
                                isvalidEmail ? "" : "is-invalid"
                              }`}
                              value={email}
                              onBlur={validateEmailHandler}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="user@gmail.com"
                            />
                            {!isvalidEmail && (
                              <div className="invalid-feedback">
                                Email must Contains @ ..
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa fa-key me-3 fs-4"></i>
                        <div className="form-outline flex-fill ">
                          <input
                            type="text"
                            className={`form-control ${
                              validpassword ? "" : "is-invalid"
                            }`}
                            value={password}
                            onChange={passwordChageHandler}
                            placeholder="password"
                          />
                          {!validpassword && (
                            <div className="invalid-feedback">
                              Password Length must be greater than equal to 8
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mb-3 mb-lg-4">
                        {Signup && (
                          <Fragment>
                            <button className="btn btn-success btn-lg w-100 mx-2">
                              Signup
                            </button>
                            <button
                              onClick={ChangeFormToRegisterHandler}
                              className="btn btn-secondary btn-lg w-100 mx-2"
                            >
                              Login here?
                            </button>
                          </Fragment>
                        )}

                        {!Signup && (
                          <Fragment>
                            <button className="btn btn-success btn-lg w-100 mx-2">
                              Login
                            </button>
                            <button
                              onClick={ChangeFormToRegisterHandler}
                              className="btn btn-secondary btn-lg w-100 mx-2"
                            >
                              Register
                            </button>
                          </Fragment>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={shopping}
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
