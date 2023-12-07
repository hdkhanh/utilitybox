import kebabCase from "lodash/kebabCase";

import { ApplicationInfo } from "../api-client/openapi/generated/app-service";
import { IApp } from "../../common/models/App";

export const convertToApp = (apps: ApplicationInfo[]): IApp[] => {
    return apps.map((it) => {
        const { name, description, createDate, remoteUrl, remoteScope, remoteModule } = it;

        return {
            key: makeKey(name!),
            name: name!,
            description: description!,
            createdDate: createDate!,
            remoteInfo:
                remoteUrl && remoteModule && remoteScope
                    ? {
                          url: remoteUrl,
                          scope: remoteScope,
                          module: remoteModule,
                      }
                    : undefined,
        };
    });
};

const makeKey = (name: string) => {
    return kebabCase(name.toLowerCase());
};
