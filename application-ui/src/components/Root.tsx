import React, { useEffect, useState } from "react";
import { IBootstrapData } from "../common/models/BootstrapData";
import { bootstrap } from "../bootstrap";
import Header from "./Header";

const Root: React.FC = () => {
    const [bootstrapData, setBootstrapData] = useState<IBootstrapData>();

    useEffect(() => {
        bootstrap().then((data) => {
            setBootstrapData(data);
        });
    }, []);

    return bootstrapData ? (
        <div className="application-ui">
            <Header profile={bootstrapData.profile} />
            <div className="application-content">
                <h1>WELCOME TO APPLICATION UI</h1>
            </div>
        </div>
    ) : (
        <span>Loading...</span>
    );
};

export default Root;
