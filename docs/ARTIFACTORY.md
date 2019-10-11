
# Artifact management with Artifactory

Artifactory offers an open source instance to enable the storage of versioned and tagged resource that are not suitable to the IBM Cloud Image Registry. This can include a number of artifacts `jar` files, `npm` modules and many more. The real value for a developer is the ability to package and verion the `helm chart` artifacts so they can be used to deploy Docker images into multiple development environments and production. 

The following instruction explain how to setup Artificatory after installing into your development environment. It completes with explaination of how the Continuous Integration pipeline can package and store the `helm chart` into a Helm Registry using Artifactory to host this. This enables a near seemless ability to integrate with Continous Delivery software like `Argo CD`.

## 



