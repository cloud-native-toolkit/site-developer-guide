# Container Registry strategy

By default an OpenShift cluster will use its internal registry.  This is fine when working within cluster.  Some additional permissions may be needed to allow images to be accessible across projects/namespaces.

!!!Todo
    Add best practices for different registry requirements:

    - internal registry access across projects
    - external registry access (oc get image) - can docker or other container tool access registry or not?
    - moving images from internal registry to external registry
    - install an alternate registry in cluster
    - use an external registry
