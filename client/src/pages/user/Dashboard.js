import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { AuthContext } from '../../context/Auth'

const Dashboard = () => {
  
  const { Auth } = useContext(AuthContext);

  return (
    <Layout>
    <div className="container-fluid m-3 p-3">
        <div className="row">

          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
              <div className="card w-75 p-3">
                  <h3> {Auth?.user?.name}</h3>
                  <h3> {Auth?.user?.email}</h3>
                  <h3> {Auth?.user?.address}</h3>
              </div>
          </div>

        </div>
    </div>
</Layout>
  )
}

export default Dashboard
