import React, { useCallback, useEffect, useState } from "react";
import Loading from "../../../../../../../OOP/TPBookStore-main/TPBookstore-website/src/components/base/LoadingError/Loading";
import Modal from "../../../../../../../OOP/TPBookStore-main/TPBookstore-website/src/components/base/modal/Modal";

const UpdateCategory = ({ currentCategory, setIsEditCategory }) => {
  const submitHandler = () => {
  };
  return (
    <>
      <Modal
        modalTitle={"Cập nhật danh mục sản phẩm"}
        modalBody={"Bạn có chắc muốn cập nhật danh mục này?"}
        btnTitle={"Lưu thay đổi"}
        btnType={"confirm"}
        handler={submitHandler}
      />
      <div className="">
        <div>
          {true && <Loading />}
          <div className="d-flex justify-content-between">
            <div className="mb-3 w-100">
              <label htmlFor="category_name" className="form-label">
                Tên danh mục
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control"
                id="category_name"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mb-3 w-100">
              <label htmlFor="parent-category" className="form-label">
                Danh mục cha
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="form-control"
                id="parent-category"
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-danger px-4" onClick={() => setIsEditCategory(false)}>
              Hủy
            </button>
            <button
              data-toggle="modal"
              data-target="#exampleModalCenter"
              type="submit"
              className="btn btn-warning px-4"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
