import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App.jsx'
import { useDispatch } from 'react-redux'
import { setAllShops, setUserData } from '../redux/userSlice.js'

function getAllShops() {
const dispatch=useDispatch()
useEffect(()=>{
 const fetchShops=async ()=>{
    const result=await axios.get(`${serverUrl}/api/shop/getall`,{withCredentials:true})
    if(result){
     dispatch(setAllShops(result.data))
    }
    
 }
 fetchShops() 
},[])
}

export default getAllShops
