import { clientFactory, IClientFactory } from "./api-client/client";
import { axios } from "./api-client/axios";
import { IAuthService, IBackendFactory } from "../common/spi/backend";
import AuthService from "./services/AuthService";

export class BackendFactory implements IBackendFactory {
    private readonly client: IClientFactory;

    constructor() {
        this.client = clientFactory(axios);
    }

    public auth(): IAuthService {
        return new AuthService(this.client.auth, this.client.setAccessToken);
    }
}

const backendFactory = new BackendFactory();
export default backendFactory;
