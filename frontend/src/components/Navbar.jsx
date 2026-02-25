import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ searchTerm, setSearchTerm }){

    const handleLogout = () => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/auth";
            };
    

    return(
        <>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <form className="d-flex mx-auto pl-2" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                <button className="btn btn-warning text-white" type="submit">Search</button>
                            </form>
                        
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item "><Link className="nav-link text-white" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/orders">Orders</Link></li>
                            <li className="nav-item"><Link className="nav-link text-white" to="/cart">Cart</Link></li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/men">Men</Link></li>
                                    <li><Link className="dropdown-item" to="/women">Women</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
  <button className="btn btn-danger ms-3" onClick={handleLogout}>
    Logout
  </button>
</li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default Navbar