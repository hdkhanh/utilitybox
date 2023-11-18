import React from "react";

interface IInputProps {
    value: string;
    placeholder?: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({ value, placeholder, className, onChange }) => {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                value={value}
                className={className}
                placeholder={placeholder}
                aria-label={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
