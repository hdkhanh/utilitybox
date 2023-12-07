import React from "react";
import classNames from "classnames";
import { Button } from "react-bootstrap";
import CopyIcon from "./CopyIcon";

interface IOutputAreaProps {
    preRef: React.RefObject<HTMLPreElement>;
}

const OutputArea: React.FC<IOutputAreaProps> = ({ preRef }) => {
    const handelCopy = () => {
        const textContent = preRef.current?.textContent ?? "";
        navigator.clipboard.writeText(textContent);
    };

    const outputClassNames = classNames([
        "utilitybox-json-formatter-output",
        "border border-5 border-white",
        "bg-white",
    ]);

    return (
        <div className="utilitybox-json-formatter-output">
            <Button variant="secondary" onClick={handelCopy}>
                <CopyIcon />
            </Button>
            <pre ref={preRef} className={outputClassNames} />
        </div>
    );
};

export default OutputArea;
