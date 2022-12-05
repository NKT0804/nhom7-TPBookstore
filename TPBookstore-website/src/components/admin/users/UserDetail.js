import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUserDetails } from "../../../Redux/Actions/userActions";
import Loading from "../../base/LoadingError/Loading";
import Message from "../../base/LoadingError/Error";

const UserDetail = (props) => {
  const { userId } = props;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.adminGetUserDetails);
  const { loading, error, user } = userDetails;
  useEffect(() => {
    dispatch(adminGetUserDetails(userId));
  }, [dispatch, userId]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="user-information__admin">
            <div className="user-information__admin-header">Thông tin khách hàng</div>
            {/* User name */}
            <div className="col-md-12 mt-5">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Tên người dùng</label>
                <label>{user.name ?? ""}</label>
              </div>
            </div>

            {/* Phone number */}
            <div className="col-md-12">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Số điện thoại</label>
                <label>{user.phone ?? ""}</label>
              </div>
            </div>

            {/* Email */}
            <div className="col-md-12">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Địa chỉ e-mail</label>
                <label>{user.email ?? ""}</label>
              </div>
            </div>

            {/* Sex */}
            <div className="user-information__admin-item">
              <label className="user-information__admin-title">Giới tính</label>
              <label className="text-capitalize">{user.sex ?? ""}</label>
            </div>

            {/*Birthday*/}
            <div className="user-information__admin-item">
              <label className="user-information__admin-title">Ngày sinh</label>
              <label>{user.birthday ?? ""}</label>
            </div>

            {/* ADDRESS */}
            <div className="col-md-12">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Địa chỉ</label>
                <label>
                  {user.address?.specificAddress?.concat(
                    ", ",
                    user.address?.ward,
                    ", ",
                    user.address?.district,
                    ", ",
                    user.address?.province
                  )}
                </label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="user-information__admin-item">
                <label className="user-information__admin-title">Trạng thái</label>
                {user.disabled ? <label>Đã bị khoá</label> : <label>Đang hoạt động</label>}
              </div>
            </div>
          </div>
          {user.disabled ? (
            <button className="user-information__admin-btn btn btn-info">Huỷ khoá tài khoản</button>
          ) : (
            <button className="user-information__admin-btn btn btn-danger">Khoá tài khoản</button>
          )}
        </>
      )}
    </>
  );
};
export default UserDetail;
