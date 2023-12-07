import React, { useEffect, useState } from "react";
import { IBootstrapData } from "../common/models/BootstrapData";
import { bootstrap } from "../BootstrapService";
import Header from "./Header";
import BootstrapProvider from "./BootstrapProvider";
import ApplicationDefinitions from "./application-definitions/ApplicationDefinitions";
import LoadingMask from "../common/components/LoadingMask";
import ErrorBoundary from "./ErrorBoundary";

const Root: React.FC = () => {
    const [bootstrapData, setBootstrapData] = useState<IBootstrapData>();

    useEffect(() => {
        bootstrap().then((data) => {
            setBootstrapData(data);
        });
    }, []);

    return bootstrapData ? (
        <div className="utilitybox-application-ui">
            <ErrorBoundary>
                <BootstrapProvider bootstrapData={bootstrapData}>
                    <Header />
                    <ApplicationDefinitions />
                </BootstrapProvider>
            </ErrorBoundary>
        </div>
    ) : (
        <LoadingMask />
    );
};

export default Root;
