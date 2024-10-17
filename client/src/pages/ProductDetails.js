import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);

  //initial product details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  // fetch single product using slug
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (product?._id) getSimilarProducts();
  }, [product]);

  const getSimilarProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-similar/${product?._id}/${product?.category?._id}`
      );
      console.log(data.products);
      setSimilarProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6">
          <img
            src={` http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product?.name}
            height="400"
            width="300"
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center mt-3">Product Details</h1>

          <div className="details mt-5">
            <h6 className=".text-secondary">Name: {product?.name}</h6>
            <h6>Description: {product?.description}</h6>
            <h6>Price: {product?.price}</h6>
            <h6>Category: {product?.category?.name}</h6>
            <button className="btn btn-primary ms-1 mt-3">ADD TO CART</button>
          </div>
        </div>
      </div>
      <div className="row container">
            <h4>Similar Products</h4>
            {similarProducts.length<1 && (<p className="text-center">No similar Products Found</p>)}
            <div className="d-flex flex-wrap">
            {similarProducts.map((product) => (
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

                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
                </div>
            ))}
            </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
