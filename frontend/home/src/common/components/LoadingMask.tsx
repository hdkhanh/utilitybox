import React from "react";
import Spinner from "react-bootstrap/Spinner";

const LoadingMask: React.FC = () => {
    return (
        <div className="utilitybox-loading-mask d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingMask;
