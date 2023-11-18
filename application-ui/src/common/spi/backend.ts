import { IUser } from "../models/User";

export interface IBackendFactory {
    auth: () => IAuthService;
}

export interface IAuthService {
    profile: () => Promise<IUser>;
    isAuthenticated: () => Promise<boolean>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
