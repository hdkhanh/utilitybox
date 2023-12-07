import React, { useEffect, useRef, useState } from "react";
import { prettyPrintJson } from "pretty-print-json";
import { Col, Row, Container } from "react-bootstrap";
import InputArea from "./InputArea";
import OutputArea from "./OutputArea";

const Tool: React.FC = () => {
    const ref = useRef<HTMLPreElement>(null);
    const [input, setInput] = useState("");
    const [isError, setError] = useState(false);

    useEffect(() => {
        if (ref?.current) {
            setError(false);
            try {
                ref.current.innerHTML = input
                    ? prettyPrintJson.toHtml(JSON.parse(input), {
                          quoteKeys: true,
                          trailingCommas: false,
                      })
                    : "[EMPTY]";
            } catch (error) {
                setError(true);
            }
        }
    }, [input]);

    return (
        <Container className="utilitybox-json-formatter-container h-100">
            <Row className="h-100">
                <Col className="w-50">
                    <InputArea input={input} isError={isError} onChange={setInput} />
                </Col>
                <Col className="w-50">
                    <OutputArea preRef={ref} />
                </Col>
            </Row>
        </Container>
    );
};

export default Tool;
