# Provision an IBM Cloud cluster using private catalog

This method will install a managed cluster and the Cloud-Native Toolkit on IBM Cloud using the private catalog tiles installed in the previous step.

!!!Note
    These steps assume the private catalog has been created and populated with the Cloud-Native Toolkit tiles during the [prepare the account](ibmcloud-setup.md#3-create-the-private-catalog) steps.

Select the preferred environment for the cluster to run in, [VPC or Classic](https://cloud.ibm.com/docs/cloud-infrastructure?topic=cloud-infrastructure-compare-infrastructure){: target=_blank} infrastructure.

=== "Virtual Private Cloud"

    1. Log in to the IBM Cloud Console.
    2. Select **Catalog** from the top menu.
    3. From the side menu, select your catalog from the drop-down list (e.g. `Team Catalog`). (**IBM Cloud catalog** should be selected initially.)
    4. Click **Private** on the side menu to see the private catalog entries
    5. Click on the **220. Cloud-Native VPC cluster** tile
    6. Enter values for the variables list provided.

        | **Variable**          | **Description**                                                                               | **eg. Value**                 |
        |-----------------------|-----------------------------------------------------------------------------------------------|-------------------------------|
        | `ibmcloud_api_key`    | The API key from IBM Cloud Console that has ClusterAdmin access and supports service creation | `{guid API key from Console}` |
        | `resource_group_name` | The existing resource group in the account where the cluster will be created                  | `dev-team-one`                |
        | `region`              | The region where the cluster will be provisioned.                                             | `us-east`, `eu-gb`, etc       |
        | `cluster_name`        | The name of the cluster that will be provisioned.                                             | `dev-team-one-iks-117-vpc`    |
        | `vpc_zone_names`      | A comma-separated list of the VPC zones that should be used for worker nodes.                 | `us-south-1` or `us-east-1,us-east-2` |
        | `cluster_type`        | The type of cluster into which the toolkit will be installed. The default is `OpenShift 4.5`. | `kubernetes`, `ocp3`, `ocp4`, `ocp44`, or `ocp45` |
        | `flavor`              | The flavor of machine that should be provisioned for each worker. Defaults to `mx2.4x32`.     | `mx2.4x32`          |
        | `cluster_worker_count`| The number of worker nodes that should be provisioned for each zone. Defaults to `3`          | `3` |
        | `cluster_provision_cos`| Flag indicating that a new Object Storage instance should be provisioned. Defaults to `true` | `true` or `false`          |
        | `cos_name`            | The name of the Object Storage instance (If `cluster_provision_cose` is set to `true` this value is required | `cntk-showcase-cos` |

    7. Check the box to accept the **Apache 2** license for the tile.
    8. Click **Install** to start the install process

    This will kick off the installation of the Cloud-Native Toolkit using an
    IBM Cloud Private Catalog Tile. The progress can be reviewed from the
    **Schematics** entry

=== "Classic Infrastructure"

    1. Log in to the IBM Cloud Console.
    2. Select **Catalog** from the top menu.
    3. From the side menu, select your catalog from the drop-down list (e.g. `Team Catalog`). (**IBM Cloud catalog** should be selected initially.)
    4. Click **Private** on the side menu to see the private catalog entries
    5. Click on the **221. Cloud-Native Classic cluster** tile
    6. Enter values for the variables list provided.

        | **Variable**          | **Description**                                                                               | **eg. Value**                 |
        |-----------------------|-----------------------------------------------------------------------------------------------|-------------------------------|
        | `ibmcloud_api_key`    | The API key from IBM Cloud Console that has ClusterAdmin access and supports service creation | `{guid API key from Console}` |
        | `resource_group_name` | The existing resource group in the account where the cluster will be created                  | `dev-team-one`                |
        | `region`              | The region where the cluster will be provisioned.                                             | `us-east`, `eu-gb`, etc       |
        | `cluster_name`        | The name of the cluster that will be provisioned.                                             | `dev-team-one-iks-117-vpc`    |
        | `private_vlan_id`     | The id of an existing private VLAN.                                                           |   |
        | `public_vlan_id`      | The id of an existing public VLAN.                                                            |   |
        | `vlan_datacenter`     | The VLAN datacenter where the cluster will be provisioned.                                    |   |
        | `cluster_type`        | The type of cluster into which the toolkit will be installed. The default is `OpenShift 4.5`. | `kubernetes`, `ocp3`, `ocp4`, `ocp44`, or `ocp45` |
        | `flavor`              | The flavor of machine that should be provisioned for each worker. Defaults to `m3c.4x32`.     | `m3c.4x32`          |
        | `cluster_worker_count`| The number of worker nodes that should be provisioned for each zone. Defaults to `3`          | `3` |

    7. Check the box to accept the **Apache 2** license for the tile.
    8. Click **Install** to start the install process

    This will kick off the installation of the Cloud-Native Toolkit using an
    IBM Cloud Private Catalog Tile. The progress can be reviewed from the
    **Schematics** entry

## Troubleshooting

If you find that the Terraform provisioning has failed, for Private Catalog delete the workspace and for Iteration Zero  try re-running the `runTerraform.sh` script again.
The state will be saved and Terraform will try and apply the configuration to match the desired end state.

If you find that some of the services have failed to create in the time allocated, try the following with Iteration zero:

1. Manually delete the service instances in your resource group
2. Re-run the `runTerraform.sh` script with the `--delete` argument to clean up the state

    ```shell
    ./runTerraform.sh --delete
    ```
