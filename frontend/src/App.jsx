import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import UniqueBook from './pages/UniqueBook';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route
                        index
                        element={<Home />}
                    />
                    <Route
                        path="/logout"
                        element={<Logout />}
                    />
                    <Route
                        path="*"
                        element={<Login />}
                    />
                </Route>
                <Route
                    path="/books"
                    element={<Books />}
                />
                <Route
                    path="/uniquebook/:id"
                    element={<UniqueBook />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
