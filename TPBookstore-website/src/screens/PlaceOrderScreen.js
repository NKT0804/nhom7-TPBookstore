import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/base/LoadingError/Error";
import Header from "../components/Header";
import { createOrder } from "../Redux/Actions/orderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/orderConstants";
import Toast from "../components/base/LoadingError/Toast";
import formatCash from "../utils/formatCash";
import isEmpty from "validator/lib/isEmpty";
import Modal from "../components/base/modal/Modal";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState("");
  // const [paymentMethod, setPaymentMethod] = useState("Thanh toán khi nhận hàng");
  const paymentMethod = "Thanh toán khi nhận hàng";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => {
    return state.cartListItem.cartUser ?? state.cartListItem;
  });
  const { cartItems } = cart;
  let placeOrder = {};
  const orderItems = cartItems.filter((item) => item.isBuy === true);
  placeOrder.orderItems = orderItems.reduce((arrayCartCurrent, item) => {
    arrayCartCurrent.push({
      name: item.product.name,
      qty: item.qty,
      image: item.product.image,
      price: item.product.priceSale,
      product: item.product._id
    });
    return arrayCartCurrent;
  }, []);
  placeOrder.itemsPrice = Number(
    orderItems.length > 0 ? orderItems.reduce((acc, item) => acc + item.product.priceSale * item.qty, 0) : 0
  );
  placeOrder.shippingPrice = 15000;
  placeOrder.taxPrice = Math.round(Number(0.05 * placeOrder.itemsPrice));
  placeOrder.totalPrice =
    Number(placeOrder.itemsPrice) + Number(placeOrder.shippingPrice) + Number(placeOrder.taxPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (userInfo) {
      if (
        isEmpty(userInfo.address?.province) ||
        isEmpty(userInfo.address?.district) ||
        isEmpty(userInfo.address?.ward) ||
        isEmpty(userInfo.address?.specificAddress)
      ) {
        history.push("/shipping");
      }

      setShippingAddress(
        userInfo.address?.province.concat(
          ", ",
          userInfo.address?.district,
          ", ",
          userInfo.address?.ward,
          ", ",
          userInfo.address?.specificAddress
        )
      );
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      toast.success("Đặt hàng thành công!", ToastObjects);
    }
    if (error) {
      toast.error(error, ToastObjects);
    }
    dispatch({ type: ORDER_CREATE_RESET });
  }, [history, dispatch, success, order, error]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: placeOrder.orderItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: placeOrder.itemsPrice,
        shippingPrice: placeOrder.shippingPrice,
        taxPrice: placeOrder.taxPrice,
        totalPrice: placeOrder.totalPrice
      })
    );
  };

  return (
    <>
      <Toast />
      <Header />
      <Modal
        modalTitle={"Đặt đơn hàng"}
        modalBody={"Bạn hãy kiểm tra kỹ thông tin trước khi đặt hàng"}
        btnTitle={"Xác nhận đặt hàng"}
        btnType={"confirm"}
        handler={placeOrderHandler}
      />
      <div className="container">
        <div className="row  order-detail">
          {/* 1 */}
          <div className="order-detail-item col-lg-4 col-md-4 col-5 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-3 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h7 className="order-detail-title">
                  <strong>Khách hàng</strong>
                </h7>
                <p>Tên: {userInfo?.name}</p>
                <p>SĐT: {userInfo?.phone}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="order-detail-item col-lg-4 col-md-4 col-7 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-3 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h7 className="order-detail-title">
                  <strong>Thông tin vận chuyển</strong>
                </h7>
                <p>Đơn vị vận chuyển: GHTK</p>
                <p>Hình thức vận chuyển: Nhanh</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="order-detail-item col-lg-4 col-md-4 col-12 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-3 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h7 className="center order-detail-title">
                  <strong>Địa chỉ giao hàng</strong>
                  <p>{shippingAddress}</p>
                </h7>
                <Link className="btn-link" to={"/shipping"}>
                  Thay đổi
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {orderItems?.length === 0 ? (
              <Message variant="alert-info mt-5">Bạn chưa có đơn hàng nào</Message>
            ) : (
              <>
                {orderItems?.map((item, index) => (
                  <div className="order-products-item row" key={index}>
                    <div className="col-lg-2 col-md-2 col-3">
                      <Link to={`/product/${item.product}`}>
                        <img src={item.product.image} alt={item.name} />
                      </Link>
                    </div>
                    <div className="col-lg-4 px-2 col-md-4 col-6 d-flex align-items-center">
                      <Link to={`/product/${item.product}`}>
                        <h6>
                          {item.product.name.length >= 50
                            ? `${item.product.name.slice(0, 50)}...`
                            : ` ${item.product.name}`}
                        </h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-lg-2 col-md-2 col-3 d-flex align-items-center flex-column justify-content-center ">
                      <h4>Số lượng</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="unit__price mt-3 mt-md-0 col-lg-2 col-md-2 col-9  d-flex align-items-center flex-column justify-content-center ">
                      <h4>Đơn giá</h4>
                      <h6>{formatCash(item.product.priceSale)}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-lg-2 col-md-2 col-3 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>Thành tiền</h4>
                      <h6 className="text-primary-color fw-bold">{formatCash(item.qty * item.product.priceSale)}</h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-4 d-flex align-items-end flex-column subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Tổng tiền sách</strong>
                  </td>
                  <td>{formatCash(placeOrder.itemsPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phí vận chuyển</strong>
                  </td>
                  <td>{formatCash(placeOrder.shippingPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Thuế VAT (5%)</strong>
                  </td>
                  <td>{formatCash(placeOrder.taxPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Tổng số tiền</strong>
                  </td>
                  <td>{formatCash(placeOrder.totalPrice)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Phương thức thanh toán</strong>
                  </td>
                  <td>
                    {/* <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                      <option key={"thanh-toan-khi-nhan-hang"} value={"Thanh toán khi nhận hàng"}></option>
                    </select> */}
                    Thanh toán khi nhận hàng
                  </td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button data-toggle="modal" data-target="#exampleModalCenter" className="btn btn-primary" type="submit">
                Đặt hàng
              </button>
            )}
            {/* {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
