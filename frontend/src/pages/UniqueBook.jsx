import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const UniqueBook = () => {
    const { setSzamlalo } = useContext(CartContext);

    const [book, setBook] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const dolgoz = async () => {
            const response = await fetch(
                `http://localhost:5000/konyvegyedifrontend/${id}`
            );

            const valasz = await response.json();

            if (response.ok) {
                setBook(valasz.book);
            } else {
                window.alert(`Valami hiba történt: ${valasz.msg}`);
            }
        };

        dolgoz();
    }, []);

    function csokkent() {
        let tombR = JSON.parse(localStorage.getItem('reservedBooks')) || [];

        if (tombR.length > 0) {
            let szurtTomb = tombR.filter((elem) => elem.konyv._id !== book._id);

            if (tombR.length > szurtTomb.length) {
                setSzamlalo(tombR.length - 1);
                localStorage.setItem(
                    'reservedBooks',
                    JSON.stringify(szurtTomb)
                );
            }
        }
    }

    function novel() {
        let tombR = JSON.parse(localStorage.getItem('reservedBooks')) || [];

        let vanE = false;

        for (let i = 0; i < tombR.length; i++) {
            if (book._id === tombR[i].konyv._id) {
                vanE = true;
            }
        }

        if (tombR && vanE) {
            window.alert('Ez a tétel már szerepel a kosárban!');
        } else {
            let tomb = [...tombR, { konyv: book, db: 1 }];
            localStorage.setItem('reservedBooks', JSON.stringify(tomb));

            setSzamlalo(tomb.length);
        }
    }

    return (
        <>
            <Navbar />
            <div className="uniquebook-kontener">
                <h1>{book.szerzo}</h1>
                <h2>{book.cim}</h2>
                <p>Ár: {book.ar} Ft</p>
                <h2>Oldalszám: {book.oldalszam}</h2>
                <div className="uniquebook-img">
                    <img src={`/images/${book.kep}`} />
                </div>
                <div className="uniquebook-gombok">
                    <button onClick={csokkent}>-</button>
                    <span className="uniquebook-gombok-span">Vásárlás</span>
                    <button onClick={novel}>+</button>
                </div>
            </div>
            ;
        </>
    );
};

export default UniqueBook;
