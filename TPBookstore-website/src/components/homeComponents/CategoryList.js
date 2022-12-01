import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listCategory } from "../../Redux/Actions/categoryActions";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;
  let categoryParent = [];
  if (category.length > 0) {
    category?.map((item) => categoryParent.push(item.parent_category));
    categoryParent = Array.from(new Set(categoryParent));
  }

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  return (
    <div className="col-md-1 icon__menu-product ">
      <img className="icon__image" src="https://cdn-icons-png.flaticon.com/128/2948/2948037.png" />
      <div className="list-category-header">
        <div className="row py-2">
          <h3 className="mx-4 py-2">DANH MỤC SẢN PHẨM</h3>
          {categoryParent.map((categoryParent) => (
            <>
              <div className="col-lg-3 col-md-6 py-1 list-category-header-item">
                <span className="list-category-header-item__title">{categoryParent}</span>
                {category?.map((category) =>
                  category.parent_category === categoryParent ? (
                    <Link to={`/category/${category.slug}`}>
                      <p className="list-category-header-item__link">{category.name}</p>
                    </Link>
                  ) : (
                    <></>
                  )
                )}
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
