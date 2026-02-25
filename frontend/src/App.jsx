import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Men from "./components/Men";
import View from "./components/View";
import Women from "./components/Women";
import OrdersList from "./components/OrdersList";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      {/* Show Navbar only if logged in */}
      {isLoggedIn && (
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      <Routes>

        {/* Public Route */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProductList searchTerm={searchTerm} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/men"
          element={
            <ProtectedRoute>
              <Men />
            </ProtectedRoute>
          }
        />

        <Route
          path="/women"
          element={
            <ProtectedRoute>
              <Women />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;