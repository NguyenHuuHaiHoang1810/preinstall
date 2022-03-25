import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import Logos from "./icon/logos.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.islogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };
  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu" onClick={()=> setMenu(!menu)}>
        <img scr={Menu} alt="JustaMenu" width="30" />
      </div>

      <div className="logo">
        <h1>
          <img src={Logos} width="100"/>
          <Link to="/">{isAdmin ? 'AdminResource' : '4H1A-Petshop'}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? 'Products' : 'Have a good time!'}</Link>
        </li>
        {isAdmin && adminRouter()}
        {
          isLogged ? loggedRouter() : <li><Link to="/login">Login - Register</Link></li>
        }
        <li onClick={()=>setMenu(!menu)}>
          <img scr={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

     {
       isAdmin ? ''
       :<div className="cart-icon">
       <span>{cart.length}</span>
       <Link to="/cart">
         <img src={Cart} width="25" />
       </Link>
     </div>
     }

       <form class="form-inline my-2 my-lg-0">
           <input class="form-control mr-sm-2" type="search" placeholder="Bạn muốn tìm gì ?" aria-label="Search"/>
           <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Tìm kiếm</button>
        </form>


    </header>
  );
}

export default Header;
