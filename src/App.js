import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddOrder from './components/Dashboard/AddOrder';
import Clients from './components/Dashboard/Clients';
import Dashboard from './components/Dashboard/Dashboard';
import ManageOrders from './components/Dashboard/ManageOrders';
import MyOrders from './components/Dashboard/MyOrders';
import OrderReview from './components/Dashboard/OrderReview';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import RequireAuth from './components/Login/RequireAuth';
import RequireAdmin from './components/Login/RequireAdmin';
import SignUp from './components/Login/SignUp';
import Purchase from './components/Purchase/Purchase';
import Navbar from './components/Shared/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfile from './components/MyProfile/MyProfile';


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/purchase/:id' element={<RequireAuth>
          <Purchase></Purchase>
        </RequireAuth>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/myProfile' element={<RequireAuth><MyProfile></MyProfile></RequireAuth>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyOrders></MyOrders>}></Route>
          <Route path='review' element={<OrderReview></OrderReview>}></Route>
          <Route path='clients' element={<RequireAdmin><Clients></Clients></RequireAdmin>}></Route>
          <Route path='addOrder' element={<RequireAuth><AddOrder></AddOrder></RequireAuth>}></Route>
          <Route path='manageDoctors' element={<RequireAuth><ManageOrders></ManageOrders></RequireAuth>}></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
