import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { userLoginAction } from "./../Redux/Actions/userActions";
import Message from "./../components/base/LoadingError/Error";
import Loading from "./../components/base/LoadingError/Loading";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, location, userInfo, redirect]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Giá trị bắt buộc*").email("Vui lòng nhập một địa chỉ email hợp lệ"),

      password: Yup.string().required("Giá trị bắt buộc*")
    }),
    onSubmit: (value) => {
      dispatch(userLoginAction(value.email, value.password));
    }
  });
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {loading && <Loading />}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={formik.handleSubmit}>
          {error && <Message variant="alert-danger">{error}</Message>}
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div className="frame-error">
            {formik.errors.email && <span className="error-message">{formik.errors.email}</span>}
          </div>
          <input
            id="password"
            type="password"
            placeholder="Mật khẩu"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <div className="frame-error">
            {formik.errors.password && <span className="error-message">{formik.errors.password}</span>}
          </div>
          <p className="d-flex justify-content-end mt-2">
            <Link style={{ fontSize: "14px", color: "#007AC8" }} to="/forgotPassword">
              <i>Quên mật khẩu?</i>
            </Link>
          </p>
          <button type="submit">Đăng nhập</button>
          <p>
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
              Bạn chưa có tài khoản? &nbsp;
              <span style={{ color: "#4AC4FA" }}>Đăng ký</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
