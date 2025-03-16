import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faBagShopping,
  // faSheetPlastic
} from "@fortawesome/free-solid-svg-icons";
import "../styles/UserDashboard.css"; // Link to the unique styling file
import MarqueeText from './MarqueeText';
import { useState } from "react";
import OrderMt from "./OrderMt";
import InventoryMt from "./InventoryMt";
// import Reports from "./Reports";


function AdminDashboard() {

    const [activeComponent,setActiveComponent] = useState("inventoryManagement");

    const renderComponent = () =>{
        switch (activeComponent) {
            case "orderManagement":
                return <OrderMt/>;
            case "inventoryManagement":
                return <InventoryMt/>;
            // case "reports":
            //     return <Reports/>;
            default:
                return <OrderMt/>;
        }
    }

  
  return (<>
  <MarqueeText/>
    <div className="unique-navbar">

      <Link className="nav-item" onClick={()=>setActiveComponent("inventoryManagement")}>
        <FontAwesomeIcon icon={faBowlFood} className="nav-icon" />
        <span className="nav-label">Inventory Management</span>
      </Link>

      <Link className="nav-item" onClick={()=>setActiveComponent("orderManagement")}>
        <FontAwesomeIcon icon={faBagShopping} className="nav-icon" />
        <span className="nav-label">Orders Management</span>
      </Link>

      {/* <Link className="nav-item" onClick={()=>setActiveComponent("reports")}>
        <FontAwesomeIcon icon={faSheetPlastic} className="nav-icon" />
        <span className="nav-label">Reports</span>
      </Link> */}
    </div>
    <div className="div-additem">
        <Link to='/additem' className="additem" >Add Item</Link>
    </div>
    {renderComponent()}
    </>);
}

export default AdminDashboard;
