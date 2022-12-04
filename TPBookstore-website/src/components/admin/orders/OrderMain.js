import React, { useState, useEffect } from "react";
import Message from "./../../base/LoadingError/Error";
import Loading from "./../../base/LoadingError/Loading";
import Orders from "./Orders";
import Toast from "../../base/LoadingError/Toast";
import PaginationAdmin from "../Home/PaginationAdmin";

const OrderMain = (props) => {
  const submitHandler = (e) => {};
  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <h2 className="content-title">Đơn hàng</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <form onSubmit={submitHandler} className="col-lg-4 col-md-6 me-auto">
              <input
                type="search"
                placeholder="Tìm kiếm theo mã đơn hàng"
                className="form-control"
              />
            </form>

            <div className="col-lg-2 mx-2 col-6 col-md-3">
              <select className="form-select" >
                <option value={""}>Trạng thái</option>
                <option value={"waiting"}>Đang chờ xác nhận</option>
                <option value={"delivering"}>Đang giao</option>
                <option value={"delivered"}>Đã giao</option>
                <option value={"paid"}>Đã thanh toán</option>
                <option value={"unpaid"}>Chưa thanh toán</option>
                <option value={"cancelled"}>Đã hủy</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" >
                <option value={"10"}>10 đơn hàng</option>
                <option value={"20"}>20 đơn hàng</option>
                <option value={"30"}>30 đơn hàng</option>
                <option value={"40"}>40 đơn hàng</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {true ? (
              <Loading />
            ) : false ? (
              <Message variant="alert-danger">error</Message>
            ) : (
              <Orders />
            )}
          </div>
          <PaginationAdmin  />
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
