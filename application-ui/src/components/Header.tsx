import React, { useEffect, useState } from "react";
import { IBootstrapData } from "../common/models/BootstrapData";
import { bootstrap } from "../bootstrap";
import backendFactory from "../backend/BackendFactory";
import { useNavigate } from "react-router-dom";
import { RouteConstants } from "../constants/RouteContants";
import { IUser } from "../common/models/User";

interface IHeaderProps {
    profile: IUser;
}

const Header: React.FC<IHeaderProps> = ({ profile }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        backendFactory
            .auth()
            .logout()
            .then(() => {
                navigate(RouteConstants.LOGIN);
            })
            .catch(() => {
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
