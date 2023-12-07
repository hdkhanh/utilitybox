import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import backendFactory from "../backend/BackendFactory";
import { RouteConstants } from "../constants/RouteContants";
import LoadingMask from "../common/components/LoadingMask";

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
        event.stopPropagation();

        backendFactory
            .auth()
            .login(username, password)
            .then(() => {
                navigate(RouteConstants.ROOT);
            })
            .catch(() => {
                setErrorMessage("Invalid username or password!");
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
        <div className="utilitybox-login-form">
            <div className="utilitybox-login-form-content">
                {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}
                <Form onSubmit={handleLogin}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </InputGroup>
                    <div className="utilitybox-login-form-action">
                        <Button type="submit" variant="primary">
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    ) : (
        <LoadingMask />
    );
};

export default Login;
