import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAdmin } from "./../../../Redux/Actions/productActions.js";
import Loading from "./../../base/LoadingError/Loading";
import Message from "./../../base/LoadingError/Error";
import PaginationAdmin from "../Home/PaginationAdmin";
import Toast from "../../base/LoadingError/Toast";
import { toast } from "react-toastify";
import { listCategoryAdmin } from "../../../Redux/Actions/categoryActions";
import CategoryFilterAdmin from "../filterAdmin/CategoryFilterAdmin";
import SortBy from "../filterAdmin/SortBy";
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_HIDDEN_RESET,
  PRODUCT_SHOW_RESET
} from "../../../Redux/Constants/productConstants";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000
};
const MainProducts = React.memo((props) => {
  const { keyword, pageNumber } = props;
  const dispatch = useDispatch();
  let history = useHistory();

  const [keywordSearch, setKeywordSearch] = useState(keyword);
  const [categoryFilterAdmin, setCategoryFilterAdmin] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("all");

  const productListAdmin = useSelector((state) => state.productListAdmin);
  const { loading, error, products, page, pages, total } = productListAdmin;

  const categoryListAdmin = useSelector((state) => state.categoryListAdmin);
  const { category } = categoryListAdmin;

  const productDeleteAdmin = useSelector((state) => state.productDeleteAdmin);
  const { error: errorDelete, success: successDelete } = productDeleteAdmin;

  const productHiddenAdmin = useSelector((state) => state.productHiddenAdmin);
  const { error: errorHidden, success: successHidden } = productHiddenAdmin;

  const productShowAdmin = useSelector((state) => state.productShowAdmin);
  const { error: errorShow, success: successShow } = productShowAdmin;

  useEffect(() => {
    dispatch(listProductsAdmin(keyword, pageNumber, categoryFilterAdmin, sortBy, limit, status));
    dispatch(listCategoryAdmin());
    if (successDelete) {
      toast.success("X??a s???n ph???m th??nh c??ng!", ToastObjects);
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    if (successHidden) {
      toast.success("???n s???n ph???m th??nh c??ng", ToastObjects);
      dispatch({ type: PRODUCT_HIDDEN_RESET });
    }

    if (successShow) {
      toast.success("B??? ???n s???n ph???m th??nh c??ng", ToastObjects);
      dispatch({ type: PRODUCT_SHOW_RESET });
    }
  }, [
    dispatch,
    keyword,
    pageNumber,
    successDelete,
    successHidden,
    errorHidden,
    successShow,
    errorShow,
    categoryFilterAdmin,
    sortBy,
    limit,
    status
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      history.push(`/admin/products?q=${keywordSearch}`);
    } else {
      history.push("/admin/products");
    }
  };
  return (
    <section className="content-main">
      <Toast />
      <div className="content-header">
        <h2 className="content-title">S???n ph???m</h2>
        <div>
          <Link to="/admin/addProduct" className="btn btn-primary btn-size">
            Th??m s???n ph???m
          </Link>
        </div>
      </div>
      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row">
            <h5 className="my-2 title__top">T???ng s???n ph???m:&nbsp;{total}</h5>
            <form onSubmit={submitHandler} className="col-lg-3 col-md-6">
              <input
                type="search"
                placeholder="T??m ki???m s???n ph???m"
                className="form-control"
                value={keywordSearch}
                onChange={(e) => setKeywordSearch(e.target.value)}
              />
            </form>

            <CategoryFilterAdmin
              category={category}
              categoryFilterAdmin={categoryFilterAdmin}
              setCategoryFilterAdmin={setCategoryFilterAdmin}
            />
            <SortBy sortBy={sortBy} setSortBy={setSortBy} />
            <div className="col-lg-2 col-6 col-md-3 mx-2">
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value={"all"}>T???t c??? tr???ng th??i</option>
                <option value={"disabled"}>??ang b??? ???n</option>
                <option value={"notDisabled"}>Ch??a b??? ???n</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                <option value={"10"}>10 s???n ph???m</option>
                <option value={"20"}>20 s???n ph???m</option>
                <option value={"30"}>30 s???n ph???m</option>
                <option value={"40"}>40 s???n ph???m</option>
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          <>{errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}</>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <table className="table">
                <thead className="pc-header">
                  <tr className="text-center">
                    <th>Stt</th>
                    <th>H??nh ???nh</th>
                    <th>T??n s???n ph???m</th>
                    <th>????nh gi??</th>
                    <th>Th??? lo???i</th>
                    <th>????n gi??</th>
                    <th>Kho</th>
                    <th>???? b??n</th>
                    <th className="text-end">Thao t??c</th>
                  </tr>
                </thead>
                <tbody>
                  <Product products={products} preIndex={(page - 1) * limit} />
                </tbody>
              </table>
            </>
          )}
          {/* PaginationAdmin */}
          <PaginationAdmin page={page} pages={pages} keyword={keyword ? keyword : ""} basePath={"/admin/products"} />
        </div>
      </div>
    </section>
  );
});

export default MainProducts;
