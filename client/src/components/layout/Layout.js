import React from 'react'
import Header from './Header'
import Footer from './Footer'
import  { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
        <main style = {{minHeight: "70vh"}}>
          {children}
        </main>
        <Toaster />
      <Footer />
    </>
  )
}

export default Layout
