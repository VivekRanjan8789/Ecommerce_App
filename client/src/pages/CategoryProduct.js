import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params?.slug]);

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found</h6>

        <div className="row">
          <div className="col-md-9">
            <div className="d-flex flex-wrap">
              {products.map((product) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={product._id}
                >
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`}
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      {product.description.substring(0, 60)}
                    </p>
                    <p className="card-text">$ {product.price}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => {
                        navigate(`/product/${product.slug}`);
                      }}
                    >
                      More Details
                    </button>

                    <button className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* loadmore button */}
            {/* {products?.length < countProduct && (
              <button
                className="btn btn-warning m-3 p-3"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading? "loading..." : "load more"}
              </button>
            )} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
