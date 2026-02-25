import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/cart/");
      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Cart</h2>

      {cartItems.length === 0 && <p>Cart is empty</p>}

      {cartItems.map((item) => (
        <div key={item.id} className="p-3">
          <img
            src={`http://127.0.0.1:8000${item.product.image}`}
            width="100"
            alt={item.product.name}
          />
          <h5>{item.product.name}</h5>
          <p>₹ {item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button
            className="btn btn-warning"
            onClick={() =>
              navigate(`/order/${item.product.id}`)
            }
          >
            Order
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
