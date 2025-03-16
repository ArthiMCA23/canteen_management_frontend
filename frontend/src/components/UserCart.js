import { useEffect, useState } from "react";
import '../styles/UserCart.css'; // Importing the CSS for styling

function UserCart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId"); // Get user ID from localStorage

  useEffect(() => {
    fetch(`https://canteen-managent-backend.onrender.com/cart/getcart/${userId}`)
      .then((res) => res.json())
      .then((data) => setCartItems(data.cart.items))
      .catch((err) => console.error("Error:", err));
  }, [userId]);

  const handleRemoveItem = (itemId) => {
    fetch(`https://canteen-managent-backend.onrender.com/cart/removeitem`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, itemId }), // Send userId and itemId
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Item removed from cart") {
          // Remove the item from the UI
          setCartItems(cartItems.filter((item) => item.itemId !== itemId));
        } else {
          alert("Failed to remove item from cart");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleCheckout = () => {
    fetch("https://canteen-managent-backend.onrender.com/cart/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        items: cartItems, // Send the cart items
        totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0), // Total price of the cart
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Checkout successful") {
          alert("Checkout successful! Proceeding to payment.");
          // You can add code to redirect to a payment gateway here
        } else {
          alert("Checkout failed! Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error during checkout:", err);
        alert("An error occurred. Please try again.");
      });
  };


  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is currently empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.itemId} className="cart-item">
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">Rs. {item.price}</p>
              <p className="item-quantity">Qty: {item.quantity}</p>
            </div>
            <button className="remove-item-btn" onClick={() => handleRemoveItem(item.itemId)}>Remove</button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3 className="summary-title">Cart Summary</h3>
          <div className="total-price">
            <span>Total Price:</span>
            <span>Rs. {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default UserCart;
