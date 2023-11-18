import { IAuthService } from "../../common/spi/backend";
import { AuthControllerApiInterface } from "../api-client/openapi/generated/auth-service";
import { SetAccessTokenType } from "../api-client/client";
import { convertToUser } from "../converters/UserConverter";
import { IUser } from "../../common/models/User";

const ACCESS_TOKEN_KEY = "access_token";

class AuthService implements IAuthService {
    private readonly authClient: AuthControllerApiInterface;
    private readonly setAccessToken: SetAccessTokenType;

    constructor(authClient: AuthControllerApiInterface, setAccessToken: SetAccessTokenType) {
        this.authClient = authClient;
        this.setAccessToken = setAccessToken;
    }

    public async isAuthenticated(): Promise<boolean> {
        const profile = await this.profile().catch(() => false);
        return !!profile;
    }

    public async profile(): Promise<IUser> {
        const accessToken = this.getAccessToken();
        if (accessToken) {
            this.setAccessToken(accessToken);
        }

        const response = await this.authClient.profile();

        return convertToUser(response.data);
    }

    public async login(username: string, password: string): Promise<void> {
        const request = {
            loginRequest: {
                username,
                password,
            },
        };

        const response = await this.authClient.login(request);
        if (response.status === 200 && response.data.accessToken) {
            this.storedAccessToken(response.data.accessToken);
            this.setAccessToken(response.data.accessToken);
        }
    }

    public async logout(): Promise<void> {
        await this.authClient.logout();
        this.setAccessToken("");
        this.clearAccessToken();
    }

    private storedAccessToken(accessToken: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }

    private getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    private clearAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
}

export default AuthService;
