import { MdAccountCircle } from "react-icons/md";
import Profile from "../Admin/Profile";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {Logout} from '../../Redux-Toolkit/Admin_User/authSlice'
import { useNavigate} from 'react-router-dom'
function Aheader({name}) {
  let [togale,settogale]= useState(false)
  let dispatch= useDispatch()
  let navigate= useNavigate()
  return (
    <>
        <h1>{name}</h1>
        <div className="name-profile">
             <h3>Sanjay Suthar</h3>
              <button className="btn deshbord-header-btn" onClick={()=>dispatch(Logout())}>Logout</button>
              <button onClick={()=>settogale(!togale)} className="btn   profile-icon"><MdAccountCircle/></button>
              <button onClick={()=>navigate('/user/home/')}>User</button>
              {
                togale? <Profile/>:''
              }
             
        </div>
    </>
  )
}

export default Aheader
