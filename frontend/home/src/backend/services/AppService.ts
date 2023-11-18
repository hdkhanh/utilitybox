import { IAppService } from "../../common/spi/backend";
import { ApplicationControllerApiInterface } from "../api-client/openapi/generated/app-service";
import { convertToApp } from "../converters/AppConverter";
import { IApp } from "../../common/models/App";

class AppService implements IAppService {
    private readonly appClient: ApplicationControllerApiInterface;

    constructor(appClient: ApplicationControllerApiInterface) {
        this.appClient = appClient;
    }

    public async all(): Promise<IApp[]> {
        const response = await this.appClient.getAll();
        return convertToApp(response.data);
    }
}

export default AppService;
