import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { AuthContext } from "../../context/Auth";
import moment from "moment";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { Auth } = useContext(AuthContext);

  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/auth/orders`
      );
      console.log(data?.orders);

      setOrders(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, [Auth?.token]);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Your Orders</h1>
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
                          <td>{o.status}</td>
                          <td>{o.buyer.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                          <td>{o.products.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((product) => (
                        <div
                          className="row m-2 card flex-row"
                          key={product?._id}
                        >
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

export default Orders;
