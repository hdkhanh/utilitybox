import { clientFactory, IClientFactory } from "./api-client/client";
import { axios } from "./api-client/axios";
import { IAppService, IAuthService, IBackendFactory } from "../common/spi/backend";
import AuthService from "./services/AuthService";
import AppService from "./services/AppService";

export class BackendFactory implements IBackendFactory {
    private readonly client: IClientFactory;

    constructor() {
        this.client = clientFactory(axios);
    }

    public auth(): IAuthService {
        return new AuthService(this.client.auth, this.client.setAccessToken);
    }

    public app(): IAppService {
        return new AppService(this.client.app);
    }
}

const backendFactory = new BackendFactory();
export default backendFactory;
