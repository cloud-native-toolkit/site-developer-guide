import React from 'react';

const globals = {};
globals.longName   = "IBM Garage Cloud Native Toolkit";
globals.shortName  = "Cloud Native Toolkit";
globals.env  = "Developer Environment";

export default ({string}) => {

    return (
        <>
            {globals[string]}
        </>
    )
}

