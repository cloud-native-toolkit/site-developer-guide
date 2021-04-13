# Fast-Start Install

!!!todo
    This page is only partially complete

This section will guide you through installing the Cloud-Native Toolkit suitable for learning how to use the toolkit.

Fast-start installation does not install the base Kubernetes cluster.  You need to provide the cluster before starting the toolkit installation.

## Choosing a Kubernetes cluster option

The toolkit can be installed over a standard Kubernetes or Red Hat OpenShift cluster.  The following options are supported by the toolkit:

!!!Todo
    State any configuration/setup requirements in the tabs for each environment.  Such as having a default storage class defined, IAM Admin permissions, etc...

=== "OpenShift on IBM Cloud"
    #### Red Hat OpenShift running on IBM Cloud

    A Red Hat OpenShift cluster is the recommended production development environment.  It provides enhanced developer experience and tooling over a standard Kubernetes cluster as well as additional features, such as enhanced security for production workloads.

    You need an active IBM Cloud account, with billing enabled, as this option will incur costs 

    - Learn on recommended production environment
    - Incurs costs
    - Enhanced developer experience and cluster security over standard Kubernetes
    - No local resources needed to run cluster

=== "Kubernetes on IBM Cloud"
    #### Kubernetes running on IBM Cloud

    - Managed Kubernetes environment
    - Incurs costs
    - No local resources needed to run cluster

=== "Code Ready Containers"
    #### Code Ready Containers

    - Run locally on laptop or workstation
    - no runtime costs
    - Need 16GB memory or greater
    - No remote access from public internet services, such as github
    - cluster access only from host system by default - no remote access to cluster over network

=== "Local OpenShift"
    #### Local OpenShift / OKD

    - Run on local hardware
    - need your own OpenShift licenses (OKD is a sibling project that does not need OpenShift licences)
    - you need to 

=== "Open Labs cluster"
    #### Open Labs cluster

    - No local resources needed to run cluster
    - No runtime costs
    - Limited time cluster (6 hours)

## Obtaining your Kubernetes Cluster

!!!Todo
    Ensure this section also covers installing the CLI for the cluster (oc or kubectl)

Select the option you want for your cluster, then follow the instructions.

=== "OpenShift on IBM Cloud"
    #### Red Hat OpenShift running on IBM Cloud

    !!!Todo
        Add instructions here

=== "Kubernetes on IBM Cloud"
    #### Kubernetes running on IBM Cloud

    !!!Todo
        Add instructions here

=== "Code Ready Containers"
    #### Code Ready Containers

    !!!Todo
        Add instructions here

=== "Local OpenShift"
    #### Local OpenShift / OKD

    !!!Todo
        Add instructions here

=== "Open Labs cluster"
    #### Open Labs cluster

    !!!Todo
        Add instructions here

## Installing the toolkit

To install the toolkit perform the following steps:

1. In a command or terminal window ensure you are logged onto your cluster (**oc login** or **kubectl login**) with an admin account, that can create new namespaces on the cluster and setup RBAC security.
2. Run the following command (choose your operating system):

    === "Linux / MacOS"

        ```bash
        curl -sfL get.cloudnativetoolkit.dev | sh -
        ```

    === "Windows"

        !!!Todo
            Does this work for both CMD and Power shell?

            This uses **oc** - are we using that for both Kubernetes and OpenShift?

        ```Powershell
        oc create -f https://raw.githubusercontent.com/cloud-native-toolkit/ibm-garage-iteration-zero/master/install/install-ibm-toolkit.yaml
        sleep 5
        oc wait pod -l job-name=ibm-toolkit --for=condition=Ready -n default
        oc logs job/ibm-toolkit -f -n default
        ```
