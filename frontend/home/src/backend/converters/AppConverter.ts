import kebabCase from "lodash/kebabCase";

import { ApplicationInfo } from "../api-client/openapi/generated/app-service";
import { IApp } from "../../common/models/App";

export const convertToApp = (apps: ApplicationInfo[]): IApp[] => {
    return apps.map((it) => ({
        key: makeKey(it.name ?? ""),
        name: it.name ?? "",
        description: it.description ?? "",
        createdDate: it.createDate,
    }));
};

const makeKey = (name: string) => {
    return kebabCase(name.toLowerCase());
};
