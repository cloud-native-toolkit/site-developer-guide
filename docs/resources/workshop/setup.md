# Setup Workshop Environment

Provides the steps to install the Cloud-Native Toolkit and setting up the  Cloud-Native Toolkit Workshop hands on labs.

Click on image below to launch video:

[!["Workshop: Setup Environment"](http://img.youtube.com/vi/aFSt5cW9TlI/0.jpg)](https://youtu.be/aFSt5cW9TlI "Workshop: Setup Environment"){: target=_blank}

## 1. Create OpenShift Cluster

Create an OpenShift Cluster for example:

!!!Todo
    Fixup links below

- The 8 hours free Cluster on [IBM Open Labs](https://developer.ibm.com/openlabs/openshift) select lab 6 `Bring Your Own Application`
- Deploy a Cluster on IBM Cloud VPC2 using the [Toolkit](getting-started-day-0/provision-cluster/ibm-cloud-vpc)
- On other Clouds using docs from [cloudnativetoolkit.dev/multi-cloud](https://cloudnativetoolkit.dev/getting-started-day-0/plan-installation/multi-cloud)
- IBM internal DTE Infrastructure access via [IBM VPN](https://ccp-ui.csplab.intranet.ibm.com/ ) or [IBM CSPLAB](https://ccp-ui.apps.labprod.ocp.csplab.local/)

## 2. Install IBM Cloud Native Toolkit

- Use one of the install options for example the [Quick Install](https://cloudnativetoolkit.dev/getting-started-day-0/install-toolkit/quick-install)

    ```shell
    curl -sfL get.cloudnativetoolkit.dev | sh -
    ```

## 3. Setup Workshop

- Install the foundation for the workshops

    ```shell
    curl -sfL workshop.cloudnativetoolkit.dev | sh -
    ```

    !!!Note
      The username and password for Git Admin is `toolkit` `toolkit`

!!!Todo
    Shouls this be moved out of setup and into the student section of the workshop?

## 4. (Optional) Auto configure Terminal Shell

- You can use [IBM Cloud Shell](https://cloud.ibm.com/shell), the [OpenLabs Shell](https://developer.ibm.com/openlabs/openshift) or your local workstation. More details in [Toolkit Dev Setup](https://cloudnativetoolkit.dev/getting-started/dev-env-setup) and [Toolkit CLI](https://cloudnativetoolkit.dev/getting-started/cli).
  Run the following command on Cloud, Linux or MacOS shell:

    ```shell
    curl -sL shell.cloudnativetoolkit.dev | bash -
    source ~/.bashrc || source ~/.zshrc

    ```

    Be sure to follow the instructions provided to enable the changes in the current terminal session.
