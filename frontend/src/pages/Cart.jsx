import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const user = JSON.parse(localStorage.getItem('user'));
    const { setSzamlalo } = useContext(CartContext);
    const [osszeg, setOsszeg] = useState(0);
    const [adatok, setAdatok] = useState([]);
    let tomb = JSON.parse(localStorage.getItem('reservedBooks')) || [];

    useEffect(() => {
        let vegosszeg = 0;

        for (let i = 0; i < tomb.length; i++) {
            vegosszeg += tomb[i].konyv.ar * tomb[i].db;
        }

        setAdatok(tomb);
        setOsszeg(vegosszeg);
    }, []);

    function novel(index) {
        let vegosszeg = 0;
        let tempT = [];

        for (let i = 0; i < adatok.length; i++) {
            if (i === index) {
                tempT[i] = { konyv: adatok[i].konyv, db: adatok[i].db + 1 };
                vegosszeg += adatok[i].konyv.ar * (adatok[i].db + 1);
            } else {
                tempT[i] = adatok[i];
                vegosszeg += adatok[i].konyv.ar * adatok[i].db;
            }
        }

        setAdatok(tempT);
        setOsszeg(vegosszeg);

        localStorage.setItem('reservedBooks', JSON.stringify(tempT));
    }

    function csokken(index) {
        let vegosszeg = 0;
        let tempT = [];

        for (let i = 0; i < adatok.length; i++) {
            if (i === index && adatok[i].db > 0) {
                tempT[i] = { konyv: adatok[i].konyv, db: adatok[i].db - 1 };
                vegosszeg += adatok[i].konyv.ar * (adatok[i].db - 1);
            } else {
                tempT[i] = adatok[i];
                vegosszeg += adatok[i].konyv.ar * adatok[i].db;
            }
        }

        setAdatok(tempT);
        setOsszeg(vegosszeg);

        localStorage.setItem('reservedBooks', JSON.stringify(tempT));
    }

    function fizetes() {
        if (!isLoggedIn) {
            window.alert('A fizetéshez be kell jelentkezned!');
            window.location.href = '/login';
        } else {
            const dolgoz = async () => {
                try {
                    const response = await fetch(
                        'http://localhost:5000/vasarlas',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                felhasznalo: user,
                                adatok,
                            }),
                        }
                    );

                    const valasz = await response.json();

                    if (response.ok) {
                        window.alert(valasz.msg);
                        localStorage.removeItem('reservedBooks');
                        window.location.href = '/login';
                    } else {
                        window.alert(valasz.msg);
                    }
                } catch (error) {
                    console.log(`Valami hiba történt: ${error.message}`);
                }
            };

            dolgoz();
        }
    }

    function torles(id) {
        const tempT = adatok.filter((elem) => elem.konyv._id !== id);

        let vegosszeg = 0;

        for (let i = 0; i < tempT.length; i++) {
            vegosszeg += adatok[i].konyv.ar * adatok[i].db;
        }

        setAdatok(tempT);
        setSzamlalo(tempT.length);
        setOsszeg(vegosszeg);

        localStorage.setItem('reservedBooks', JSON.stringify(tempT));
    }

    const books = [];

    for (let i = 0; i < adatok.length; i++) {
        books.push(
            <div
                className="cart-book-kontener"
                key={adatok[i].konyv._id}
            >
                <h2>{adatok[i].konyv.cim}</h2>
                <div className="cart-kep">
                    <img src={`/images/${adatok[i].konyv.kep}`} />
                </div>
                <button onClick={() => torles(adatok[i].konyv._id)}>
                    Törlés
                </button>
                <div className="cart-select">
                    <p>
                        Darabszám: <button onClick={() => novel(i)}>+</button>{' '}
                        <span id="darabszam">{adatok[i].db}</span>
                        <button onClick={() => csokken(i)}>-</button>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="cart-kontener">
                <div className="cart-bal-kontener">{books}</div>
                <div className="cart-jobb-kontener">
                    <h1>Vásárlás összegzése</h1>
                    <p>
                        Végösszeg: <span>{osszeg}</span>Ft
                    </p>
                    <button onClick={fizetes}>Fizetés</button>
                </div>
            </div>
        </>
    );
};

export default Cart;
