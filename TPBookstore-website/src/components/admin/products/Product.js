import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../../product/Rating";
import formatCash from "../../../utils/formatCash";
import Modal from "../../base/modal/Modal";

const Product = (props) => {
  return (
    <>
      <Modal
        modalTitle={"Xóa sản phẩm"}
        modalBody={"Bạn có chắc muốn xóa sản phẩm này?"}
        btnTitle={"Xóa"}
        btnType={"delete"}
        handler={"deleteHandler"}
      />
      {true?.map((product, index) => (
        <>
          <div className="mobile-header row col-md-12 col-sm-6 col-lg-3 mb-3">
            <div className="row col-md-6 d-flex">
              <div className="card card-product-grid shadow-sm">
                <Link to="#" className="img-wrap">
                  <img src={product.image} alt="Product" />
                </Link>
                <div className="row col-12 info-wrap">
                  <div className="col-9">
                    <Link to="#" className="title text-truncate">
                      {product.name}
                    </Link>
                    <div className="price mb-2">${product.price}</div>
                    <Rating value={product.rating} text={`(${product.numReviews})`} />
                  </div>
                  <div className="row col-2">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="col-12 btn btn-sm btn-outline-success p-2 pb-3 col-md-6 btn-item-product"
                    >
                      <i className="fas fa-pen"></i>
                    </Link>
                    <Link to="#" data-toggle="modal" data-target="#exampleModalCenter">
                      <i
                        className="fas fa-trash-alt col-12 btn btn-sm btn-outline-danger p-2 pb-3 col-md-6 btn-item-product"
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <tr className="pc-header ">
            <td>{0 + index + 1}</td>
            <td>
              <img style={{ maxWidth: "70px", minWidth: "70px" }} src={product?.image} alt={product?.name} />
            </td>
            <td>
              <b alt={product?.name}>
                {`${product?.name.lenght}>=25` ? `${product?.name.slice(0, 25)}...` : `${product?.name}`}
              </b>
            </td>
            <td>
              <Rating value={product.rating} text={`(${product.numReviews})`} />
            </td>
            <td>
              <b>{product?.category.name}</b>
            </td>
            <td>
              <b>{formatCash(product?.priceSale)}</b>
            </td>
            <td>
              <b>{product?.countInStock}</b>
            </td>
            <td>
              <b>{product?.totalSales}</b>
            </td>
            <td className="text-end">
              <div className="dropdown">
                {/* <i className="fas fa-ellipsis-h"></i> */}
                <Link className="text-warning p-md-2" to={`/admin/product/${product._id}/edit`}>
                  <i className="fas fa-edit"></i>
                </Link>
                <Link data-toggle="modal" data-target="#exampleModalCenter">
                  <i
                    class="fas fa-trash-alt edit__products text-danger"
                    onClick={() => ""}
                  ></i>
                </Link>

                <div className="dropdown-menu"></div>
              </div>
            </td>
          </tr>
        </>
      ))}
    </>
  );
};

export default Product;
