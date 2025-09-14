import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import getCurrentUser from './hooks/getCurrentUser.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import getCity from './hooks/getCity.jsx'
import getAllShops from './hooks/getAllShops.jsx'
import EditShop from './pages/EditShop.jsx'
import { setShop, setSocket } from './redux/userSlice'
import getCurrentShop from './hooks/getCurrentShop.jsx'

import AddItem from './pages/AddItem.jsx'
import EditItem from './pages/EditItem.jsx'
import getShopsByCity from './hooks/getShopsByCity.jsx'
import getItemsByCity from './hooks/getItemsByCity.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderPlaced from './pages/OrderPlaced.jsx'
import MyOrders from './pages/MyOrders.jsx'
import getOwnerPendingOrders from './hooks/getOwnerPendingOrders.jsx'
import PendingOrders from './pages/PendingOrders.jsx'
import { io } from 'socket.io-client'
import updateLocation from './hooks/updateLocation.jsx'
import TrackOrderPage from './pages/TrackOrderPage.jsx'
import MyDeliveredOrders from './pages/MyDeliveredOrders.jsx'
import ShopItems from './pages/ShopItems.jsx'
<<<<<<< HEAD
export const serverUrl= "http://localhost:8000"
=======
export const serverUrl="https://caviar-food-delivery-app.onrender.com"
>>>>>>> 3d1cbd5f7a857964ed5fb57c8dba631fafca0a58

function App() {
  const {userData,allShops,socket}=useSelector(state=>state.user)
 
getCurrentUser();
getCity()
getCurrentShop();
getShopsByCity();
getItemsByCity();
getOwnerPendingOrders()
updateLocation()
  
  const dispatch=useDispatch()
  useEffect(() => {
  const socketInstance = io(serverUrl, { withCredentials: true });
  dispatch(setSocket(socketInstance));

  socketInstance.on("connect", () => {
    console.log("Socket connected:", socketInstance.id);
    if (userData?._id) {
      socketInstance.emit("identify", { userId: userData._id });
    }
  });


  return () => {
    socketInstance.disconnect();
  };
}, [userData?._id]);

  return (
   <Routes>
    <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
    <Route path='/signin' element={!userData?<SignIn/>:<Navigate to={"/"}/>}/>
    <Route path='/forgot-password' element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
    <Route path='/' element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
     <Route path='/editshop' element={userData?<EditShop/>:<Navigate to={"/signin"}/>}/>
      <Route path='/additem' element={userData?<AddItem/>:<Navigate to={"/signin"}/>}/>
       <Route path='/edititem/:itemId' element={userData?<EditItem/>:<Navigate to={"/signin"}/>}/>
     <Route path='/cart' element={userData?<CartPage/>:<Navigate to={"/signin"}/>}/>
     <Route path='/checkout' element={userData?<CheckoutPage/>:<Navigate to={"/signin"}/>}/>
      <Route path='/order-placed' element={userData?<OrderPlaced/>:<Navigate to={"/signin"}/>}/>
      <Route path='/my-orders' element={userData?<MyOrders/>:<Navigate to={"/signin"}/>}/>
      <Route path='/pending-orders' element={userData?<PendingOrders/>:<Navigate to={"/signin"}/>}/>
        <Route path='/my-delivered-orders' element={userData?<MyDeliveredOrders/>:<Navigate to={"/signin"}/>}/>
      <Route path='/track-order/:orderId' element={userData?<TrackOrderPage/>:<Navigate to={"/signin"}/>}/>
      <Route path='/shop-items/:shopId' element={userData?<ShopItems/>:<Navigate to={"/signin"}/>}/>
   </Routes>
  )
}

export default App
