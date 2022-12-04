import React from "react";
import "../src/css/App.css";
import "../src/css/responsive.css";
import "./css/grid.css";
import "./css/base.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import RegisterVerify from "./screens/RegisterVerify";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
//config axios base url default
// axios.defaults.baseURL = "https://tp-bookstore.herokuapp.com/";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/products" component={ProductsScreen} exact />
        <Route path="/category/:category" component={ProductsScreen} exact />
        <Route path="/search/category/:category" component={ProductsScreen} exact />
        <Route path="/search" component={ProductsScreen} exact />
        <Route path="/product/:slug" component={SingleProduct} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} exact />
        <Route path="/register/verify/:email" component={RegisterVerify} exact />
        <Route path="/register/verify/:email/:verificationToken" component={RegisterVerify} exact />
        <Route path="/forgotPassword" component={ForgotPassword} exact />
        <Route path="/resetPassword/:resetPasswordToken" component={ResetPassword} exact />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <Route path="/cart/:id?" component={CartScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/placeOrder" component={PlaceOrderScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
