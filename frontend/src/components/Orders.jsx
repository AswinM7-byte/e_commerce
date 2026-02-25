import { useLocation } from "react-router-dom";
import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Orders() {

  const location = useLocation();
  console.log(location);  // check what data is coming from Cart

  const [formData, setFormData] = useState({
    customer_name: "",
    mobile_number: "",
    address: "",
    payment_method: "cod",
  });

  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
  axios.get(`http://127.0.0.1:8000/api/product/${id}/`)
    .then(res => setProduct(res.data))
    .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOrder = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/order/", {
        product: product.id,
        quantity: 1,
        ...formData
      });

      alert("Order was successful!");

    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <p>No product selected</p>;

  return (
    <div>
      <div className="container mt-4">

        <h2>Order Page</h2>

        <img
          src={`http://127.0.0.1:8000${product.image}`}
          width="200"
          alt={product.name}
        />

        <h4>{product.name}</h4>
        <p>₹ {product.price}</p>

        <hr />

        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <input
          type="text"
          name="mobile_number"
          placeholder="Mobile Number"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <select
          name="payment_method"
          className="form-control mb-3"
          onChange={handleChange}
        >
          <option value="upi">UPI</option>
          <option value="gpay">Google Pay</option>
          <option value="paytm">Paytm</option>
          <option value="cod">Cash On Delivery</option>
        </select>

        <button className="btn btn-success" onClick={handleOrder}>
          Proceed to Order
        </button>

      </div>
    </div>
  );
}

export default Orders;