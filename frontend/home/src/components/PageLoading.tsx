import React from "react";
import Spinner from "react-bootstrap/Spinner";

const PageLoading: React.FC = () => {
    return (
        <div className="utilitybox-page-loading d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default PageLoading;
