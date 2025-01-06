import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.setItem('isAdmin', false);
        localStorage.removeItem('reservedBooks');
        navigate('/login');
    }, []);
    return <div></div>;
};

export default Logout;
