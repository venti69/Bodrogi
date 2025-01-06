import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [tipusok, setTipusok] = useState([]);
    const [arak, setArak] = useState('');
    useEffect(() => {
        const dolgoz = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/konyvek-frontend'
                );

                const valasz = await response.json();
                let munka = valasz.books;

                if (response.ok) {
                    if (arak === '' || arak === 'nincs') {
                        if (tipusok.length === 0) {
                            if (munka.length === 0) {
                                window.alert(
                                    'Nincs a feltételeknek megfelelő elem!'
                                );
                            } else {
                                setBooks(munka);
                            }
                        } else {
                            munka = munka.filter((elem) => {
                                let ertek = false;
                                for (let i = 0; i < tipusok.length; i++) {
                                    ertek ||= elem.tipus === tipusok[i];
                                }

                                return ertek;
                            });

                            if (munka.length === 0) {
                                window.alert(
                                    'Nincs a feltételeknek megfelelő elem!'
                                );
                            } else {
                                setBooks(munka);
                            }
                        }
                    } else {
                        if (tipusok.length === 0) {
                            munka = munka.filter(
                                (elem) =>
                                    elem.ar >= +arak.split('-')[0] &&
                                    elem.ar <= +arak.split('-')[1]
                            );
                            if (munka.length === 0) {
                                window.alert(
                                    'Nincs a feltételeknek megfelelő elem!'
                                );
                            } else {
                                setBooks(munka);
                            }
                        } else {
                            munka = munka.filter(
                                (elem) =>
                                    elem.ar >= +arak.split('-')[0] &&
                                    elem.ar <= +arak.split('-')[1]
                            );
                            munka = munka.filter((elem) => {
                                let ertek = false;
                                for (let i = 0; i < tipusok.length; i++) {
                                    ertek ||= elem.tipus === tipusok[i];
                                }

                                return ertek;
                            });

                            if (munka.length === 0) {
                                window.alert(
                                    'Nincs a feltételeknek megfelelő elem!'
                                );
                            } else {
                                setBooks(munka);
                            }
                        }
                    }
                } else {
                    window.alert(valasz.msg);
                }
            } catch (error) {
                console.log(`Valami hiba történt: ${error.message}`);
            }
        };

        dolgoz();
    }, [tipusok, arak]);

    function levalogat(ertek) {
        if (!tipusok.includes(ertek)) {
            setTipusok([...tipusok, ertek]);
        } else {
            setTipusok(tipusok.filter((elem) => elem !== ertek));
        }
    }

    return (
        <>
            <Navbar />
            <div className="books-kontener">
                <div className="books-bal-kontener">
                    <div className="bal-fix">
                        <h4>Típus</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="Regény">Regény</label>
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="Regény"
                                            value="Regény"
                                            onChange={(e) =>
                                                levalogat(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="Magazin">Magazin</label>
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="Magazin"
                                            value="Magazin"
                                            onChange={(e) =>
                                                levalogat(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="Képregény">
                                            Képregény
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="Képregény"
                                            value="Képregény"
                                            onChange={(e) =>
                                                levalogat(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
                            <Link to={`/uniquebook/${book._id}`}>Megmutat</Link>
                        </div>
                    ))}
                </div>
                <div className="books-jobb-kontener">
                    <div className="jobb-fix">
                        <h4>Árkategória (Ft)</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="nincs">nincs</label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="nincs"
                                            value="nincs"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="0-1000">0-1000</label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="0-1000"
                                            value="0-1000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="1000-2000">
                                            1000-2000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="1000-2000"
                                            value="1000-2000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="2000-3000">
                                            2000-3000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="2000-3000"
                                            value="2000-3000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="3000-4000">
                                            3000-4000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="3000-4000"
                                            value="3000-4000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="4000-5000">
                                            4000-5000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="4000-5000"
                                            value="4000-5000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="5000-6000">
                                            5000-6000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="5000-6000"
                                            value="5000-6000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="6000-7000">
                                            6000-7000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="6000-7000"
                                            value="6000-7000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="7000-8000">
                                            7000-8000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="7000-8000"
                                            value="7000-8000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="8000-9000">
                                            8000-9000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="8000-9000"
                                            value="8000-9000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="9000-10000">
                                            9000-10000
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="radio"
                                            name="arkategoria"
                                            id="9000-10000"
                                            value="9000-10000"
                                            onChange={(e) =>
                                                setArak(e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            ;
        </>
    );
};

export default Books;
