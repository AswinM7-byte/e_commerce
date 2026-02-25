import { useEffect, useState } from "react";
import axios from "axios";

function OrdersList() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/order/")
      .then(res => {
        console.log("Orders:", res.data);
        setOrders(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map(order => (
        <div key={order.id} className="mb-4 border p-3">

          {order.product?.image && (
            <img
              src={`http://127.0.0.1:8000${order.product.image}`}
              alt={order.product.name}
              width="100"
            />
          )}

          <p><strong>Customer:</strong> {order.customer_name}</p>
          <p><strong>Mobile:</strong> {order.mobile_number}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Payment:</strong> {order.payment_method}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>

        </div>
      ))}
    </div>
  );
}

export default OrdersList;