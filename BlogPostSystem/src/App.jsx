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
                    // Pass as an object payload { userData } to match authSlice logic
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.log("App :: checkUser :: error", error);
                dispatch(logout());
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-400">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
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