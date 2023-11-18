import React, { ErrorInfo } from "react";

interface IErrorBoundaryStates {
    hasError: boolean;
    error?: Error;
}

interface IErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryStates> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error,
        };
    }

    public componentDidCatch(error: Error, info: ErrorInfo) {
        console.log(error, info.componentStack);
    }

    public render() {
        const { hasError, error } = this.state;
        if (hasError) {
            return (
                <div className="utilitybox-error-fallback">
                    <div className="utilitybox-error-message">{error?.message}</div>
                    <div className="utilitybox-error-stack">{error?.stack}</div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
