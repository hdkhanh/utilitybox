import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { IApp } from "../../common/models/App";

interface IApplicationModalProps {
    app: IApp;
    onHide: () => void;
}

const ApplicationModal: React.FC<IApplicationModalProps> = ({ app, onHide }) => {
    return (
        <Modal show={true} centered={true} backdrop="static">
            <Modal.Header>
                <Modal.Title>{app.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{app.description}</p>
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
