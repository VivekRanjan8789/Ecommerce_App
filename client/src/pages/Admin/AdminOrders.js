import React, { useEffect, useState, useContext } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import moment from "moment";
import { Select } from "antd";
import axios from "axios";
import { AuthContext } from "../../context/Auth";

const { Option }  = Select

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);

  const [orders, setOrders] = useState([]);
  const { Auth } = useContext(AuthContext);

  const handleStatusChange = async (value, id) => {
    try {
        console.log("value is", value);
        console.log("id is: ", id);
        
        const { data } = await axios.put(`${process.env.REACT_APP_API}/auth/order-status/${id}`, { status: value });
        console.log("updated status order is: ",data);
        
    } catch (error) {
        console.log(error);
        
    }       
  }

  const allOrders = async () => {
    try {
      console.log("all");
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/auth/all-orders`
      );
      console.log("all orders are ", data?.orders);
      setOrders(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Auth?.token) allOrders();
  }, [Auth?.token]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow" key={i + 1}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <td>
                            <Select bordered={false} defaultValue={o?.status} style={{ width: 200 }} onChange={(value)=>{handleStatusChange(value, o._id)}}>
                                {
                                    status.map((s, i)=>{
                                        return (
                                            <Option key = {i} value={s}>{s}</Option>
                                        )
                                    })
                                }                              
                            </Select>
                        </td>
                        <td>{o.buyer.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((product) => (
                      <div className="row m-2 card flex-row" key={product?._id}>
                        <div className="col-md-4">
                          <img
                            src={` http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                            className="card-img-top"
                            width="200px"
                            height="200px"
                            alt={product.name}
                          />
                        </div>
                        <div className="col-md-8 p-3">
                          <p>{product.name}</p>
                          <p>{product.description}</p>
                          <p>Price ${product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
