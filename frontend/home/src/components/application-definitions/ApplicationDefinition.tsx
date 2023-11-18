import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fullscreen } from "react-bootstrap-icons";
import { IApp } from "../../common/models/App";
import ApplicationModal from "./ApplicationModal";

interface IApplicationProps {
    app: IApp;
}

const ApplicationDefinition: React.FC<IApplicationProps> = ({ app }) => {
    const [shouldDisplayApplication, setDisplayApplication] = useState(false);

    const showApplication = () => {
        setDisplayApplication(true);
    };

    const hideApplication = () => {
        setDisplayApplication(false);
    };

    return (
        <>
            <Card className="utilitybox-application card">
                <Card.Header className="utilitybox-application-header">
                    {app.name}
                    <Button variant="light" onClick={showApplication}>
                        <Fullscreen />
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Card.Text className="utilitybox-application-description">{app.description}</Card.Text>
                </Card.Body>
            </Card>
            {shouldDisplayApplication ? <ApplicationModal app={app} onHide={hideApplication} /> : null}
        </>
    );
};

export default ApplicationDefinition;
