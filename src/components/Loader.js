import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <div className={"justify-content-md-center"}>
            <Spinner
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
            />
        </div>

    );
};

export default Loader;
