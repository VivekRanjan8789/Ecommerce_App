import './App.css';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Policy from './pages/Policy';
import Nopage from './pages/Nopage';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import PrivateRoute from './components/Routes/private'
import Dashboard from './pages/user/Dashboard';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';

function App() {
  return (
    <div className="App">
       <Routes>
             <Route  path='/' element={ <Home />}/>
             <Route  path='/home' element={ <Home />}/>
             <Route path='register' element={ <Register />} />
             <Route path='search' element={ <Search />} />
             <Route path='product/:slug' element={ <ProductDetails /> } />   {/*concept */}
             <Route path='categories' element={ <Categories />} />
             <Route path='category/:slug' element= {<CategoryProduct /> } />
             <Route path='cart' element={<CartPage />} />

            <Route path='/dashboard' element={ <PrivateRoute />}>
                  <Route path='user' element = {<Dashboard />} />
                  <Route path ='user/profile' element = {<Profile />} />
                  <Route path = 'user/orders' element = {<Orders />} />
            </Route>

            <Route path='/dashboard' element = {<AdminRoute />}>
                  <Route path='admin' element = {<AdminDashboard />} />
                  <Route path='admin/create-category' element = {<CreateCategory />} />
                  <Route path='admin/create-product' element = {<CreateProduct />} />
                  <Route path='admin/products' element = {<Products /> } />
                  <Route path='admin/products/:slug' element = {<UpdateProduct />} />  { /*we are using slug as a params here so url will keep track of this ans we can use this using { useParams */}
                  <Route path='admin/users' element = {<Users />} />
            </Route>

             <Route path='dashboard' element ={ <Dashboard />} />
             <Route  path='/contact' element={ <Contact />}/>
             <Route  path='/about' element={ <About />}/>
             <Route  path='/policy' element={ <Policy />}/>
             <Route path='/login' element = { <Login />} />
             <Route path='/forgot-password' element={ <ForgotPassword />} />
             <Route  path='*' element={ <Nopage />}/>
             
       </Routes>
    </div>
  );
}

export default App;
