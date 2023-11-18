import { AxiosInstance } from "axios";
import { ApplicationControllerApi } from "./openapi/generated/app-service";

export const appFactory = (axios: AxiosInstance) => new ApplicationControllerApi(undefined, "", axios);
