export interface IApp {
    key: string;
    name: string;
    description: string;
    createdDate?: string;
    remoteInfo?: IRemoteInfo;
}

export interface IRemoteInfo {
    url: string;
    scope: string;
    module: string;
}
