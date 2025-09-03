import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App.jsx'
import { useDispatch, useSelector } from 'react-redux'
import {  setItemsOfCity, setShopsOfCity, setUserData } from '../redux/userSlice.js'

function getItemsByCity() {
const dispatch=useDispatch()
const {city,userData}=useSelector(state=>state.user)
useEffect(()=>{
if(userData?.role=="user"){
const fetchItems=async ()=>{
    const result=await axios.get(`${serverUrl}/api/item/getitemsbycity/${city}`,{withCredentials:true})
     dispatch(setItemsOfCity(result.data))
     console.log(result.data)
 }
 fetchItems() 
}
 
},[city,userData])
}

export default getItemsByCity

