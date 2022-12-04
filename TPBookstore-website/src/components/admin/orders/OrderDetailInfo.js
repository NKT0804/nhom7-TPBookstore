import React from "react";
import formatCash from "../../../utils/formatCash";

const OrderDetailInfo = (props) => {
  const { order } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-2 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Khách hàng</h6>
            <p className="mb-1">
              {order.user.name} <br />
              {order.user.phone} <br />
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-3 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Thông tin vận chuyển</h6>
            <p className="mb-1">Đơn vị vận chuyển: GHTK</p>
            <p className="mb-1">Hình thức vận chuyển: Nhanh</p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Địa chỉ giao hàng</h6>
            <p className="mb-1">{order.shippingAddress}</p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-3 col-md-6 col-6">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Phương thức thanh toán</h6>
            <p className="mb-1">{order.paymentMethod}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
