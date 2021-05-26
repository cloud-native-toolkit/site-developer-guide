# Install the Cloud Native Toolkit on an existing cluster using GitOps

_This is a work in progress, come back for updates._

Steps to install the Cloud Native Toolkit in an existing OpenShift cluster using a declarative approach with ArgoCD.



## Pre-requisites
The following is required before proceeding to the next section.

- Provision an OpenShift cluster.
- Install the `oc` and `git` cli.
- Install the [Cloud Native Toolkit CLI](http://localhost:8000/learning/dev-setup.html#install-the-cloud-native-toolkit-command-line-interface-cli).


## Installation
1. Fork the [multi-tenancy-gitops](https://github.com/cloud-native-toolkit/multi-tenancy-gitops) repository and clone your fork.
    ```bash
    git clone git@github.com:{gitorg}/multi-tenancy-gitops.git

    cd multi-tenancy-gitops
    ```

1. Update the cloned repository with your GitHub Organization.
    - Search and replace all instances of `github.com/cloud-native-toolkit/multi-tenancy-gitops.git` with `github.com/{gitorg}/multi-tenancy-gitops.git`.
    - Commit and push your changes to your fork.
    ```bash
    git commit -m "Update github organization"
    git push origin master
    ```

3. The gitops repository is structured into different layers (ie. `1-apps`, `2-services`, `3-infra`).  Each layer is structured in a similar pattern consisting of the following:
    - The `argocd` folder contains a set of ArgoCD Application YAMLs.
    - The set of folder(s) in each layer contains the resource YAMLs which will be deployed.
    ```bash
    tree . -L 2
    .
    ├── 0-bootstrap
    │   └── argocd
    ├── 1-apps
    │   ├── argocd
    │   └── instances
    ├── 2-services
    │   ├── argocd
    │   ├── instances
    │   └── operators
    ├── 3-infra
    │   ├── argocd
    │   ├── clusterrole
    │   ├── consolelink
    │   ├── consolenotification
    │   └── namespaces
    ├── 4-rhacm
    │   └── argocd
    ├── README.md
    └── bootstrap.yaml
    ```
    - Each `argocd` folder contains an `active` and `inactive` sub-folder.  For each layer, select the ArgoCD Appliation YAMLs to deploy and move them into the `active` folder.
    ```bash
    1-apps/argocd/
    ├── active
    └── inactive

    2-services/argocd/
    ├── active
    └── inactive

    3-infra/argocd/
    ├── active
    └── inactive
    ```
    -  Commit and push your changes to your fork.
    ```bash
    git commit -m "Update github organization"
    git push origin master
    ```

1. Install the Red Hat OpenShift GitOps operator using the commands below or directly from the OpenShift Web Console.  An instance of ArgoCD will automatically be created in the `openshift-gitops` namespace.
    ```bash
    oc apply -f 2-services/operators/openshift-gitops/ -n openshift-operators
    ```
    - Verify you can log on to the ArgoCD Web Console.
    ```
    # ArgoCD Web Console URL
    echo https://$(oc get route argocd-cluster-server -o jsonpath='{ .spec.host }' -n openshift-gitops)

    # Admin password
    oc extract secret/argocd-cluster-cluster --to=- -n openshift-gitops
    ```

1. Review and apply the custom ClusterRole permissions to the ArgoCD Application Controller service account.  This is required for ArgoCD to create the required Kubernetes resources in target namespaces.
    ```bash
    oc apply -f 3-infra/clusterrole/
    ```

1. Create the bootstrap ArgoCD application.
    The bootstrap application will create the parent ArgoCD Application for each layer (YAMLs are located in `0-bootstrap` folder).
    The parent ArgoCD Applications will subsequently create the ArgoCD Applications in the `/argocd/active` directory.

    Depending on what resources have been selected, it will take some time for the ArgoCD to deploy the resources.
    ```bash
    oc apply -f bootstrap.yaml -n openshift-gitops
    ```

1. From the OpenShift Web Console, verify the resources (ie, operators, namespaces, etc) have been successfully created and/or deployed.
