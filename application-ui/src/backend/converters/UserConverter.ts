import { GetProfileResponse } from "../api-client/openapi/generated/auth-service";
import { IUser } from "../../common/models/User";

export const convertToUser = (profile: GetProfileResponse): IUser => {
    return {
        username: profile.username ?? "",
        email: profile.email ?? "",
    };
};
