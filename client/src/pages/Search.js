import React from 'react'
import Layout from '../components/layout/Layout'
import { useContext } from 'react'
import { SearchContext } from '../context/search'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate();
    const { values } = useContext(SearchContext) 
    console.log(values);
    
  return (
    <Layout title = {'search-results'}>
        <div className="container">
            <div className="text-center">
                <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? "No Results found" : `${values.results.length} results found`}</h6>
            </div>
            <div className="d-flex flex-wrap">
              {values?.results.map((product) => (
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
                    <button className="btn btn-primary ms-1"  onClick={()=>{navigate(`/product/${product.slug}`)}}>
                      More Details
                    </button>

                    <button className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </Layout>
  )
}

export default Search;