# Fast-Start Install

This section will guide you through installing the Cloud-Native Toolkit suitable for learning how to use the toolkit.

Fast-start installation does not install the base Kubernetes cluster.  You need to provide the cluster before starting the toolkit installation.

## Choosing a Kubernetes cluster option

The toolkit can be installed over the Kubernetes Service running on IBM Cloud or a Red Hat OpenShift cluster.  However, the fast-start installer only works against a Red Hat OpenShift cluster :

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

    This option provides a managed Kubernetes cluster running on the IBM Cloud.

    - Managed Kubernetes environment
    - Incurs costs
    - No local resources needed to run cluster

=== "Red Hat OpenShift"
    #### Red Hat OpenShift

    This option allows you to use your own installation of RedHat OpenShift as the learning environment for the Cloud-Native Toolkit.  You can install OpenShift to your own hardware or use a third party cloud provider.

    !!!Warning
        This option requires you to setup and configure an OpenShift or OKD cluster, so assumes you have the environment and skills to complete this task.  If not it is recommended that you select one of the other options

    - run on local hardware, virtualized infrastructure or cloud provider
    - need your own OpenShift licenses
    - the cluster must have a default storage class configured, so a persistent volume claim will be satisfied

    !!!Note
        OKD is a community distribution of OpenShift.  The fast-start installer assumes access to the RedHat Operator Hub so it can install components such as OpenShift Pipelines, so OKD is not supported.

=== "CodeReady Containers"
    #### CodeReady Containers

    CodeReady Containers is a cut-down version of OpenShift to provide a local development environment on your laptop or workstation.  It is freely available, but does have some limitations.

    - Run locally on laptop or workstation
    - no runtime costs
    - Need 16GB memory or greater in host system
    - No remote access from public internet services, such as github
    - cluster access only from host system by default - no remote access to cluster over network

=== "Open Labs cluster"
    #### Open Labs cluster

    Open Labs is an IBM provided online learning environment.  You can access a RedHat OpenShift cluster without needing to install anything locally to your laptop or workstation.

    - No local resources needed to run cluster
    - No runtime costs
    - Limited time cluster - enough time to complete the learning material, but clusters get automatically cleaned up after a few hours

## Obtaining your Kubernetes Cluster

Select the option you want for your cluster, then follow the instructions.

=== "OpenShift on IBM Cloud"
    #### Red Hat OpenShift running on IBM Cloud

    1. Sign into your IBM account
    2. Navigate to the Catalog using the link at the top of the IBM Cloud web console
    3. Search for OpenShift and select RedHat OpenShift on IBM Cloud
    4. Create a cluster.  On the options page:
        - If working in your company account check with your account admin about the OpenShift licence entitlement, and make the appropriate entitlement choice.  Otherwise, leave the OCP entitlement option at the default to purchase the needed licenses
        - Leave the Infrastructure as **Classic**
        - If you have a preferred Resource Group you need to use, select it here.  Check with your account admin to verify the resource group you should use if working in a company account.  Otherwise, leave as **Default**
        - Select your preferred Geography.  It is best to select the closest geography to your location
        - Select availability to **single zone** as this cluster will be used for training, so Multi-zone is not needed
        - Select the worker zone closest to your location
        - Enter a cluster name in the Resource details section
        - Press **Create** to create your cluster
    5. Wait for the cluster to deploy - this can take several minutes, but while waiting you can install the IBM Cloud command line interface (CLI) in the next step
    6. If you don't already have the ibmcloud CLI installed on your workstation you need to install it.  The instructions can be found in the [IBM Cloud documentation](https://cloud.ibm.com/docs?tab=develop){: target="_blank" .external }
    7.  When the OpenShift Cluster has been deployed, use the button on the IBM Cloud web console to launch the **OpenShift web console**
    8. If you don't already have the OpenShift command line interface (CLI) installed on your workstation, you should install it now.  The installation image can be downloaded from the OpenShift web console.  Select the help icon (question mark) next to your user name at the top of the web console.  Select Command Line Tools from the menu, then download and install the appropriate version of the oc CLI for your workstation.
    9.  Open a command terminal window on your workstation (where the ibmcloud and oc command line tooling has been installed)
    10. Login to the IBM Cloud with command `ibmcloud login` if you belong to a company account that has single sign on enabled, then the command is `ibmcloud login --sso`.  If your IBM Cloud account has access to multiple accounts and you get an option to choose the account during the login process, ensure you select the account where the OpenShift cluster was deployed.
    11. If you don't see the Resource Group in the account summary presented after logging in.  Use command `ibmcloud target -g Default` to target the correct Resource Group (this is the resource group used when deploying the cluster.  The default value is **Default**)
    12. Click the dropdown next to your username at the top of the OpenShift web console and select **Copy Login Command**.  Select Display Token and copy the oc login command from the web console and paste it into the terminal on your workstation.  Run the command to login to the cluster on the command line
    13. Move to the next step to install the toolkit

