import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {

    const [products, setProducts] = useState([]);
 
    const AllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/get-products`);
            if(data.success){
                setProducts(data.products)
                toast.success(data.message)
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong while fetching products")
        }      
    }

    useEffect(()=>{
        AllProducts()
    }, [])

    // console.log(products);
    
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">

          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1 className="text-center">All Product Lists</h1>
            <div className="d-flex flex-wrap">
             {  
                products.map((product) => (
                    <Link to = {product.slug} key={product._id} className="product-link" >
                        <div className="card m-2" style={{width: '18rem'}}>
                            <img className="card-img-top" src={`${process.env.REACT_APP_API}/product/product-photo/${product._id}`} alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </Link>
                ))
             }
             </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Products;
