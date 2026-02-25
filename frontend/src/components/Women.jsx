import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Women({ searchTerm }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/product/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  //Search Filtering
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  //Category Filtering
  const categories = ["dress"];
  

  const handleAddToCart = async (productId) => {
  try {
    await axios.post("http://127.0.0.1:8000/api/cart/", {
      product_id: productId,
    
    });

    alert("Product added to cart!");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

  return (
    <div className="container mt-4">

      {categories.map((category) => {
        const categoryProducts = filteredProducts.filter(
          (p) => p.category?.toLowerCase() === category
        );

        if (categoryProducts.length === 0) return null;

        return (
          <div className="row mb-5" key={category}>
            <h2 className="text-center text-capitalize mb-4">
              {category} Collections
            </h2>

            {categoryProducts.map((pro) => (
              <div className="col-md-3 mb-3 d-flex justify-content-center" key={pro.id}>
                <div className="card" style={{ width: "12rem" }}>
                  {pro.image && (
                    <img src={`http://127.0.0.1:8000${pro.image}`} className="card-img-top" alt={pro.name}/>
                  )}

                  <div className="card-body">
                    <h5 className="card-title">{pro.name}</h5>
                    <p className="card-text">{pro.description}</p>
                    <p className="card-text">₹ {pro.price}</p>
                    <p className="card-text">Stock: {pro.stock}</p>

                    <Link to={`/view/${pro.id}`} className="btn btn-primary btn-sm">View</Link>

                    <button className="btn btn-warning" style={{height: "31px",width:"110px"}} onClick={() => handleAddToCart(pro.id)}>Add To Cart</button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}

    </div>
  );
}

export default Women;
