import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IApp } from "../../common/models/App";
import RemoteApplication from "./RemoteApplication";

interface IApplicationModalProps {
    app: IApp;
    onHide: () => void;
}

const ApplicationModal: React.FC<IApplicationModalProps> = ({ app, onHide }) => {
    const { name, remoteInfo } = app;

    return (
        <Modal
            className="utilitybox-application-modal"
            dialogClassName="modal-xl"
            show={true}
            centered={true}
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RemoteApplication remoteInfo={remoteInfo!} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ApplicationModal;
