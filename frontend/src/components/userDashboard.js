import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faCartShopping,
  faBagShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/UserDashboard.css"; // Link to the unique styling file
import MarqueeText from './MarqueeText';
import { useState } from "react";
import UserMenu from "./UserMenu";
import UserCart from "./UserCart";
import UserOrder from "./UserOrder";
import UserProfile from "./UserProfile";

function UserDashboard() {
    const [activeComponent,setActiveComponent] = useState("menu");

    const renderComponent = () =>{
        switch (activeComponent) {
            case "menu":
                return <UserMenu/>;
            case "cart":
                return <UserCart/>;
            case "orders":
                return <UserOrder/>;
            case "profile":
                return <UserProfile/>;
        
            default:
                return <UserMenu/>;
        }
    }

  return (<>
  <MarqueeText/>
    <div className="unique-navbar">

      <Link className="nav-item" onClick={()=>setActiveComponent("menu")}>
        <FontAwesomeIcon icon={faBowlFood} className="nav-icon" />
        <span className="nav-label">Menu</span>
      </Link>

      <Link className="nav-item" onClick={()=>setActiveComponent("cart")}>
        <FontAwesomeIcon icon={faCartShopping} className="nav-icon" />
        <span className="nav-label">Cart</span>
      </Link>

      <Link className="nav-item" onClick={()=>setActiveComponent("orders")}>
        <FontAwesomeIcon icon={faBagShopping} className="nav-icon" />
        <span className="nav-label">Orders</span>
      </Link>

      <Link className="nav-item" onClick={()=>setActiveComponent("profile")}>
        <FontAwesomeIcon icon={faUser} className="nav-icon" />
        <span className="nav-label">Profile</span>
      </Link>
    </div>
    {renderComponent()}
    </>);
}

export default UserDashboard;
