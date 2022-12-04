import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Product from "./Product";
import Loading from "./../../base/LoadingError/Loading";
import Message from "./../../base/LoadingError/Error";
import PaginationAdmin from "../Home/PaginationAdmin";
import Toast from "../../base/LoadingError/Toast";


const MainProducts = React.memo((props) => {
 
  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <h2 className="content-title">Sản phẩm</h2>
        <div>
          <Link to="/admin/addProduct" className="btn btn-primary btn-size">
            Thêm sản phẩm
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row">
            <form onSubmit={""} className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Tìm kiếm sản phẩm"
                className="form-control"
              />
            </form>
            {/* <CategoryFilterAdmin
              category={category}
              categoryFilterAdmin={categoryFilterAdmin}
              setCategoryFilterAdmin={setCategoryFilterAdmin}
            /> */}
            {/* <SortBy sortBy={sortBy} setSortBy={setSortBy} /> */}
            <div className="col-lg-2 col-6 col-md-3 mx-1">
              <select className="form-select" value={"limit"} >
                <option value={"10"}>10 sản phẩm</option>
                <option value={"20"}>20 sản phẩm</option>
                <option value={"30"}>30 sản phẩm</option>
                <option value={"40"}>40 sản phẩm</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {false && <Message variant="alert-danger">errorDelete</Message>}
          {true ? (
            <Loading />
          ) : false ? (
            <Message variant="alert-danger">error</Message>
          ) : (
            <>
              <table className="table">
                <thead className="pc-header">
                  <tr>
                    <th>Stt</th>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Đánh giá</th>
                    <th>Thể loại</th>
                    <th>Đơn giá</th>
                    <th>Kho</th>
                    <th>Đã bán</th>
                    <th className="text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <Product  />
                </tbody>
              </table>
            </>
          )}
          {/* PaginationAdmin */}
          <PaginationAdmin  />
        </div>
      </div>
    </section>
  );
});

export default MainProducts;
