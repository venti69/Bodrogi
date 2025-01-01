import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const UniqueBook = () => {
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
                <button>Vásárlás</button>
            </div>
            ;
        </>
    );
};

export default UniqueBook;
