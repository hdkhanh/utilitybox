import { AxiosInstance } from "axios";
import { AuthControllerApi } from "./openapi/generated/auth-service";

export const authFactory = (axios: AxiosInstance) => new AuthControllerApi(undefined, "", axios);
