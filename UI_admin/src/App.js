import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import List from "./pages/list";
import Single from "./pages/single";
import NewUser from "./pages/new/NewUser";
import NewProduct from "./pages/new/NewProduct";
import Type from "./pages/type";
import Brand from "./pages/brand";
import Staff from "./pages/staff";
import ProductDetail from "./pages/products/ProductDetail";
import { DarkModeContext } from "./context/darkModeContext";

import AdminRoute from "./adminRoute";
import AuthorizeRoute from "./authorizeRoute";

import "./style/dark.scss";
import Product from "./pages/products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                <ToastContainer />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/">
                        <Route
                            index
                            element={
                                <AuthorizeRoute>
                                    <Home />
                                </AuthorizeRoute>
                            }
                        />
                        <Route path="users">
                            <Route
                                index
                                element={
                                    <AuthorizeRoute>
                                        <List />
                                    </AuthorizeRoute>
                                }
                            />
                            <Route
                                path=":userId"
                                element={
                                    <AuthorizeRoute>
                                        <Single />
                                    </AuthorizeRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <AuthorizeRoute>
                                        <NewUser />
                                    </AuthorizeRoute>
                                }
                            />
                        </Route>
                        <Route path="/staff">
                            <Route
                                index
                                element={
                                    <AdminRoute>
                                        <AuthorizeRoute>
                                            <Staff />
                                        </AuthorizeRoute>
                                    </AdminRoute>
                                }
                            />
                        </Route>
                        <Route path="products">
                            <Route
                                index
                                element={
                                    <AuthorizeRoute>
                                        <Product />
                                    </AuthorizeRoute>
                                }
                            />
                            <Route
                                path=":productId"
                                element={
                                    <AuthorizeRoute>
                                        <ProductDetail />
                                    </AuthorizeRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <AuthorizeRoute>
                                        <NewProduct />
                                    </AuthorizeRoute>
                                }
                            />
                        </Route>

                        <Route
                            path="/type"
                            element={
                                <AuthorizeRoute>
                                    <Type />
                                </AuthorizeRoute>
                            }
                        />

                        <Route
                            path="/brand"
                            element={
                                <AuthorizeRoute>
                                    <Brand />
                                </AuthorizeRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
