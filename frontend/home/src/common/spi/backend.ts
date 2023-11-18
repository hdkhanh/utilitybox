import { IUser } from "../models/User";
import { IApp } from "../models/App";

export interface IBackendFactory {
    auth: () => IAuthService;
    app: () => IAppService;
}

export interface IAuthService {
    profile: () => Promise<IUser>;
    isAuthenticated: () => Promise<boolean>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export interface IAppService {
    all: () => Promise<IApp[]>;
}
