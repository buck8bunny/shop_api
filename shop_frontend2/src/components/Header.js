import React from 'react';
import { Link } from 'react-router-dom';


const Header = ({ user, onLogout }) => {
    const handleLogout = () => {
        if (onLogout) {
          onLogout(); // Выполнение функции выхода
          window.location.reload(); // Обновление страницы
        }
      };
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand text-primary fw-bold">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              
              <li className="nav-item">
                <Link to="/items" className="nav-link">Items</Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link to="/orders" className="nav-link">Orders</Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">Profile</Link>
                  </li>
                
                  <li className="nav-item">
                    <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
