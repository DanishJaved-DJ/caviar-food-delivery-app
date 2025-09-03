import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard.jsx'

import DeliveryBoy from '../components/DeliveryBoy.jsx'
import { FaUtensils } from "react-icons/fa";
import OwnerDashboard from '../components/OwnerDashboard.jsx';
import Footer from '../components/Footer.jsx';
function Home() {
    const {userData}=useSelector(state=>state.user)
  return (
    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
      {userData?.role=="user" && <UserDashboard/>}
       {userData?.role=="owner" && <OwnerDashboard/>}
         {userData?.role=="deliveryBoy" && <DeliveryBoy/>}
      <Footer/>   
    </div>
  )
}

export default Home
