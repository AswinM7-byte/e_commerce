import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function View() {

  const { id } = useParams([]);  // 🔥 get ID from URL
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/product/${id}/`
      );
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div>
      <img src={`http://127.0.0.1:8000${product.image}`} alt="" />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>₹ {product.price}</p>
    </div>
  );
}

export default View;
