import React, { createContext, useContext } from "react";
import { IUser } from "../common/models/User";
import { IBootstrapData } from "../common/models/BootstrapData";
import { IApp } from "../common/models/App";

interface IBootstrapProviderData {
    profile: IUser;
    apps: IApp[];
}

const BootstrapProviderContext = createContext<IBootstrapProviderData>({
    profile: {},
    apps: [],
});

interface IBootstrapProviderProps {
    bootstrapData: IBootstrapData;
    children: React.ReactNode;
}

const BootstrapProvider: React.FC<IBootstrapProviderProps> = ({ bootstrapData, children }) => {
    const { profile, apps } = bootstrapData;

    return (
        <BootstrapProviderContext.Provider
            value={{
                profile,
                apps,
            }}
        >
            {children}
        </BootstrapProviderContext.Provider>
    );
};

export const useBootstrap = () => useContext<IBootstrapProviderData>(BootstrapProviderContext);

export default BootstrapProvider;
