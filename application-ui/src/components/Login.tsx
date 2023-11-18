import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backendFactory from "../backend/BackendFactory";
import Input from "../common/componets/Input";
import { RouteConstants } from "../constants/RouteContants";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [needToLogin, setNeedToLogin] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event: FormEvent) => {
        event.preventDefault();

        backendFactory
            .auth()
            .login(username, password)
            .then(() => {
                navigate(RouteConstants.ROOT);
            })
            .catch((error: Error) => {
                setErrorMessage(error.message);
            });
    };

    useEffect(() => {
        backendFactory
            .auth()
            .isAuthenticated()
            .then((authenticated) => {
                if (authenticated) {
                    navigate(RouteConstants.ROOT);
                } else {
                    setNeedToLogin(true);
                }
            });
    }, []);

    return needToLogin ? (
        <div className="tech-login-form">
            <div className="tech-login-form-content">
                {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}
                <form onSubmit={handleLogin}>
                    <Input
                        value={username}
                        placeholder="Username"
                        className="form-control"
                        onChange={handleUsernameChange}
                    />
                    <Input
                        value={password}
                        placeholder="Password"
                        className="form-control"
                        onChange={handlePasswordChange}
                    />
                    <div className="tech-login-form-action">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <span>Loading...</span>
    );
};

export default Login;
