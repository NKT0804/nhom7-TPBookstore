import React, { useEffect, useState } from "react";
import Loading from "../../base/LoadingError/Loading";


const CreateCategory = () => {

  const submitHandler = (e) => {
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        {true && <Loading />}
        <div className="mb-4">
          <label htmlFor="category_name" className="form-label">
            Tên danh mục
          </label>
          <input
            required
            type="text"
            placeholder="Nhập danh mục"
            className="form-control"
            id="category_name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category_name" className="form-label">
            Danh mục cha
          </label>
          <input
            required
            type="text"
            placeholder="Nhập danh mục cha"
            className="form-control"
            id="category_name"
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-size btn-primary">Thêm danh mục</button>
        </div>
      </form>
    </>
  );
};

export default CreateCategory;
