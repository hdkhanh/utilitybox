import { IUser } from "./User";
import { IApp } from "./App";

export interface IBootstrapData {
    profile: IUser;
    apps: IApp[];
}
