# Install into Red Hat CodeReady Containers

!!!Warning
    You may not be able to run CodeReady Containers (CRC) if you use a VPN solution to access a corporate network.  CRC needs to be able to manage the network configuration of you laptop or workstation, but some VPN applications lock the network configuration, so may block CRC operation.  You may be able to run CRC in a virtual machine on your system to overcome this issue. 

## Prerequisites

Prepare to install developer tools into Red Hat CodeReady Containers on your laptop

The IBM Garage for Cloud Developer Tools facilitate development and deployment of cloud-native applications.
They can be hosted in any Kubernetes or OpenShift cluster, including the Red Hat CodeReady Containers local OpenShift environment.

These instructions help you install Red Hat CodeReady Containers and explain
how to configure and run the Terraform infrastructure-as-code (IasC) scripts to install the Developer Tools into that CodeReady Containers install.

!!!Information
    Red Hat CodeReady Containers (CRC) is based on OpenShift and the current installation of the Cloud-Native Toolkit only installs the RedHat Pipelines (Tekton) operator, Jenkins is not installed.  Read the [Tekton Pipelines and Tasks Guide](../../reference/tools/tekton.md){: target=_blank} to understand how to deploy your app into CRC using Tekton.

The following prerequisites are required to support installing CodeReady Containers:

- CodeReady Containers [Minimum system requirements](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.0/html/getting_started_guide/getting-started-with-codeready-containers_gsg#minimum-system-requirements_gsg){: target=_blank}
- A [Red Hat account](https://access.redhat.com/login){: target=_blank} is required

The following prerequisites are required before following the setup instructions:

- Install the [Prerequisites](../../learning/dev-setup.md){: target=_blank} listed before continuing

## Install CRC

Download CodeReady Containers (CRC) and install it

Install and configure CRC as described in [Install on Laptop](https://cloud.redhat.com/openshift/install/crc/installer-provisioned){: target=_blank}

- Remember to take a copy of **Pull Secret**

- **CRC executable**: Copy the crc binary to your $PATH:

    From the directory where you unzipped the download:

    ```shell
    cp crc /usr/local/bin
    ```

Follow these steps to complete the installation:

- **Setup**: Run the following command from a terminal session:

    ```shell
    crc setup
    ```

- **Add memory**: By default, the CRC VM is set to only use 8 GB of RAM. The more RAM you can give it, the better.

    To set the CRC VM to 10 GB of RAM, do this:

    ``shell
    crc config set memory 10240
    ```

- **Start** the local CRC Cluster

    Run the crc start command in a terminal window:

    ```shell
    crc start
    ```

- During the start process, you will be prompted for your pull secret. Copy and paste it into the terminal window.

- Wait about 5 minutes for the VM initialization to complete. When complete, the kubeadmin password will be displayed. Make note of this password because you will need it to log into the console.

- Open the Cluster Admin **Console**

    ```shell
    crc console
    ```

- Open a web browser and go to the OpenShift console

- Login with user id **kubeadmin** and the password that was displayed after the `crc start` had completed.

Other useful links:

- [Getting started with Red Hat CodeReady Containers, Section 1.5](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.0/html/getting_started_guide/getting-started-with-codeready-containers_gsg){: target=_blank}
- [Installing CodeReady Containers](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.0/html/getting_started_guide/getting-started-with-codeready-containers_gsg#installing-codeready-containers_gsg){: target=_blank}.

## Download Toolkit Iteration Zero

Obtain the Iteration Zerp scripts that will install the Toolkit into CodeReady Containers

- Clone the [ibm-garage-iteration-zero](https://github.com/cloud-native-toolkit/ibm-garage-iteration-zero){: target=_blank} Git repository to your local filesystem

    ```shell
    git clone git@github.com:cloud-native-toolkit/ibm-garage-iteration-zero.git
    ```

- Switch to the cloned directory

    ```shell
    cd ibm-garage-iteration-zero
    ```

## API keys

Configure the keys the CLI uses to authenticate

API keys are not needed to connect to CRC, but the file must still exist.

- Inside the `iteration-zero-ibmcloud` folder, copy `credentials.template` to a file named `credentials.properties`

    ```shell
    cd iteration-zero-ibmcloud
    cp credentials.template credentials.properties
    ```

- Edit the `credentials.properties` file and set the `ibmcloud.api.key` property to the admin password displayed in the terminal when CRC was started.

## Configuration

Configure the properties describing the environment

The settings for installing the Developer Tools go in a single property file in the `./terraform/settings` directory:

- `environment.tfvars` -- Properties for installing the Developer Tools

### Environment variables

Use the  `environment.tfvars` properties to configure the installation for the Development Tools.

- Set the following properties so they match below, all the other properties will be ignored:

    ```text
    # The type of cluster that will be created/used (kubernetes, openshift, or crc)
    cluster_type="crc"
    # Flag indicating if we are using an existing cluster or creating a new one
    cluster_exists="true"
    # Enter any value for the resource group name
    resource_group_name="crc-resource-group"
    # Flag indicating if we are using an existing postgres server or creating a new one
    postgres_server_exists="false"
    ```

## Run Iteration Zero

Run Terraform to install the tools into the CRC environment

Having configured the `credentials.properties`, `environment.tfvars` properties files,
we are now ready to kick off the installation.

- Launch a [Developer Tools Docker container](https://github.com/cloud-native-toolkit/ibm-garage-cli-tools "Cloud Garage Tools Docker image"){: target=_blank}.

    Run the following command to run the Docker container:

    ```shell
    ./launch.sh
    ```

    For more information on the **Developer Tools Image** see the following guide:

    This will install the Cloud Garage Tools Docker image and exec shell into the running container. The container will mount the filesystem's `./terraform/` directory as `/home/devops/src/`. Once the Docker container has started and the script has exec shelled into it, you will see an IBM Garage banner. This will help you identify you are running inside the Docker image that has just mounted your file system.

    The supplied Terraform scripts are ready to run using the settings in the properties files. You optionally can extend or modify the scripts and tailor them for your project's specific needs.

- From inside the terminal/container run this script:

    ```shell
    ./runTerraform.sh
    ```

    This script will setup the Developer Tools in the CRC environment.

    The script will verify some basic settings and prompt if you want to proceed. After you select **Y** (for yes), the Terraform Apply process will begin to create the infrastructure and services for your environment.

    The existing cluster's contents will be cleaned up to prepare for the terraform process. Any resources in the `tools`, `dev`, `test`, and `staging` namespaces/projects will be deleted.

    Installing the tools into an existing cluster takes about 20 minutes.

    !!!success
        You should now have your environment fully provisioned and configured. Enjoy!

## Finish

Once the Terraform scripts have finished, you can see the resources that the scripts created.

To see this:

- Open the OpenShift web console. You should see:
    - Namespaces: `tools`, `dev`, `test`, and `staging`
    - Deployments in the `tools` namespace: `catalyst-dashboard`, `jenkins`, etc.

## Possible issues

If you find that that the Terraform provisioning has failed, try re-running the `runTerraform.sh` script again.  The state will be saved and Terraform will try and apply the configuration to match the desired end state.
