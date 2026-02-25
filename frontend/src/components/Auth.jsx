import { useState } from "react";
import axios from "axios";

function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

  const url = isLogin
    ? "http://127.0.0.1:8000/api/login/"
    : "http://127.0.0.1:8000/api/register/";

  try {
    const res = await axios.post(url, formData);
    alert(res.data.message);

    if (isLogin) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    }

  } catch (error) {
    console.log(error.response?.data);
    alert("Invalid credentials");
  }
};

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>

      <h2 className="text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="form-control mb-2"
        onChange={handleChange}
      />

      {!isLogin && (
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={handleChange}
        />
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p className="text-center mt-3">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          style={{ cursor: "pointer", color: "blue", marginLeft: "5px" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>

    </div>
  );
}

export default Auth;