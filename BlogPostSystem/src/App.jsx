import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.log(error);
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [dispatch]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-400">
            <Header />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default App;