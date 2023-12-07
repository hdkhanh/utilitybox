import React from "react";
import { importRemote } from "@module-federation/utilities";
import { IRemoteInfo } from "../../common/models/App";
import LoadingMask from "../../common/components/LoadingMask";

interface IRemoteApplicationProps {
    remoteInfo: IRemoteInfo;
}

const RemoteApplication: React.FC<IRemoteApplicationProps> = ({ remoteInfo }) => {
    const Application = React.lazy(async () => await importRemote({ ...remoteInfo }));

    return (
        <React.Suspense fallback={<LoadingMask />}>
            <Application />
        </React.Suspense>
    );
};

export default RemoteApplication;
