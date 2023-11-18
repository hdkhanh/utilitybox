import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Root from "./components/Root";
import { RouteConstants } from "./constants/RouteContants";
import { IBootstrapData } from "./common/models/BootstrapData";
import { bootstrap } from "./bootstrap";

interface IAppProps {
    bootstrapData: IBootstrapData;
}

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RouteConstants.ROOT} element={<Root />} />
                <Route path={RouteConstants.LOGIN} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
