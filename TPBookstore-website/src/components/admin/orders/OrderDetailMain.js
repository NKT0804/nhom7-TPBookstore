import React, { useEffect, useState } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import Loading from "./../../base/LoadingError/Loading";
import Message from "./../../base/LoadingError/Error";
import Modal from "../../base/modal/Modal";

const OrderDetailMain = (props) => {
  return (
    <>
      <Modal
      />
      <section className="content-main">
        {true ? (
          <Loading />
        ) : false ? (
          <Message variant="alert-danger">error</Message>
        ) : (
          <div className="card">
            <header className="card-header p-3 Header-green">
              <div className="row align-items-center ">
                <div className="col-lg-1 col-md-1">
                  <Link to="/admin/orders" className="btn">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                  </Link>
                </div>
                <div className="col-lg-5 col-md-5">
                  <i class="far fa-barcode-alt"></i>
                  <b className="text-white mx-1">Mã đơn hàng:</b>
                  <span className="text-white mx-1">order._id</span>
                  <br />
                  <span>
                    <i className="far fa-calendar-alt"></i>
                    <b className="text-white"> Ngày đặt:</b>
                    <span className="text-white mx-3 ">
                    </span>
                  </span>
                </div>
                <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                  <Link className="btn btn-success ms-2" to="#">
                    <i className="fas fa-print"></i>
                  </Link>
                </div>
              </div>
            </header>
            <div className="card-body">
              {/* Order info */}
              <OrderDetailInfo  />

              <div className="row">
                <div className="col-lg-9 col-md-12">
                  <div className="table-responsive">
                    <OrderDetailProducts />
                  </div>
                </div>
                {/* Payment Info */}
                <div className="col-lg-3 px-0">
                  <div className="">
                    <table className="table__order-details">
                      <tr>
                        <td colSpan="4">
                          <article className="float-end">
                            <dl className="dlist">
                              <dt className="text-start">Tổng tiền sản phẩm:</dt>{" "}
                              <dd className="mx-0 text-end">itemsPrice</dd>
                            </dl>
                            <dl className="dlist">
                              <dt className="text-start">Phí vận chuyển: </dt>{" "}
                              <dd className="mx-0 text-end">shippingPrice</dd>
                            </dl>
                            <dl className="dlist">
                              <dt className="text-start">Thuế VAT(5%):</dt>{" "}
                              <dd className="mx-0 text-end">taxPrice</dd>
                            </dl>
                            <dl className="dlist">
                              <dt className="text-start">Tổng cộng:</dt>
                              <dd className="mx-0 text-end">
                                <b>totalPrice</b>
                              </dd>
                            </dl>
                            <dl className="dlist">
                              <dt className="text-start fw-bold">Trạng thái thanh toán:</dt>
                              <dd className="mx-0 text-end">
                                {true ? (
                                  <span className="badge3 rounded-pill alert alert-success text-success fw-bold">
                                    Thanh toán thành công
                                  </span>
                                ) : (
                                  <span className="badge3 rounded-pill alert alert-danger text-danger fw-bold">
                                    Chưa thanh toán
                                  </span>
                                )}
                              </dd>
                            </dl>
                          </article>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div className=" box shadow-sm bg-light">
                    {!true.cancelled ? (
                      <div>
                        {true?.delivered ? (
                          <button className="btn btn-success col-12">
                            <p>Giao hàng thành công&nbsp;</p>
                            <p>
                              {/* ({moment(order.deliveredAt).format("LT")}&nbsp;
                              {moment(order.deliveredAt).format("DD/MM/yyyy")}) */}
                            </p>
                          </button>
                        ) : !true?.confirmed ? (
                          <>
                            {true && <Loading />}
                            <button
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              onClick={() => "confirm"}
                              className="btn btn-primary col-12 btn-size"
                            >
                              Xác nhận đơn hàng
                            </button>
                          </>
                        ) : (
                          <>
                            {true && <Loading />}
                            <button
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              onClick={() => "deliver"}
                              className="btn btn-primary col-12 btn-size"
                            >
                              Xác nhận đã giao hàng
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {"delivered" ? (
                      <div>
                        {"isPaid" ? (
                          <button className="btn btn-success col-12 mt-2">
                            <p>Đã thanh toán</p>
                            <p>
                              {/* ({moment(order.paidAt).format("LT") + " " + moment(order.paidAt).format("DD/MM/yyyy")}) */}
                            </p>
                          </button>
                        ) : (
                          <>
                            {"loadingIsPaid" && <Loading />}
                            <button
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              onClick={() => "paid"}
                              className="btn btn-warning col-12 btn-size mt-2"
                            >
                              Xác nhận đã thanh toán
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    {!true?.delivered ? (
                      <>
                        {!true.cancelled ? (
                          <>
                            {true && <Loading />}
                            <button
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              onClick={() => "cancel"}
                              className="btn btn-danger col-12 btn-size mt-2"
                            >
                              Hủy đơn hàng
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-danger col-12 btn-size mt-2">Đơn hàng đã bị hủy</button>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default OrderDetailMain;
