/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./../base/LoadingError/Loading";
import Message from "./../base/LoadingError/Error";
import { updateUserProfile } from "../../Redux/Actions/userActions";
import { getAddressData } from "../../Redux/Actions/userActions";
import isEmpty from "validator/lib/isEmpty";

const ProfileTabs = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;
  //get and set address data
  const getListAddressData = useSelector((state) => state.addressData);
  const { addressData } = getListAddressData;
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  //profile data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const setSexValue = (sex) => {
    var radioSex = document.getElementsByName("gender");
    for (var i = 0; i < radioSex.length; i++) {
      if (radioSex[i].value === sex) {
        radioSex[i].checked = true;
      }
    }
  };
  const getSexValue = () => {
    var radioSex = document.getElementsByName("gender");
    for (var i = 0; i < radioSex.length; i++) {
      if (radioSex[i].checked === true) {
        return radioSex[i].value;
      }
    }
  };

  // message error
  const [messageError, setMessageError] = useState({});
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
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || "");
      setSexValue(user.sex);
      setBirthday(user.birthday || "");
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

  //validate data
  const validation = () => {
    const messageError = {};
    let regexPhone = /^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/;
    if (isEmpty(name)) {
      messageError.name = "Gi?? tr??? b???t bu???c*";
    } else {
      if (name.length < 4) messageError.name = "H??? t??n ph???i d??i h??n 3 k?? t???";
      if (name.length >= 250) messageError.name = "H??? t??n ph???i ng???n h??n 250 k?? t???";
    }
    if (isEmpty(phone)) {
      messageError.phone = "Gi?? tr??? b???t bu???c*";
    } else {
      if (!phone.match(regexPhone)) messageError.phone = "Vui l??ng nh???p m???t s??? ??i???n tho???i h???p l???";
    }
    if (!getSexValue()) {
      messageError.sex = "Gi?? tr??? b???t bu???c*";
    }
    if (isEmpty(birthday)) {
      messageError.birthday = "Gi?? tr??? b???t bu???c*";
    } else {
      if (birthday > Date.now()) messageError.birthday = "Vui l??ng nh???p ng??y sinh h???p l???";
    }
    if (!province || !district || !ward || isEmpty(specificAddress))
      messageError.address = "Vui l??ng nh???p ?????y ????? ?????a ch???";

    setMessageError(messageError);
    if (Object.keys(messageError).length > 0) {
      return false;
    }
    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validation()) return;
    const sex = getSexValue();
    const address = { province, district, ward, specificAddress };
    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email: user.email,
        phone,
        avatarUrl: user.avatarUrl,
        sex,
        birthday,
        address
      })
    );
  };

  useEffect(() => {
    dispatch(getAddressData());
  }, [dispatch]);
  return (
    <>
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form
        className="row form-container profile-form ms-4 shadow"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <div className="profile-title">
          <b>Th??ng tin c?? nh??n</b>
        </div>
        <div className="user-information">
          {/* User name */}
          <div className="col-md-12">
            <div className="form account__user">
              <label htmlFor="account-fn">T??n ng?????i d??ng</label>
              <input
                className="form-control"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="frame-error">
            {messageError.name && <Message variant="alert-danger">{messageError.name}</Message>}
          </div>

          {/* Phone number */}
          <div className="col-md-12">
            <div className="form account__user">
              <label htmlFor="account-phone">S??? ??i???n tho???i</label>
              <input className="form-control" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="frame-error">
            {messageError.phone && <Message variant="alert-danger">{messageError.phone}</Message>}
          </div>
          {/* Email */}
          <div className="col-md-12">
            <div className="form account__user">
              <label htmlFor="account-email">?????a ch??? e-mail</label>
              <input className="form-control disabled-email" type="email" value={email} disabled />
            </div>
          </div>

          {/* Sex */}
          <div className="col-md-6">
            <div className="form account__user account-sex">
              <label htmlFor="account-sex-title">Gi???i t??nh</label>

              <p className="account-sex-item">
                <input type="radio" name="gender" id="male" value="nam" className="information_input-sex--item" />
                <label for="male">Nam</label>
              </p>

              <p className="account-sex-item">
                <input type="radio" name="gender" id="female" value="n???" className="information_input-sex--item" />
                <label for="female">N???</label>
              </p>

              <p className="account-sex-item">
                <input type="radio" name="gender" value="kh??c" id="another" className="information_input-sex--item" />
                <label for="another">Kh??c</label>
              </p>
            </div>
          </div>
          <div className="frame-error">
            {messageError.sex && <Message variant="alert-danger">{messageError.sex}</Message>}
          </div>
          {/*Birthday*/}
          <div className="form account__user">
            <label htmlFor="account-birthday">Ng??y sinh</label>

            <input
              className="input__birthday"
              type="date"
              name="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            ></input>
          </div>
          <div className="frame-error">
            {messageError.birthday && <Message variant="alert-danger">{messageError.birthday}</Message>}
          </div>
          {/* ADDRESS */}
          <div className="col-md-12">
            <div className="form account__user_address">
              <label htmlFor="account-address">?????a ch???</label>
              <div className="account-address__select">
                <select
                  className="acount-address__item"
                  value={province}
                  onChange={(e) => selectProvinceHandler(e.target.value)}
                >
                  <option value="">T???nh/Th??nh ph???</option>
                  {addressData?.map((item, index) => (
                    <option value={item.name} key={index} id={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select
                  className="acount-address__item"
                  value={district}
                  onChange={(e) => selectDistrictHandler(e.target.value)}
                >
                  <option value="">Qu???n/Huy???n</option>
                  {districtList?.map((item, index) => (
                    <option value={item.name} key={index} id={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <select className="acount-address__item" value={ward} onChange={(e) => setWard(e.target.value)}>
                  <option value="">Ph?????ng/X??</option>
                  {wardList?.map((item, index) => (
                    <option value={item.name} key={index} id={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                className="form-control input__address"
                type="text"
                placeholder="Nh???p ?????a ch??? c??? th???"
                value={specificAddress}
                onChange={(e) => setSpecificAddress(e.target.value)}
              />
              <div className="frame-error">
                {messageError.address && <Message variant="alert-danger">{messageError.address}</Message>}
              </div>
            </div>
          </div>
          <button type="submit">C???p nh???t</button>
        </div>
      </form>
    </>
  );
};

export default ProfileTabs;
