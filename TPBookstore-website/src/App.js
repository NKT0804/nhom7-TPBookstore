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

//admin
import "../src/css/AdminApp.css";
import "../src/css/AdminResponsive.css";
import "react-toastify/dist/ReactToastify.css";
import HomeScreenAdmin from "./screens/admin/HomeScreenAdmin";
import ProductScreenAdmin from "./screens/admin/ProductScreen";
import CategoriesScreenAdmin from "./screens/admin/CategoriesScreen";
import OrderScreenAdmin from "./screens/admin/OrderScreen";
import OrderDetailScreenAdmin from "./screens/admin/OrderDetailScreen";
import AddProductAdmin from "./screens/admin/AddProduct";
import UsersScreenAdmin from "./screens/admin/UsersScreen";
import UserDetailsScreenAdmin from "./screens/admin/UserDetailsScreen";
import CommentScreenAdmin from "./screens/admin/CommentsScreen";
import ProductEditScreenAdmin from "./screens/admin/ProductEditScreen";
import { PrivateRouter, AdminPrivateRouter } from "./PrivateRouter";
import SliderBannerScreenAdmin from "./screens/admin/SliderBannerScreen";

import axios from "axios";

//config axios base url default
// axios.defaults.baseURL = "https://api.nkt2001.tech/";
axios.defaults.baseURL = "http://localhost:5000/";

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
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/register/verify/:email" component={RegisterVerify} exact />
        <Route path="/register/verify/:email/:verificationToken" component={RegisterVerify} exact />
        <Route path="/forgotPassword" component={ForgotPassword} exact />
        <Route path="/resetPassword/:resetPasswordToken" component={ResetPassword} exact />
        <PrivateRouter path="/profile" component={ProfileScreen} exact />
        <Route path="/cart/:id?" component={CartScreen} exact />
        <PrivateRouter path="/shipping" component={ShippingScreen} exact />
        <PrivateRouter path="/placeOrder" component={PlaceOrderScreen} exact />
        <PrivateRouter path="/order/:id" component={OrderScreen} exact />

        {/* ADMIN */}
        <AdminPrivateRouter path="/admin" component={HomeScreenAdmin} exact />
        <AdminPrivateRouter path="/admin/products" component={ProductScreenAdmin} exact />
        {/* <AdminPrivateRouter path="/admin/search/:keyword" component={ProductScreenAdmin} exact /> */}

        <AdminPrivateRouter path="/admin/product/:id/edit" component={ProductEditScreenAdmin} exact />
        <AdminPrivateRouter path="/admin/addProduct" component={AddProductAdmin} exact />
        <AdminPrivateRouter path="/admin/category" component={CategoriesScreenAdmin} exact />
        <AdminPrivateRouter path="/admin/orders" component={OrderScreenAdmin} exact />
        <AdminPrivateRouter path="/admin/order/:id" component={OrderDetailScreenAdmin} exact />
        <AdminPrivateRouter path="/admin/users" component={UsersScreenAdmin} exact />
        <AdminPrivateRouter path="/admin/user/:id" component={UserDetailsScreenAdmin} exact />
        <AdminPrivateRouter path="/admin/slider-banner/" component={SliderBannerScreenAdmin} exact />
        <AdminPrivateRouter path="/admin/comments" component={CommentScreenAdmin} exact />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
