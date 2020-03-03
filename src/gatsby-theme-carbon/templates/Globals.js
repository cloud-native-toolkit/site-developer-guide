import React from 'react';

const globals = {};
globals.longName   = "IBM Garage Cloud-Native Toolkit";
globals.shortName  = "Cloud-Native Toolkit";
globals.env        = "Developer Environment";
globals.ic         = "IBM Cloud";
globals.kube       = "Kubernetes";
globals.iks        = "IBM Kubernetes Service";
globals.ocp        = "Red Hat OpenShift";
globals.template   = "Code Pattern";
globals.method     = "IBM Garage Method";

const Globals = ({name}) => {

    return (
        <>
            {globals[name]}
        </>
    )
};

Globals.get = (key) => {
    return globals[key];
};


Globals.set = (key, value) => {
    globals[key] = value;
}

Object.assign(Globals,globals);

export default Globals;

