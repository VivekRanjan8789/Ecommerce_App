import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/prices";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesChecked, setCategoriesChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [countProduct, setCountProduct] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllCategory();
  },[])

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/product-list/${page}`
      );
      setProducts(data.products)
      console.log("All products are: ", data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // load more
  useEffect(()=>{
    if(page===1) return;
    loadmore();
  },[page])

  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`)
      setLoading(false);
      setProducts([...products, ...data.products])     
    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(() => {
     if(!categoriesChecked.length && !radio.length) getAllProducts();
  }, [categoriesChecked.length, radio.length]);


  // count total products
  const getCountProduct = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/product/count-product`)
        setCountProduct( data?.total)        
      } catch (error) {
         console.log(error);        
      }
  }

    useEffect(()=>{
      getCountProduct()
    },[])



   // handle filter by category using checked -> true or false, and id of checkbox we clicked
   const handleFilter = (checked, id) => {    
        let all = [...categoriesChecked];
        if(checked){
          all.push(id)
        }
        else{
          all = all.filter((c)=>{
            return c!==id
          })
        }
        setCategoriesChecked(all);
   }

   // filtering products on basis of category and price range by hitting backend
   const getFilteredProducts = async () => {
    try {
      console.log("before filter");
      
      const { data } = await axios.post(`${process.env.REACT_APP_API}/product/filter-product`, {categoriesChecked, radio})
      console.log("after filter");
      
      console.log(data);
      
      setProducts(data?.products) ;

    } catch (error) {
      console.log("something went wrong", error); 
    }
   }

   useEffect(()=>{
      if(categoriesChecked.length || radio.length) getFilteredProducts();
   },[categoriesChecked, radio])

  return (
    <div>
      <Layout title={"All Products - Best Offers"}>
        <div className="row mt-3">
          <div className="col-md-2">
            {/* filter by category */}
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column ms-4">
              {categories.map((c) => {
                return (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                );
              })}
            </div>

            {/* filter by price */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className=" ms-4">
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                className="d-flex flex-column"
              >
                {prices.map((p) => {
                  return (
                    <Radio key={p.id} value={p.array}>
                      {p.name}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>

            <button
              className="btn btn-danger mt-3 ms-4 btn-block"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
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

                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem("cart",JSON.stringify([...cart, product]))
                        toast.success("Item Added to Cart")
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* loadmore button */}
            {products?.length < countProduct && (
              <button
                className="btn btn-warning m-3 p-3"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading..." : "load more"}
              </button>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
