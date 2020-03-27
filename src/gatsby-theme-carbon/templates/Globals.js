import React from 'react';

const globals = {};
globals.longName   = "IBM Garage Cloud Native Toolkit";
globals.shortName  = "Cloud Native Toolkit";
globals.env        = "Developer Environment";
globals.ic         = "IBM Cloud";
globals.ibmcloud   = "IBM Cloud";
globals.iccli      = "IBM Cloud CLI";
globals.kube       = "Kubernetes";
globals.iks        = "IBM Cloud Kubernetes Service";
globals.ocp        = "Red Hat OpenShift";
globals.roks       = "Red Hat OpenShift on IBM Cloud";
globals.method     = "IBM Garage Method";
globals.template   = "Code Pattern";
globals.templates  = "Code Patterns";
globals.dashboard  = "Developer Dashboard";
globals.igccli     = "IGC CLI";
globals.cloudpaks  = "IBM Cloud Paks";

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

