import { useState } from 'react';
import Navbar from '../components/Navbar';

const Register = () => {
    const [nev, setNev] = useState('');
    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');

    const regisztralas = (e) => {
        e.preventDefault();
        const dolgoz = async () => {
            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nev, email, jelszo }),
                });

                const valasz = await response.json();

                if (response.ok) {
                    window.alert(valasz.msg);
                    window.location.href = '/login';
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
            <div className="regiszter-kontener">
                <h1>Regisztráció</h1>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>Név:</td>
                                <td>
                                    <input
                                        type="text"
                                        id="nev"
                                        onChange={(e) => setNev(e.target.value)}
                                    />
                                </td>
                            </tr>
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
                                <td>Jelszó: </td>
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
                                    <button onClick={regisztralas}>
                                        Regisztráció
                                    </button>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
};

export default Register;
