import React, { ChangeEvent } from "react";
import classNames from "classnames";
import { FormControl } from "react-bootstrap";

interface IInputAreaProps {
    isError: boolean;
    input: string;
    onChange: (value: string) => void;
}

const InputArea: React.FC<IInputAreaProps> = ({ isError, input, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onChange(event.target.value);
    };

    const inputClassNames = classNames([
        "utilitybox-json-formatter-input",
        "border border-4",
        {
            "bg-light border-secondary border-opacity-25": !isError,
            "bg-danger bg-opacity-25 border-danger": isError,
        },
    ]);

    return (
        <FormControl
            as="textarea"
            autoFocus={true}
            className={inputClassNames}
            placeholder="Enter your JSON"
            onChange={handleChange}
        />
    );
};

export default InputArea;
