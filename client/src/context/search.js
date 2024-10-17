import React from 'react'
import { useState, createContext } from 'react'

const SearchContext = createContext();

const SearchProvider = ({children}) => {
   
    // keyword will be only used for storing the keyword that we will type in searchbox
    // results will store the fetched data that we will get from the db after word filter
    const [values, setValues] = useState({
        keyword: "",
        results: []
    })

  return (
    <SearchContext.Provider value= {{values, setValues}}>
        {children}
    </SearchContext.Provider>
  )
}

export {SearchProvider, SearchContext}