=== "Red Hat OpenShift"
    #### Red Hat OpenShift

    1. Install the OpenShift or OKD cluster:
        - For OpenShift follow the [install instructions](https://docs.openshift.com/container-platform/4.7/installing/index.html){: target="_blank" .external } for your preferred environment

        !!!Todo
            Add any additional post install configuration steps needed here - storage class?
    
    2. Once installed you need to ensure you can sign onto the OpenShift cluster using the web console (see the Web console section in the docs for details on how to access the console).  
    3. Once you are signed into the console you can download and install the OpenShift Command Line Interface (CLI) tools.  The CLI tools are available from the question mark icon next to you login name at the top of the OpenShift console, or from [Red Hat](https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/){: target="_blank" .external }.
    4. On your local workstation or laptop open a command prompt and sign in to your OpenShift cluster.  The exact command needed is available from the OpenShift web console, select your name at the top of the screen, then in the dropdown select the **Copy login command** link.  This will open a screen where you can select **Display Token** (you may be asked to authenticate again before the token is displayed) then you can copy the command line command needed to login to the cluster.

=== "CodeReady Containers"
    #### CodeReady Containers

    1. Navigate to the [Red Hat CodeReady Containers](https://developers.redhat.com/products/codeready-containers/overview){: target="_blank" .external } site.
    2. Select **Install OpenShift on your laptop** button and follow the instructions to install CodeRead Containers to your laptop.  Ideally you want to increase the resources available to CodeReady containers, so use the command line options to increase memory to as much as you can spare on your laptop or workstation and expand the disk size if possible.

        !!!Warning
            CodeReady Containers needs to adjust your laptop networking, so on some platforms it will not work alongside VPN clients needed to access corporate networks.  If you need to run a VPN client, then you can install CodeReady Containers in a virtual machine on your laptop and work inside the virtual machine to access CodeReady Containers.
    
    3. Download and install the OpenShift Command Line Interface (CLI) tools.  The CLI tools are available from the question mark icon next to you login name at the top of the OpenShift console - see [section 3.3.1 in the CodeReady Containers Getting Started Guide](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.25.0/html/getting_started_guide/using-codeready-containers_gsg#accessing-the-openshift-web-console_gsg), or from [Red Hat](https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/){: target="_blank" .external }.
    4. Once you have the CodeReady Containers CLI installed you need to login to the cluster - this is covered in the [CodeReady Containers Getting Started Guide - section 3.3.2](https://access.redhat.com/documentation/en-us/red_hat_codeready_containers/1.25.0/html/getting_started_guide/using-codeready-containers_gsg#accessing-the-openshift-cluster-with-oc_gsg){: target="_blank" .external }
    5. Move onto the next section to install the Cloud-Native Toolkit

    !!!Todo
        What to do about github access - local server?

=== "Open Labs cluster"
    #### Open Labs cluster

    1. Navigate to the [IBM Open Labs - Red Hat OpenShift on IBM Cloud](https://developer.ibm.com/openlabs/openshift){: target="_blank" .external }
    2. Select the **Bring Your Own Application - Launch Lab** button
    3. Sign-in to the IBM Cloud or sign up if you don't already have an IBM account
    4. When the Lab has been launched, forward the instructions in the left panel to show the 2nd page, **Quick Links and Common Commands**.  Here you can see the command line commands to log into your IBM cloud account and also the OpenShift cluster.
    
        1. Log into the IBM cloud using the command prompt on the left side of the lab browser screen.  Use the `ibmcloud login` command.  Enter your email then password when prompted then select account **DTECLOUD**.  Press enter to skip selecting a region and choose 'N' if prompted to update the ibmcloud utility.
        2. Log into the OpenShift cluster using the `oc login` command shown in the left pane.  You can double click the command in the right side panel to copy it across to the left hand panel in the UI.  Press enter to run it.
    
    5. Install the Cloud-Native Toolkit Command Line Interface (CLI).  Copy and paste the code blocks below into the right panel of the Labs UI to install Node.js and then the toolkit CLI:

        !!!Todo
            should this be in the learning section for developer setup?

        1. Create the installation directory.  This command will prompt you for the student password.  Above the terminal window there are a set of icons.  One is a key icon.  Press the key icon to see a set of credentials.  The student password is in the SSH section of the Service Information panel, identified by **pass**

            ```shell
            sudo mkdir -p /usr/local/lib/nodejs
            ```

        2. install Node.js using commands:

            ```shell
            wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz
            sudo tar -xJvf node-v14.16.1-linux-x64.tar.xz -C /usr/local/lib/nodejs
            ```

            ```shell
            cat <<EOF >> .shellrc
            # Nodejs
            export PATH=/usr/local/lib/nodejs/node-v14.16.1-linux-x64/bin:$PATH
            EOF
            . ./.shellrc
            ```

        3. install the Toolkit CLI
        
            ```shell
            sudo PATH=/usr/local/lib/nodejs/node-v14.16.1-linux-x64/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin /usr/local/lib/nodejs/node-v14.16.1-linux-x64/bin/npm i -g @ibmgaragecloud/cloud-native-toolkit-cli
            ```

    6. The OpenLabs have an hour default duration.  This can be extended to give you more time to complete a lab using the clock icon above the terminal panel.  You should extend the lab session to allow you to complete the learning.

        !!!Warning
            The remaining time for the lab session is shown above the terminal panel.  This is a countdown clock.  When it reaches 00:00:00 your lab session will be automatically terminated and cleaned up without any prompts or warnings, so be sure to extend any lab session as needed before it counts down to 00:00:00

    7. You can access the OpenShift web console using the link in the **Quick Links** section in the left panel of the Labs user interface.  Clicking the link will open the console in a new tab.
    8. Jump to the next section and use the command in the **Linux / MacOS** tab to install the Cloud-Native Toolkit - run the command on the command line in the left panel of the lab screen.  You must have completed the `oc login` command, detailed in step 4 above, before starting the toolkit install

## Installing the toolkit

To install the toolkit perform the following steps:

1. In a command or terminal window ensure you are logged onto your cluster (**oc login** or **kubectl login**) with an admin account with the ability to create new namespaces/projects on the cluster and setup RBAC security.
2. Run the following command (choose your operating system):

    === "Linux / MacOS"

        ```shell
        curl -sfL get.cloudnativetoolkit.dev | sh -
        ```

    === "Windows"

        ```Powershell
        oc create -f https://raw.githubusercontent.com/cloud-native-toolkit/ibm-garage-iteration-zero/master/install/install-ibm-toolkit.yaml
        sleep 5
        oc wait pod -l job-name=ibm-toolkit --for=condition=Ready -n default
        oc logs job/ibm-toolkit -f -n default
        ```
3. Wait for the terraform scripts to complete the installation of the toolkit - this can take several minutes
