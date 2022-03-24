import React, {useContext, useState} from 'react'
import {GlobalState} from'../../GlobalState'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import {Link} from 'react-router-dom'

function Header (){
  const state = useContext (GlobalState)
  return (

    <header>
      <div class="box">
      <div className="menu">
        <img scr={Menu} alt=""width="30" />
      </div>

     <div className="logo">
        <h1> 
          <Link to="/">4H1A Petshop</Link>
        </h1>
     </div>

     <ul>
       <li><Link to="/">Products</Link></li>
       <li><Link to="/login">Login - Register</Link></li>

       <li>
         <img scr={Close} alt=""width="30"classname="menu"/>
       </li>


     </ul>

     <div className="cart-icon">
       <span>0</span>
       <Link to="/cart">
         <img src={Cart} alt=""width="30" />
       </Link>
     </div>
      </div>





    </header>
  )
}

export default Header