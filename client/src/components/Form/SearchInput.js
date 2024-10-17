import { useContext } from "react";
import { SearchContext } from "../../context/search.js";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


const SearchInput = () => {
  const { values, setValues } = useContext(SearchContext);
  const navigate = useNavigate();


  const handleSubmit = async (e)=>{
        e.preventDefault();
        try {                
        const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-search/${values.keyword}`);        
        setValues({...values, results: data.products})
        navigate("/search")

        } catch (error) {
            console.log(error);           
        }
  }
  

  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value = {values.keyword}
          onChange={(e)=>{setValues({...values, keyword: e.target.value})}}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchInput;
