import { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

const ContextProvider = (props) => {
    const [szamlalo, setSzamlalo] = useState(0);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('reservedBooks'))) {
            let tomb = JSON.parse(localStorage.getItem('reservedBooks'));

            setSzamlalo(tomb.length);
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                szamlalo,
                setSzamlalo,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};

export default ContextProvider;
