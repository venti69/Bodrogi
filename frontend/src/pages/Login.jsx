import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');

    const bejelentkezes = (e) => {
        e.preventDefault();
        const dolgoz = async () => {
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, jelszo }),
                });

                const valasz = await response.json();

                if (response.ok) {
                    window.alert(valasz.msg);
                    localStorage.setItem('isLoggedIn', 1);
                    if (valasz.isAdmin === true) {
                        localStorage.setItem('isAdmin', 1);
                    } else {
                        localStorage.setItem('isAdmin', 0);
                    }
                    window.location.href = '/';
                } else {
                    window.alert(valasz.msg);
                }
            } catch (error) {
                console.log(`Valami hiba történt: ${error.message}`);
            }
        };

        dolgoz();
    };

    return (
        <>
            <Navbar />
            <div className="login-kontener">
                <h1>Bejelentkezés</h1>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>E-mail:</td>
                                <td>
                                    <input
                                        type="email"
                                        id="email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Jelszó:</td>
                                <td>
                                    <input
                                        type="password"
                                        id="jelszo"
                                        onChange={(e) =>
                                            setJelszo(e.target.value)
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={bejelentkezes}>
                                        Bejelentkezés
                                    </button>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <p>
                    Nincs még regisztrálva:{' '}
                    <Link to="/register">Regisztráció</Link>
                </p>
            </div>
        </>
    );
};

export default Login;
