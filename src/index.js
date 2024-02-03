import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./store";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" Component={App}></Route>
                </Routes>
            </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>
);
