import backendFactory from "./backend/BackendFactory";
import { IBootstrapData } from "./common/models/BootstrapData";
import { AxiosError } from "axios";
import { RouteConstants } from "./constants/RouteContants";

export const bootstrap = async (): Promise<IBootstrapData> => {
    const profile = await backendFactory
        .auth()
        .profile()
        .catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                window.location.href = RouteConstants.LOGIN;
            }

            throw error;
        });

    return {
        profile,
    };
};
