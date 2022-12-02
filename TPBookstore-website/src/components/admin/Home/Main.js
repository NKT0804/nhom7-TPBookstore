import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";

const Main = () => {


  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Bảng điều khiển </h2>
        </div>
        {/* Top Total */}
        <TopTotal />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
        </div>
      </section>
    </>
  );
};

export default Main;
