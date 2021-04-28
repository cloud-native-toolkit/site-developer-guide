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

=== "OpenShift or OKD"
    #### OpenShift / OKD

    - Run on local hardware, virtualized infrastructure or cloud provider
    - need your own OpenShift licenses (OKD is a sibling project that does not need OpenShift licences)
    
        !!!Todo
            What is the minimum config that needs to be done to allow Toolkit install?

=== "CodeReady Containers"
    #### CodeReady Containers

    - Run locally on laptop or workstation
    - no runtime costs
    - Need 16GB memory or greater in host system
    - No remote access from public internet services, such as github
    - cluster access only from host system by default - no remote access to cluster over network

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

=== "OpenShift or OKD"
    #### OpenShift / OKD

    1. Install the OpenShift or OKD cluster:
        - For OpenShift follow the [install instructions](https://docs.openshift.com/container-platform/4.7/installing/index.html){: target="_blank" .external } for your preferred environment
        - For OKD follow the [install instructions](https://docs.okd.io/latest/installing/index.html){: target="_blank" .external } for your preferred environment

        !!!Todo
            Add any additional post install configuration steps needed here
    
    2. Once installed you need to ensure you can sign onto the OpenShift cluster using the web console (see the Web console section in the docs for details on how to access the console).  
    3. Once you are signed into the console you can download and install the OpenShift Command Line Interface (CLI) tools.  The CLI tools are available from the question mark icon next to you login name at the top of the OpenShift console, or from [Red Hat](https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/){: target="_blank" .external }.
    4. On your local workstation or laptop open a command prompt and sign in to your OpenShift cluster.  The exact command needed is available from the OpenShift web console, select your name at the top of the screen, then in the dropdown select the **Copy login command** link.  This will open a screen where you can select **Display Token** (you may be asked to authenticate again before the token is displayed) then you can copy the command line command needed to login to the cluster.

=== "CodeReady Containers"
    #### CodeReady Containers

    1. Navigate to the [Red Hat CodeReady Containers](https://developers.redhat.com/products/codeready-containers/overview){: target="_blank" .external } site.
    2. Select **Install OpenShift on your laptop** button and follow the instructions to install CodeRead Containers to your laptop

        !!!Warning
            CodeReady Containers needs to adjust your laptop networking, so on some platforms it will not work alongside VPN clients needed to access corporate networks.  If you need to run a VPN client, then you can install CodeReady Containers in a virtual machine on your laptop and work inside the virtual machine to access CodeReady Containers.
    
    3. Download and install the OpenShift Command Line Interface (CLI) tools.  The CLI tools are available from the question mark icon next to you login name at the top of the OpenShift console - see [section 3.3.1 in the CodeReady Containers Getting Started Guide](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.25.0/html/getting_started_guide/using-codeready-containers_gsg#accessing-the-openshift-web-console_gsg), or from [Red Hat](https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/){: target="_blank" .external }.
    4. Once you have the CodeReady Containers CLI installed you need to login to the cluster - this is covered in the [CodeReady Containers Getting Started Guide - section 3.3.2](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.25.0/html/getting_started_guide/using-codeready-containers_gsg#accessing-the-openshift-cluster-with-oc_gsg){: target="_blank" .external }
    5. Move onto the next section to install the Cloud-Native Toolkit

=== "Open Labs cluster"
    #### Open Labs cluster

    1. Navigate to the [IBM Open Labs - Red Hat OpenShift on IBM Cloud](https://developer.ibm.com/openlabs/openshift){: target="_blank" .external }
    2. Select the **Bring Your Own Application - Launch Lab** button
    3. Sign-in to the IBM Cloud or signup if you don't already have an IBM account
    4. When the Lab has been launched, forward the instructions in the left panel to show the 2nd page, **Quick Links and Common Commands**.  Here you can see the command line commands to log into your IBM cloud account and also the OpenShift cluster.  Log into the IBM cloud and OpenShift cluster, using the command prompt on the left side of the lab browser screen
    5. Jump to the next section and follow the command in the **Linux / MacOS** tab to install the Cloud-Native Toolkit - run the command on the command line in the left panel of the lab screen.  You must have completed the logon in the previous step before starting the toolkit install

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
