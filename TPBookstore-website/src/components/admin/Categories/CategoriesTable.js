import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "../../base/LoadingError/Error";
import Loading from "../../base/LoadingError/Loading";
import Toast from "../../base/LoadingError/Toast";
import Modal from "../../base/modal/Modal";

const CategoriesTable = ({ setIsEditCategory, handleEditCategory, handleCurrentCategory }) => {
  
  return (
    <>
      <Toast />
      <Modal
        modalTitle={"Xóa danh mục"}
        modalBody={"Bạn có chắc muốn xóa danh mục này?"}
        btnTitle={"Xóa"}
        btnType={"delete"}
        handler={"categoryDeleteHandler"}
      />
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên danh mục</th>
            <th className="text-center">Danh mục cha</th>
            <th className="text-end">Thao tác</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {true ? (
            <tr className="mb-5 mt-5">
              <Loading />
            </tr>
          ) : false ? (
            <tr>
              <Message variant="alert-danger">error</Message>
            </tr>
          ) : (
            true?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td className="fw-bold">{item.name}</td>
                <td className="fw-bold">{item.parent_category}</td>
                <td className="text-end">
                  <div className="dropdown action__categories">
                    <Link to="#" data-bs-toggle="dropdown">
                      <i
                        className="text-warning fas fa-edit"
                        onClick={() => {
                          handleEditCategory();
                          handleCurrentCategory(index);
                        }}
                      ></i>
                    </Link>
                    <Link data-toggle="modal" data-target="#exampleModalCenter">
                      <i class="text-danger fas fa-trash-alt" onClick={() => ""}></i>
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default CategoriesTable;
