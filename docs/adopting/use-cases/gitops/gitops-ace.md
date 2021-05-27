# Install App Connect on an existing cluster using GitOps

<!--- cSpell:ignore gitid kubeseal cntk -->

_This is a work in progress, come back for updates._

Steps to install App Connect in an existing cluster using ArgoCD.

## Pre-requisites

The following is required before proceeding to the next section.

- Provision an OpenShift cluster.
- IBM Cloud Pak Entitlement Key

## Installation

1. Fork the [multi-tenancy-gitops](https://github.com/cloud-native-toolkit/multi-tenancy-gitops) repository and clone your fork.

    ```shell
    git clone git@github.com:{gitid}/multi-tenancy-gitops.git
    ```

1. Install the Red Hat OpenShift GitOps operator.

  ```shell
  cd multi-tenancy-gitops

  oc apply -f 2-services/operators/openshift-gitops/
  ```

1. Update your repository to reference your forked repository.  Search and replace `cloud-native-toolkit` GithUb Org references with your {gitid}.

1. Create the bootstrap ArgoCD application.

    ```shell
    oc apply -f bootstrap.yaml -n openshift-gitops
    ```

1. Generate an encrypted Secret containing the IBM Entitlement Key using Sealed Secret Operator.
    - Install [kubeseal](https://github.com/bitnami-labs/sealed-secrets/blob/main/README.md) CLI.
    - Encrypt IBM Entitlement Key Secret.

    ```shell
    NAMESPACE=tools
    IBM_ENTITLEMENT_KEY=<Entitlement Key>

    # Create Secret YAML containing Entitlement Key
    oc create secret docker-registry ibm-entitlement-key \
    --docker-username=cp \
    --docker-server=cp.icr.io \
    --docker-password=${IBM_ENTITLEMENT_KEY} \
    --namespace=${NAMESPACE} \
    --dry-run=true -o yaml > delete-ibm-entitled-key-secret.yaml

    # Encrypt the secret using kubeseal and private key from the cluster
    kubeseal -n ${NAMESPACE} --controller-name=sealedsecretcontroller-sealed-secrets --controller-namespace=sealed-secrets -o yaml < delete-ibm-entitled-key-secret.yaml > ibm-entitled-key-secret.yaml
    ```

1. Apply the yaml manually or add to your gitops git repo to be deploy via ArgoCD.

    ```shell
    oc apply -f enc-ibm-entitled-key-secret.yaml
    ```

1. Verify the infrastructure and cluster wide resources under the `3-infra` folder are created successfully.

    ```text
    3-infra/
    ├── argocd-apps
    │   ├── consolelink.yaml
    │   ├── consolenotification.yaml
    │   ├── namespace-ci.yaml
    │   ├── namespace-dev.yaml
    │   ├── namespace-istio-system.yaml
    │   ├── namespace-openldap.yaml
    │   ├── namespace-qa.yaml
    │   ├── namespace-sealed-secrets.yaml
    │   ├── namespace-staging.yaml
    │   └── namespace-tools.yaml
    ├── consolelink
    │   └── consolelink.yaml
    ├── consolenotification
    │   └── consolenotification.yaml
    └── namespaces
        ├── ci
        │   ├── namespace.yaml
        │   └── rolebinding.yaml
        ├── dev
        │   └── namespace.yaml
        ├── istio-system
        │   └── namespace.yaml
        ├── openldap
        │   └── namespace.yaml
        ├── qa
        │   └── namespace.yaml
        ├── sealed-secrets
        │   ├── namespace.yaml
        │   └── operatorgroup.yaml
        ├── staging
        │   └── namespace.yaml
        └── tools
            ├── namespace.yaml
            └── operatorgroup.yaml
    ```

    ![ArgoCD deployments of 3-infra](images/argocd-cntk-3-infra.png){.center}

1. Verify the operators and instances of custom resource definitions under the `2-services` folder are created successfully.

    ```text
    2-services/
    ├── active
    │   ├── instances
    │   │   └── argocd
    │   └── operators
    │       └── argocd
    └── inactive
        ├── instances
        │   ├── argocd
        │   │   ├── artifactory.yaml
        │   │   ├── cert-manager-instance.yaml
        │   │   ├── cntk-pipeline-tasks.yaml
        │   │   ├── developer-dashboard.yaml
        │   │   ├── ibm-mq-prod-instance.yaml
        │   │   ├── ibm-mq-staging-instance.yaml
        │   │   ├── ibm-platform-navigator-instance.yaml
        │   │   ├── openldap.yaml
        │   │   ├── pact-broker.yaml
        │   │   ├── sealed-secrets-instance.yaml
        │   │   ├── sonarqube.yaml
        │   │   └── swaggereditor.yaml
        │   ├── artifactory
        │   │   ├── Chart.yaml
        │   │   └── values.yaml
        │   ├── cert-manager
        │   │   └── instance.yaml
        │   ├── cloud-native-toolkit
        │   │   └── release-v2.6.10.yaml
        │   ├── dev
        │   ├── developer-dashboard
        │   │   ├── Chart.yaml
        │   │   └── values.yaml
        │   ├── ibm-platform-navigator
        │   │   └── ibm-platform-navigator.yaml
        │   ├── openldap
        │   │   ├── Chart.yaml
        │   │   └── values.yaml
        │   ├── pact-broker
        │   │   ├── Chart.yaml
        │   │   └── values.yaml
        │   ├── prod
        │   ├── sealed-secrets
        │   │   └── instance.yaml
        │   ├── sonarqube
        │   │   ├── Chart.yaml
        │   │   └── values.yaml
        │   ├── staging
        │   └── swaggereditor
        │       ├── Chart.yaml
        │       └── values.yaml
        └── operators
            ├── argocd
            │   ├── cert-manager.yaml
            │   ├── ibm-catalogs.yaml
            │   ├── ibm-cp4i-operators.yaml
            │   ├── ibm-foundations.yaml
            │   ├── ibm-platform-navigator.yaml
            │   ├── jaeger.yaml
            │   ├── openshift-pipelines.yaml
            │   └── sealed-secrets.yaml
            ├── cert-manager
            │   └── operator.yaml
            ├── ibm-catalogs
            │   ├── Chart.yaml
            │   └── values.yaml
            ├── ibm-cp4i-operators
            │   ├── Chart.yaml
            │   └── values.yaml
            ├── ibm-foundation
            │   ├── Chart.yaml
            │   └── values.yaml
            ├── ibm-platform-navigator
            │   ├── Chart.yaml
            │   └── values.yaml
            ├── jaeger
            │   ├── Chart.yaml
            │   └── values.yaml
            ├── openshift-pipelines
            │   └── operator.yaml
            └── sealed-secrets
                ├── Chart.yaml
                └── values.yaml
    ```

    ![ArgoCD deployments of 2-services](images/argocd-ace-2-services.png)
