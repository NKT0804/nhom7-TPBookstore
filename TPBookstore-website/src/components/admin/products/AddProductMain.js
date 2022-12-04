import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "./../../base/LoadingError/Toast";
import Message from "./../../base/LoadingError/Error";
import Loading from "./../../base/LoadingError/Loading";
import ReactQuill from "react-quill";


const AddProductMain = () => {

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form >
          <div className="content-header">
            <Link to="/admin/products" className="btn btn-primary text-white btn-size">
              Quản lý sản phẩm
            </Link>
            <h2 className="content-title">Sản phẩm mới</h2>
            <div>
              <button type="submit" className="btn btn-primary btn-size">
                Hoàn thành
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {false && <Message variant="alert-danger">error</Message>}
                  {true && <Loading />}

                  <div className="row mb-4">
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_title" className="form-label">
                        Tên sách
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập tên sách"
                        className="form-control"
                        id="product_title"
                        required
                        value={""}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_author" className="form-label">
                        Tác giả
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập Tác giả"
                        className="form-control"
                        id="product_author"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_publisher" className="form-label">
                        Nhà xuất bản
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập Nhà xuất bản"
                        className="form-control"
                        id="product_publisher"
                        required
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_supplier" className="form-label">
                        Nhà cung cấp
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập Nhà cung cấp"
                        className="form-control"
                        id="product_supplier"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_price" className="form-label">
                        Năm xuất bản
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập năm xuất bản"
                        className="form-control"
                        id="product_price"
                        required
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_price_sale" className="form-label">
                        Số trang
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập số trang"
                        className="form-control"
                        id="product_price_sale"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="category_title" className="form-label">
                        Danh mục
                      </label>
                      <select id="category_title" className="form-select" >
                        <option value="">Chọn danh mục</option>
                        {/* {categoryAddProduct &&
                          categoryAddProduct.map((category, index) => (
                            <option key={index} value={category._id}>
                              {category.name}
                            </option>
                          ))} */}
                      </select>
                    </div>
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_count_in_stock" className="form-label">
                        Số lượng sản phẩm trong kho
                      </label>
                      <input
                        type="number"
                        placeholder="Số lượng"
                        className="form-control"
                        id="product_count_in_stock"
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_price" className="form-label">
                        Giá sản phẩm
                      </label>
                      <input
                        type="number"
                        placeholder="0 đ"
                        className="form-control"
                        id="product_price"
                        required
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_price_sale" className="form-label">
                        Giá đã giảm
                      </label>
                      <input
                        type="number"
                        placeholder="0 đ"
                        className="form-control"
                        id="product_price_sale"
                        required
                      />
                    </div>
                  </div>

                  {/*image */}
                  <div className="row mb-4">
                    <div className="col-lg-6 col-md-7 mb-2">
                      <label className="form-label">Hình ảnh sản phẩm</label>
                      <input
                        className="form-control"
                        type="url"
                        placeholder="Nhập URL hình ảnh"
                        required
                      />
                    </div>

                    <div className="col-lg-6 col-md-6 mb-2">
                      <label htmlFor="product_author" className="form-label">
                        Ngôn ngữ
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập ngôn ngữ"
                        className="form-control"
                        id="product_author"
                        required
                      />
                    </div>
                    <label className="form-label">Mô tả</label>
                    <ReactQuill
                      placeholder="Nhập mô tả sản phẩm"
                      className="form-control text-align-content input-description"
                      moudules={""}
                      formats={""}
                      required
                      value={""}
                      onChange={(value) => (value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
