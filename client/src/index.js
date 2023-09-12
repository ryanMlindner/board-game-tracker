import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import "./CSS/index.css";
import "./CSS/skeleton.css";
import "./CSS/normalize.css";
import "./CSS/custom.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </BrowserRouter>
);