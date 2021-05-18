# Container Registry strategy

By default an OpenShift cluster will use its internal registry.  This is fine when working within cluster.  Some additional permissions may be needed to allow images to be accessible across projects/namespaces.

An Image Registry is a repository of versioned container images. It is perhaps a subset of the larger [Artifact Management](../../reference/tools/artifactory.md) topic but has special considerations.

A specific protocol has been defined around building, pushing, tagging and pulling container images to and from an Image Repository. Typically, the [continuous integration](../../learning/fast-ci.md) process is responsible for verifying and building the application source into an image and pushing it into the registry. At deployment time, the deployment descriptor (e.g. kubernetes resource definition) references the image at its location within the image registry and the container platform pulls the image and manages the running image in the cluster. Tools like `skopeo` can also be used within the process to copy images from one registry to another.

There are a number of options available for the Image Registry, both running in-cluster and outside of the cluster. Red Hat OpenShift
even provides an image registry as part of the platform. While an intermediate image registry might be used during the CI process,
in an enterprise environment it is ideal to have a centrally managed image registry from which vulnerability scans, certifications, and backups can be performed. Some of the available options include:

- [IBM Cloud Image Registry](../../reference/tools/ibm-cloud-container-registry.md)
- [Artifactory](../../reference/tools/artifactory.md)
- Nexus
- Red Hat OpenShift image streams
