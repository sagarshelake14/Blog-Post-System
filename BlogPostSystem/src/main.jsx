import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { store } from "./store/store";

import App from "./App";
import Home from '../src/Pages/Home'
import SignUp from "./Pages/SignUp";
import AddPost from "../src/Pages/AddPost";
import EditPost from "../src/Pages/EditPost";
import Post from "../src/Pages/Post";
import AllPosts from "../src/Pages/AllPosts";

import { AuthLayout, Login } from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: "signup",
                element: (
                    <AuthLayout authentication={false}>
                        <SignUp />
                    </AuthLayout>
                ),
            },
            {
                path: "all-posts",
                element: (
                    <AuthLayout authentication>
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: "add-post",
                element: (
                    <AuthLayout authentication>
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: "edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: "post/:slug",
                element: <Post />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);