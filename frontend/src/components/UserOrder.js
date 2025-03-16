import { useEffect, useState } from "react";
import '../styles/UserOrder.css'; // Importing the updated CSS

function UserOrder() {
  const [orders, setOrders] = useState([]); // Ensure orders is always an array
  const userId = localStorage.getItem("userId"); // Get user ID from localStorage

  // Fetch orders for the user on component mount
  useEffect(() => {
    if (userId) {
      fetch(`https://canteen-managent-backend.onrender.com/orders/getorders/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          // Make sure 'data.orders' is not undefined before setting state
          if (data && Array.isArray(data.orders)) {
            setOrders(data.orders);
          } else {
            setOrders([]); // Fallback to an empty array if 'data.orders' is invalid
          }
        })
        .catch((err) => console.error("Error:", err));
    } else {
      console.error("User ID not found in localStorage");
    }
  }, [userId]);

  return (
    <div className="order-container">
      <h1 className="order-title">Your Orders</h1>
      {orders && orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h3 className="order-id">Order #{order._id}</h3>
              <p className={`order-status ${order.status.toLowerCase()}`}>
                {order.status}
              </p>
            </div>
            <div className="order-details">
              <p className="order-total-price">Total Price: Rs. {order.totalPrice}</p>
              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={item.itemId} className="order-item">
                    <span className="item-name">{item.name}</span> - 
                    <span className="item-price">Rs. {item.price}</span> x 
                    <span className="item-quantity">{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserOrder;
