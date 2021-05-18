# Provision the cluster

Provides the considerations and steps to prepare an OpenShift cluster for an installation of Cloud-Native Toolkit environment.

## 1. Provision the cluster

Provisioning the OpenShift cluster is the minimum requirement to prepare for the Toolkit install. The cluster could be OpenShift CRC running on a laptop, a cloud-managed OpenShift cluster on AWS or Azure, or an on-premise install of OpenShift. We'll leave the steps to provision to you since the details will vary considerably depending upon the approach. However, whichever platform you use we highly recommend utilizing or developing automation scripts to perform the provisioning, so that it can be done repeatably.

Here are some resources that might help get started:

- [OpenShift CRC setup](install-crc.md){: target=_blank}
- [OpenShift on AWS](https://github.com/ibm-cloud-architecture/terraform-openshift4-aws){: target=_blank}
- [OpenShift on GCP](https://github.com/ibm-cloud-architecture/terraform-openshift4-gcp){: target=_blank}
- [OpenShift on Azure](https://github.com/ibm-cloud-architecture/terraform-openshift4-azure){: target=_blank}
- [OpenShift on VMWare](https://github.com/ibm-cloud-architecture/terraform-openshift4-vmware){: target=_blank}

!!!Information
    The Cloud-Native Toolkit is not responsible for maintaining the Terraform scripts provided in the links above and does not give any guarantee as to their current condition. If there are any issues with those scripts it would be best to pursue it with the maintainers by raising issues against the appropriate repository.

## 2. Configure access to the cluster

In order to interact with the cluster, user credentials need to be established having Cluster Admin rights. The initial `kubeadmin` user (or whatever name is used after it is changed) can be used or a new user can be added for use by the provisioning scripts.

## Next steps

Now that the cluster has been provisioned and the access control has been configured, you are ready to move to the next step and perform the installation with the Toolkit. Before moving on, be sure to record the following information:

- OpenShift login user (user id with Cluster Admin permission)
- OpenShift login password
- OpenShift server url

Once you have your cluster deployed you can use the fast-start install, used in the learning the toolkit section, or the Iteration Zero process.
