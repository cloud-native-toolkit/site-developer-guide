# Configure Account

Set up the account so the environment can be installed

!!!Note
    An **account manager** performs the steps on this page. See [Plan Installation > Roles](plan-installation.md#roles){: target=_blank} for the overview of the roles involved.

!!!Info
    The video in [Resource Access Management > Configuration Process](../../../resources/ibm-cloud/access-control.md#configuration-process){: target=_blank} shows how to perform the steps in this process.


## Configure IBM Cloud account

The account must provide a few resources that will be needed to install and use the environment:

- A public/private pair of VLANs
- A resource group
- A pair of access groups for the admin and users

These are the steps an account manager should perform to configure the account.

### Upgrade the image registry

First, we'll upgrade the service plan for the [image registry](../../../reference/tools/ibm-cloud-container-registry.md){: target=_blank} so that is has more capacity.

- Set the registry plan

    ```shell
    ibmcloud cr plan-upgrade standard
    ```

Now we can store more container images.

### Prepare to run scripts

Second, we'll use some scripts in the steps below to help create access groups. Here, we'll download the scripts and prepare to run them. (If you want to use the console to manually configure the access groups, you can skip this step.)

Clone the Git repository with the scripts. (This repo also has the scripts for installing the environment.)

- Clone the [ibm-garage-iteration-zero](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero){: target=_blank} Git repository to your local filesystem

    ```shell
    git clone git@github.com:ibm-garage-cloud/ibm-garage-iteration-zero.git
    ```

- Switch to the cloned directory

    ```shell
    cd ibm-garage-iteration-zero
    ```

The scripts need you to log into IBM Cloud first. In the terminal you'll use to run the scripts, log in to IBM Cloud.

- Log in to the IBM Cloud CLI

    ```shell
    ibmcloud login -a cloud.ibm.com -r <region>
    ```

!!!Note
    The steps below need to be repeated for each new environment:

    - Each environment can be in a different data center. For each new environment, select the data center to host it and ensure it has a pair of public/private VLANs for the environment to use. Two environments in the same data center can share a pair of VLANs, or each can be given a separate pair of VLANs.
    - Each environment needs its own resource group and pair of access groups for administrators and users.
    - Each environment will need its own cluster, whether it's created by an account manager or an environment administrator.

### Data center

Third, decide which [IBM Cloud location](https://cloud.ibm.com/docs/overview?topic=overview-zero-downtime#ov_intro_reg "Locations for resource deployment"){: target=_blank} will host the environment. That will be specified with two settings:

- Region -- A geography such as *us-south* or *eu-gb*
- Zone -- A [data center](https://cloud.ibm.com/docs/overview?topic=overview-zero-downtime#data_center){: target=_blank} in the region such as *dal10* or *lon02*

### Public and private VLANs

Fourth, create or provide a pair of public and private VLANs for the selected region and zone. These VLANs will implement the public and private networks in the Kubernetes or OpenShift cluster.

<InlineNotification>

!!!Note
    If your account already has a pair of VLANs for your desired region and zone, you can use those.

- Use the [Toolkit CLI's](../../../reference/cli.md){: target=_blank} `igc vlan` command to select two existing VLANs and generate the properties to use for the installation scripts

These links help explain how to find the VLANs an account has, create more, and how a cluster uses them to implement its network.

Use the console to manage VLANs:

- List existing VLANs: [Resources > Classic Infrastructure > IP Management > VLANs](https://cloud.ibm.com/classic/network/vlans){: target=_blank}
- Create a VLAN: [Catalog > Services > Networking > VLAN](https://cloud.ibm.com/catalog/infrastructure/vlan){: target=_blank}

Read the docs on using VLANs:

- [Getting started with VLANs](https://cloud.ibm.com/docs/infrastructure/vlans){: target=_blank}
- [Understanding network basics of classic clusters](https://cloud.ibm.com/docs/containers?topic=containers-plan_clusters#plan_basics){: target=_blank}
- [Overview of classic networking in IBM Cloud Kubernetes Service](https://cloud.ibm.com/docs/containers?topic=containers-subnets#basics){: target=_blank}

### Resource group

Fifth, create or provide a [resource group](https://cloud.ibm.com/docs/resources?topic=resources-rgs){: target=_blank}. This resource group will control access to the environment's cluster and service instances. This resource group should typically be named after the development team, its project, or the application it is implementing.

!!!Warning
    **The resource group name should be 24 characters or fewer, and should conform to [Kubernetes resource naming conventions](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names){: target=_blank}**--the name should be all lowercase letters, digits, and the separators should be dashes. (The Cloud-Native Toolkit installation scripts will name the cluster `<resource-group>-cluster`, and a cluster name is limited to 32 characters.)

We give our resource groups names like `mooc-team-one`, `garage-dev-tools`, `gct-showcase`, etc.

- [Create the resource group](https://cloud.ibm.com/account/resource-groups){: target=_blank}

### Kubernetes service API key

Sixth, to create clusters in the resource group, the account will need API keys for the container service to [create resources in the classic infrastructure](https://cloud.ibm.com/docs/containers?topic=containers-access_reference#infra){: target=_blank}. A separate API key is needed for each region and resource group. An account manager should use [the account's functional ID](./admin/plan-installation#functional-id-for-infrastructure-permissions){: target=_blank} to set the API key(s) for the new resource group.

Create an API key for the resource group and the data center's region:

- Log into the IBM Cloud CLI [using the functional ID key](https://cloud.ibm.com/docs/iam?topic=iam-federated_id#api_key){: target=_blank} created by the account owner

    ```shell
    ibmcloud login --apikey @key_file_name
    ```

- Perform these steps to set the API key: [Setting up the API key to enable access to the infrastructure portfolio](https://cloud.ibm.com/docs/containers?topic=containers-users#api_key){: target=_blank}

    ```shell
    ibmcloud ks api-key reset --region <region>
    ```

- The [list of existing API keys](https://cloud.ibm.com/iam/apikeys){: target=_blank} shows the new key named `containers-kubernetes-key`; the description specifies the resource group and region

### Access group for environment administrators

Seventh, create an access group to grant the necessary permissions for installing a environment. Do this by running a script, or by using the console to manually perform the steps in the script. Also, add the environment administrator(s) (who is the user who will run the scripts to create the environment) to this group.

To create the access group for the environment administrators:

- Create a new [access group](https://cloud.ibm.com/docs/iam?topic=iam-account_setup){: target=_blank}, name it something like `<resource_group>-ADMIN` (all capital letters)
- Run the script `./terraform/scripts/acp-admin.sh`, which adds the necessary policies to the access group
- Add the environment administrator(s) to the group

The script adds policies that allow the user to add resources to the resource group:

- Permission to create clusters
- Permission to manage the IBM Cloud Container Registry (used as the environment's [image registry](../../../reference/tools/ibm-cloud-container-registry.md){: target=_blank})
- Permission to create service instances

### Access group for environment users

Eighth, create an access group to enable users (e.g. developers, data scientists, etc.) to access the resources in the environment. This can be done later, after the environment is created, either by running a script or using the console. Also, add the users who will use the environment (e.g. developers, etc.) to this group.

To create the access group for the environment users:

- Create a new [access group](https://cloud.ibm.com/docs/iam?topic=iam-account_setup){: target=_blank}, name it something like `<resource_group>-USER` (all capital letters)
- Run the script `./terraform/scripts/acp-user.sh`, which adds the necessary policies to the access group
- Add the users to the group

The script adds policies that allow the user to use resources to the resource group:

- Access to the resource group
- Access to the cluster
- Access to the image registry
- Access to each of the services in the resource group

### Cluster for the environment (optional)

Ninth, if the environment administrator will install the environment including creating a new cluster, then skip this step. However, if the environment administrator will install the environment into an existing cluster, then the account manager must create the cluster for the environment administrator.

Create the cluster that the environment will be installed into. Create either a Kubernetes cluster or Red Hat OpenShift cluster as needed. A typical cluster size is single zone, 3 nodes, each 8 vCPUs 32GB RAM.

To configure RBAC security in the cluster:

- Run the script `./terraform/scripts/rbac.sh`, which configures RBAC inside the cluster

## Configuration settings

The account manager needs to pass the following values about the account configuration to the environment administrator:

- The region for the environment
- The resource group for the environment

If the cluster already exists:

- Cluster type (Kubernetes or Red Hat OpenShift)
- Cluster name

If the environment administrator will create the cluster:

- For the public/private VLAN pair: the region, data center, and VLAN IDs

## Conclusion

The account manager has now configured the account so that the environment administrator can install the environment, and has passed the configuration settings to the environment administrator.
