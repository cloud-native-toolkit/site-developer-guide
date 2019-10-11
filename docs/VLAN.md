# Get the the VLAN Informaiton

## Overview
To enable Terraform to create a working development cluster we need to obtain the VLAN information from the Classic platform.  

You can access this information for the public and private VLANs information by accessing the `Classic Infrastructure` from the IBM Cloud console, and then selecting `Network > IP Management > VLANs` 

Another way is to install and use the Catalyst Tools CLI as shown in Step 1. 

Once obtained, the VLAN information will need to be written to a variables file as shown in Step 2.  After you have updated your VLAN values you can return to the README and continue with the installation instructions.

## Instructions

### Step 1. Install the Catalyst Tools CLI
To make getting this information as simple as possible we have added a command to the helper CLI tool that will create this information in a format that is easy to cut/paste into the `terraform.tfvars` settings file. 

- Install the [IBM Garage Catalyst Tools CLI](https://github.ibm.com/garage-catalyst/ibmcloud-garage-cli):
    ```bash
    npm i -g @garage-catalyst/ibm-garage-cloud-cli
    ````
- Log into your IBM Cloud Account with the correct region and resource group:
    ```bash
    ibmcloud login -a cloud.ibm.com -r <region> -g <resource group>
    ```
- Run the CLI command to obtain the VLAN information:
    ```bash
    igc vlan
    ```
    You will now have a set of properties that can be directly copied into your `terraform.tfvars`.

### Step 2. Set the Terraform Variables
- Open the file `terraform.tfvars` and paste the values from the above output into the file, and save.
    ```bash
    vi ./terraform/settings/terraform.tfvars
    ```
    These values should look something like the example below. You should have a resource group `catalyst-team` with private VLAN `2372`, public VLAN `1849` in the DAL10 datacenter. Our `terraform.tfvars` would look accordingly:
    ```terraform
    private_vlan_id="237288"
    private_vlan_number="2372"
    private_vlan_router_hostname="bcr01a.dal10"
    public_vlan_id="1849487"
    public_vlan_number="1849"
    public_vlan_router_hostname="fcr01a.dal10"
    vlan_datacenter="dal10"
    vlan_region="us-south"
    resource_group_name="catalyst-team"
    cluster_name="catalyst-team-cluster"
    ```

    **NOTE:** You can install the tools into a brand new cluster or into an existing cluster change the following settings in the same `terraform.tfvars` file. Set the values to `true` if you are using an existing postgres make sure its provisioned into the same data center as the base cluster.

    ```bash
    # Flag indicating if we are using an existing cluster or creating a new one
    cluster_exists="false"
    # The type of cluster that will be created/used (kubernetes or openshift)
    cluster_type="kubernetes"
    # Flag indicating if we are using an existing postgres server or creating a new one
    postgres_server_exists="false"
    ```

    **NOTE:** If you would like to use an existing cluster, change the value of `cluster_name` in the `terraform.tfvars` to the name of that cluster.

