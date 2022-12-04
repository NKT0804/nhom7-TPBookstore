import React from "react";
import { Link } from "react-router-dom";
import Message from "./../../base/LoadingError/Error";
import Loading from "./../../base/LoadingError/Loading";

const LatestOrder = (props) => {
  return (
    <div className="card-body">
      <h4 className="card-title">Đơn hàng mới</h4>
      {true ? (
        <Loading />
      ) : false ? (
        <Message variant="alert-danger">error</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tên khách hàng</th>
                <th scope="col">Tổng cộng</th>
                <th scope="col">Trạng thái thanh toán</th>
                <th scope="col">Ngày đặt</th>
                <th scope="col">Trạng thái</th>
                <th scope="col" className="text-end">
                  Xem
                </th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>
                    <td>
                      <Link to={`/admin/order/`}></Link>
                    </td>
                  </td>
                  <td>
                    <b></b>
                  </td>
                  <td>totalPrice</td>
                  <td>
                    {true ? (
                      <span className="badge3 rounded-pill alert-success fw-bold">
                        Thanh toán lúc
                      </span>
                    ) : (
                      <span className="badge3 rounded-pill alert-danger fw-bold">Chưa thanh toán</span>
                    )}
                  </td>
                  <td></td>
                  <td>
                      <span className="badge3 btn-danger">Đã hủy</span>
                      <span className="badge3 btn-success">Đã giao</span>
                      <span className="badge3 btn-warning">Đang giao</span>
                      <span className="badge3 btn-primary">Đang chờ xác nhận</span>
                  </td>
                  <td className="d-flex justify-content-end align-item-center">
                    <Link to={`/admin/order/`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              )
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
