import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAddressData } from "../Redux/Actions/userActions";
import { updateUserProfile } from "../Redux/Actions/userActions";
import Loading from "../components/base/LoadingError/Loading";
import isEmpty from "validator/lib/isEmpty";
import Message from "../components/base/LoadingError/Error";

const ShippingScreen = ({ history }) => {
  const [messageError, setMessageError] = useState({});

  //validate data
  const validation = () => {
    const messageError = {};
    if (!province || !district || !ward || isEmpty(specificAddress))
      messageError.address = "Vui lòng nhập đầy đủ địa chỉ";

    setMessageError(messageError);
    if (Object.keys(messageError).length > 0) {
      return false;
    }
    return true;
  };

  window.scrollTo(0, 0);

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const getListAddressData = useSelector((state) => state.addressData);
  const { addressData } = getListAddressData;
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");

  const dispatch = useDispatch();

  //get list district and list ward
  const getArrayAddress = (inputArray, value) => {
    const outputArray = inputArray?.find((item) => {
      return item.name === value;
    });
    return outputArray;
  };
  const selectProvinceHandler = (value) => {
    setProvince(value);
    setDistrict("");
    setWard("");
    setWardList([]);
  };
  const selectDistrictHandler = (value) => {
    setDistrict(value);
    setWard("");
  };

  useEffect(() => {
    if (user) {
      setProvince(user.address?.province || "");
      setDistrict(user.address?.district || "");
      setWard(user.address?.ward || "");
      setSpecificAddress(user.address?.specificAddress || "");
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (addressData?.length > 0 && province) {
      const getDistrict = getArrayAddress(addressData, province || "");
      if (getDistrict) {
        setDistrictList(getDistrict.districts);
      } else setDistrictList([]);
    }
    if (districtList?.length > 0 && district) {
      const getWard = getArrayAddress(districtList, district);

      if (getWard) {
        setWardList(getWard.wards);
      } else setDistrictList([]);
    }
  }, [dispatch, addressData, province, districtList, district]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validation()) return;
    const addressUpdate = { province, district, ward, specificAddress };
    user.address = addressUpdate;
    dispatch(updateUserProfile(user));
    history.push("/placeOrder");
  };
  useEffect(() => {
    dispatch(getAddressData());
  }, [dispatch]);
  return (
    <>
      {error && <Message variant="alert-danger">{error}</Message>}
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
          <h6 className="filter-menu-item">ĐỊA CHỈ GIAO HÀNG</h6>
          {loading && <Loading />}
          <div className="filter-menu-item">
            <select
              className="form-select"
              aria-label="Filter by category"
              value={province}
              onChange={(e) => selectProvinceHandler(e.target.value)}
            >
              <option value="">Tỉnh/Thành phố</option>
              {addressData?.map((item, index) => (
                <option value={item.name} key={index} id={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-menu-item">
            <select
              className="form-select"
              aria-label="Filter by category"
              value={district}
              onChange={(e) => selectDistrictHandler(e.target.value)}
            >
              <option value="">Quận/Huyện</option>
              {districtList?.map((item, index) => (
                <option value={item.name} key={index} id={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-menu-item">
            <select
              className="form-select"
              aria-label="Filter by category"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
            >
              <option value="">Phường/Xã</option>
              {wardList?.map((item, index) => (
                <option value={item.name} key={index} id={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Địa chỉ cụ thể"
            value={specificAddress}
            onChange={(e) => setSpecificAddress(e.target.value)}
          />
          <div className="frame-error">
            {messageError.address && <Message variant="alert-danger">{messageError.address}</Message>}
          </div>
          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
