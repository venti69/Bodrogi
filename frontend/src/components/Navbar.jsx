import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { szamlalo } = useContext(CartContext);

    const [isAdmin, setIsAdmin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const ia = Boolean(Number(localStorage.getItem('isAdmin')));
        const is = Boolean(Number(localStorage.getItem('isLoggedIn')));

        setIsAdmin(ia);
        setIsLoggedIn(is);
    }, []);

    return (
        <div className="navbar-kontener">
            <div className="navbar-bal-kontener">
                <Link to="/">Book.Store</Link>
            </div>
            <div className="navbar-jobb-kontener">
                <Link to="/books">Könyvek</Link>
                <div className="navbar-books">
                    <div className="navbar-kor">
                        <span className="navbar-cart-number">{szamlalo}</span>
                        <Link to="/cart">Kosár</Link>
                    </div>
                </div>
                <div className="navbar-jobb-auth-kontener">
                    {isLoggedIn ? (
                        isAdmin ? (
                            <>
                                <Link to="/logout">Kijelentkezés</Link>
                                <Link to="http://localhost:5000">Szerver</Link>
                            </>
                        ) : (
                            <Link to="/logout">Kijelentkezés</Link>
                        )
                    ) : (
                        <>
                            <Link to="/register">Regisztráció</Link>
                            <Link to="/login">Bejelentkezés</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
