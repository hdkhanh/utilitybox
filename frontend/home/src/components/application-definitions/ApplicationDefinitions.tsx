import React from "react";
import { useBootstrap } from "../BootstrapProvider";
import ApplicationDefinition from "./ApplicationDefinition";

const ApplicationDefinitions: React.FC = () => {
    const { apps } = useBootstrap();

    return (
        <div className="utilitybox-application-definitions d-flex justify-content-start flex-wrap">
            {apps.map((app) => (
                <div key={app.key} className={`utilitybox-application-definition application-${app.key}`}>
                    <ApplicationDefinition app={app} />
                </div>
            ))}
        </div>
    );
};

export default ApplicationDefinitions;
