import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar-kontener">
            <div className="navbar-bal-kontener">
                <Link to="/">Book.Store</Link>
            </div>
            <div className="navbar-jobb-kontener">
                <Link to="/books">Könyvek</Link>
                <Link to="/cart">Kosár</Link>
                <div className="navbar-jobb-auth-kontener">
                    <Link to="/register">Regisztráció</Link>
                    <Link to="/login">Bejelentkezés</Link>
                    <Link to="/logout">Kijelentkezés</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
