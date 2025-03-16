import { useState, useEffect } from "react";
import "../styles/OrderMt.css";

function OrderMt() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure the token is passed in headers
        const response = await fetch("https://canteen-managent-backend.onrender.com/orders/allOrders", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setOrders(data.orders); // Set the fetched orders into state
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://canteen-managent-backend.onrender.com/orders/updateOrderStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, status }),
      });

      const data = await response.json();
      if (data.success) {
        // Update the order status in the frontend without fetching all orders again
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: data.order.status } : order
          )
        );
      } else {
        console.error("Failed to update status:", data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId.name} ({order.userId.email})</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} - {item.quantity} x {item.price}
                    </div>
                  ))}
                </td>
                <td>{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Pending" && (
                    <>
                      <button onClick={() => handleStatusChange(order._id, "Order Ready")}>
                        Mark as Ready
                      </button>{" "}
                      <button onClick={() => handleStatusChange(order._id, "Cancelled")}>
                        Cancel Order
                      </button>
                    </>
                  )}
                  {order.status === "Order Ready" && (
                    <span>Order is Ready</span>
                  )}
                  {order.status === "Cancelled" && (
                    <span>Order Cancelled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderMt;
