import React from "react";
import backendFactory from "../backend/BackendFactory";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../constants/RouteContants";
import { useBootstrap } from "./BootstrapProvider";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { profile } = useBootstrap();

    const handleLogout = () => {
        backendFactory
            .auth()
            .logout()
            .then(() => {
                navigate(RouteConstants.LOGIN);
            });
    };

    return (
        <div className="application-header">
            <div className="application-header-profile">
                <a className="link-danger" onClick={handleLogout}>
                    Logout
                </a>
                <div className="application-header-profile-username">
                    {profile.username}/{profile.email}
                </div>
            </div>
        </div>
    );
};

export default Header;
