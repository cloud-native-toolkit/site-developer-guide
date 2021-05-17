# Installing the Cloud-Native Toolkit

Initially the Fast-start installation method is the recommended way to install the Cloud-Native Toolkit, as this is largely an automatic install with minimal choices required that creates a default configuration suitable for learning about cloud native development.

When you want to adopt cloud native development within an enterprise development team, then you may want more control over the installation and configuration of the toolkit.  This section outlines more advanced options available for installing the toolkit.

- IBM Cloud Private Catalog:  This provides a mechanism to easily create and delete instances of the Cloud-Native Toolkit on clusters within the IBM Cloud using the catalog, as you do with other services on the IBM Cloud.
- Iteration-Zero: This is a command line based tool that gives you full control over customizing how the toolkit is installed and what components you want deployed as part of the toolkit.  Iteration-Zero is used by the other install methods, but you can also drive it directly from the command line.

When you want to install your development cluster and the Cloud-Native Toolkit, there are a number of choices you need to make, including:

- what kubernetes distribution do you want your development cluster to use?
- how you want to apply access control to development resources?
- can you use public repositories, registries and source control systems or do you need to host your own?
- what monitoring and logging tools will you use?
- do you want to use the default install of the toolkit or customize it to use a different tools?
- where will you locate the development environment, on a public or private cloud?

These topics are discussed in the [adopting best practices](../best-practices/best-practices.md){: target=_blank} section.

The recommended development cluster for the Cloud-Native Toolkit is using RedHat OpenShift on IBM Cloud using the Virtual Private Cloud Infrastructure.  If you will be using the IBM Cloud to host your development cluster, then proceed to the next section to [configure your IBM Cloud account](./ibmcloud-setup.md).

If you plan to deploy to a different cloud infrastructure, you should proceed to the [provision a cluster](provision-cluster.md) section.
