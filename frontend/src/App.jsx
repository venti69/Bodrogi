import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import UniqueBook from './pages/UniqueBook';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    index
                    element={<Home />}
                />
                <Route
                    path="/books"
                    element={<Books />}
                />
                <Route
                    path="/uniquebook/:id"
                    element={<UniqueBook />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
