import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const dolgoz = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/konyvek-frontend'
                );

                const valasz = await response.json();

                if (response.ok) {
                    setBooks(valasz.books);
                } else {
                    window.alert(valasz.msg);
                }
            } catch (error) {
                console.log(`Valami hiba történt: ${error.message}`);
            }
        };

        dolgoz();
    }, []);

    function megmutat(id) {
        window.location.href = `/uniquebook/${id}`;
    }

    return (
        <>
            <Navbar />
            <div className="books-kontener">
                <div className="books-bal-kontener"></div>
                <div className="books-kozep-kontener">
                    {books.map((book) => (
                        <div
                            className="book-kontener"
                            key={book._id}
                        >
                            <h1>{book.szerzo}</h1>
                            <h2>{book.cim}</h2>
                            <p>Ár: {book.ar} ft</p>
                            <p>Oldalszám: {book.oldalszam}</p>
                            <p>Típus: {book.tipus}</p>
                            <div className="book-kep">
                                <img src={`./images/${book.kep}`} />
                            </div>
                            <button onClick={() => megmutat(`${book._id}`)}>
                                Megnézem
                            </button>
                        </div>
                    ))}
                </div>
                <div className="books-jobb-kontener"></div>
            </div>
            ;
        </>
    );
};

export default Books;
