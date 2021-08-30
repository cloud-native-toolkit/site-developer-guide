# Install IBM Cloud Paks using a GitOps workflow

<!--- cSpell:ignore gitorg YAMLs -->

The GitOps concept originated from [Weaveworks](https://www.weave.works/) back in 2017 and the goal was to automate the operations of a Kubernetes (K8s) system using a model external to the system as the source of truth ([History of GitOps](https://www.weave.works/blog/the-history-of-gitops)).   

There are various GitOps workflows this is our opinionated point of view on how `GitOps` can be used to manage the infrastructure, services and application layers of K8s based systems.  It takes into account the various personas interacting with the system and accounts for separation of duties.  

Refer to the [https://github.com/cloud-native-toolkit/multi-tenancy-gitops](https://github.com/cloud-native-toolkit/multi-tenancy-gitops) repository for instructions to try out the GitOps workflow.  It is focused around deploying [IBM Cloud Paks](https://www.ibm.com/cloud/paks) on the [Red Hat OpenShift](https://cloud.redhat.com/learn/what-is-openshift) platform.


## GitOps Principles 
With the ever growing adoption of GitOps, the [OpenGitOps](https://opengitops.dev/) project was started in 2021 to define a set of open-source standards and best practices.  These will help organizations adopt a standard and structured approach when implementing GitOps.  It is currently a [CNCF Sandbox project](https://www.cncf.io/sandbox-projects/).  

The [GitOps Working Group](https://github.com/gitops-working-group/gitops-working-group) has released v0.1.0 of the [**GitOps Priniciples**](https://opengitops.dev/#principles):

1. **The principle of declarative desired state**: A system managed by GitOps must have its Desired State expressed declaratively as data in a format writable and readable by both humans and machines.
2. **The principle of immutable desired state versions**: Desired State is stored in a way that supports versioning, immutability of versions, and retains a complete version history.
3. **The principle of continuous state reconciliation**: Software agents continuously, and automatically, compare a system's Actual State to its Desired State. If the actual and desired states differ for any reason, automated actions to reconcile them are initiated.
4. **The principle of operations through declaration**: The only mechanism through which the system is intentionally operated on is through these principles.


## GitOps Repository Structure
There are a total of 4 Git repositories involved with the GitOps workflow.  

- [Main GitOps repository](#gitops) - Repository that the various [personas](#personas) will interact with to update the desired state of the OpenShift cluster. 
- [Infrastructure repository](#infrastructure-layer) - Repository 
- [Services repository](#services-layer) 
- [Application repository](#application-layer) 


### **GitOps**
- Main GitOps repository ([https://github.com/cloud-native-toolkit/multi-tenancy-gitops](https://github.com/cloud-native-toolkit/multi-tenancy-gitops)): This repository contains all the ArgoCD Applications for  the `infrastructure`, `services` and `application` layers.  Each ArgoCD Application will reference a specific K8s resource (yaml resides in a separate git repository), contain the configuration of the K8s resource, and determine where it will be deployed into the cluster.  

- Directory structure for `single-cluster` or `multi-cluster` profiles:

    ```bash
    .
    ├── 1-infra
    ├── 2-services
    ├── 3-apps
    ├── bootstrap.yaml
    └── kustomization.yaml
    ```

The contents of the `kustomization.yaml` will determine which layer(s) will be deployed to the cluster.  This is based on whether the `resources` are commented out or not.  Each of the listed YAMLs contains an ArgoCD Application which in turn tracks all the K8s resources available to be deployed.  This follows the ArgoCD [app of apps pattern](https://argoproj.github.io/argo-cd/operator-manual/cluster-bootstrapping/#app-of-apps-pattern). 

```yaml
resources:
- 1-infra/1-infra.yaml
- 2-services/2-services.yaml
- 3-apps/3-apps.yaml
```


### **Infrastructure Layer**
- Infrastructure GitOps repository ([https://github.com/cloud-native-toolkit/multi-tenancy-gitops-infra](https://github.com/cloud-native-toolkit/multi-tenancy-gitops-infra)): Contains the YAMLs for cluster-wide and/or infrastructure related K8s resources managed by a cluster administrator.  This would include `namespaces`, `clusterroles`, `clusterrolebindings`, `machinesets` to name a few.

```bash
1-infra
├── 1-infra.yaml
├── argocd
│   ├── consolelink.yaml
│   ├── consolenotification.yaml
│   ├── infraconfig.yaml
│   ├── machinesets.yaml
│   ├── namespace-ci.yaml
│   ├── namespace-dev.yaml
│   ├── namespace-ibm-common-services.yaml
│   ├── namespace-istio-system.yaml
│   ├── namespace-openldap.yaml
│   ├── namespace-openshift-storage.yaml
│   ├── namespace-prod.yaml
│   ├── namespace-sealed-secrets.yaml
│   ├── namespace-staging.yaml
│   ├── namespace-tools.yaml
│   └── storage.yaml
└── kustomization.yaml
```

<details>
<summary> Contents of the `kustomization.yaml` will determine which resources are deployed to the cluster</summary>

```yaml
resources:
#- argocd/consolelink.yaml
#- argocd/consolenotification.yaml
#- argocd/namespace-ibm-common-services.yaml
#- argocd/namespace-ci.yaml
#- argocd/namespace-dev.yaml
#- argocd/namespace-staging.yaml
#- argocd/namespace-prod.yaml
#- argocd/namespace-istio-system.yaml
#- argocd/namespace-openldap.yaml
#- argocd/namespace-sealed-secrets.yaml
#- argocd/namespace-tools.yaml
#- argocd/namespace-openshift-storage.yaml
#- argocd/operator-ocs.yaml
#- argocd/refarch-infraconfig.yaml
#- argocd/refarch-machinesets.yaml
```

</details>


### **Services Layer**
- Services GitOps repository ([https://github.com/cloud-native-toolkit/multi-tenancy-gitops-services](https://github.com/cloud-native-toolkit/multi-tenancy-gitops-services)): Contains the YAMLs for K8s resources which will be used by the `application` layer.  This could include `subscriptions` for Operators, YAMLs of custom resources provided, or Helm Charts for tools provided by a third party.  These resource would usually be managed by the Administrator(s) and/or a DevOps team supporting application developers.  

```bash
2-services
├── 2-services.yaml
├── argocd
│   ├── instances
│   │   ├── artifactory.yaml
│   │   ├── cert-manager-instance.yaml
│   │   ├── chartmuseum.yaml
│   │   ├── developer-dashboard.yaml
│   │   ├── grafana-instance.yaml
│   │   ├── ibm-foundational-services-instance.yaml
│   │   ├── ibm-platform-navigator-instance.yaml
│   │   ├── ibm-process-mining-instance.yaml
│   │   ├── openldap.yaml
│   │   ├── openshift-service-mesh-instance.yaml
│   │   ├── pact-broker.yaml
│   │   ├── sealed-secrets.yaml
│   │   ├── sonarqube.yaml
│   │   └── swaggereditor.yaml
│   └── operators
│       ├── cert-manager.yaml
│       ├── elasticsearch.yaml
│       ├── grafana-operator.yaml
│       ├── ibm-ace-operator.yaml
│       ├── ibm-apic-operator.yaml
│       ├── ibm-aspera-operator.yaml
│       ├── ibm-assetrepository-operator.yaml
│       ├── ibm-automation-foundation-core-operator.yaml
│       ├── ibm-catalogs.yaml
│       ├── ibm-cp4i-operators.yaml
│       ├── ibm-datapower-operator.yaml
│       ├── ibm-eventstreams-operator.yaml
│       ├── ibm-foundations.yaml
│       ├── ibm-mq-operator.yaml
│       ├── ibm-opsdashboard-operator.yaml
│       ├── ibm-platform-navigator.yaml
│       ├── ibm-process-mining-operator.yaml
│       ├── jaeger.yaml
│       ├── kiali.yaml
│       ├── openshift-gitops.yaml
│       ├── openshift-pipelines.yaml
│       └── openshift-service-mesh.yaml
└── kustomization.yaml
```


<details>
<summary> Contents of the `kustomization.yaml` will determine which resources are deployed to the cluster</summary>

```yaml
resources:
# IBM Software
#- argocd/operators/ibm-ace-operator.yaml
#- argocd/operators/ibm-apic-operator.yaml
#- argocd/operators/ibm-aspera-operator.yaml
#- argocd/operators/ibm-assetrepository-operator.yaml
#- argocd/operators/ibm-cp4i-operators.yaml
#- argocd/operators/ibm-datapower-operator.yaml
#- argocd/operators/ibm-eventstreams-operator.yaml
#- argocd/operators/ibm-mq-operator.yaml
#- argocd/operators/ibm-opsdashboard-operator.yaml
#- argocd/operators/ibm-process-mining-operator.yaml
#- argocd/instances/ibm-process-mining-instance.yaml
#- argocd/operators/ibm-platform-navigator.yaml
#- argocd/instances/ibm-platform-navigator-instance.yaml

# IBM Foundations / Common Services
#- argocd/operators/ibm-foundations.yaml
#- argocd/instances/ibm-foundational-services-instance.yaml
#- argocd/operators/ibm-automation-foundation-core-operator.yaml

# IBM Catalogs
#- argocd/operators/ibm-catalogs.yaml

# Required for IBM MQ
#- argocd/instances/openldap.yaml
# Required for IBM ACE, IBM MQ
#- argocd/operators/cert-manager.yaml
#- argocd/instances/cert-manager-instance.yaml

# Sealed Secrets
#- argocd/instances/sealed-secrets.yaml

# CICD
#- argocd/operators/grafana-operator.yaml
#- argocd/instances/grafana-instance.yaml
#- argocd/instances/artifactory.yaml
#- argocd/instances/chartmuseum.yaml
#- argocd/instances/developer-dashboard.yaml
#- argocd/instances/swaggereditor.yaml
#- argocd/instances/sonarqube.yaml
#- argocd/instances/pact-broker.yaml
# In OCP 4.7+ we need to install openshift-pipelines and possibly privileged scc to the pipeline serviceaccount
#- argocd/operators/openshift-pipelines.yaml

# Service Mesh
#- argocd/operators/elasticsearch.yaml
#- argocd/operators/jaeger.yaml
#- argocd/operators/kiali.yaml
#- argocd/operators/openshift-service-mesh.yaml
```

</details>


### **Application Layer** 
- Application GitOps repository ([https://github.com/cloud-native-toolkit/multi-tenancy-gitops-apps](https://github.com/cloud-native-toolkit/multi-tenancy-gitops-apps)): Contains the YAMLs for K8s resources required for Tekton pipelines and webhooks.  It can also contains the YAMLs to deploy microservice(s), web application(s), instance(S) of the ACE integration server or queue manager(s).  

```bash
3-apps
├── 3-apps.yaml
├── argocd
│   ├── <PRODUCT>
│   │   ├── cicd.yaml
│   │   ├── dev.yaml
│   │   ├── prod.yaml
│   │   └── stage.yaml
└── kustomization.yaml
```

<details>
<summary> Contents of the `kustomization.yaml` will determine which resources are deployed to the cluster</summary>

```yaml
resources:
#- argocd/<PRODUCT>/cicd.yaml
#- argocd/<PRODUCT>/dev.yaml
#- argocd/<PRODUCT>/stage.yaml
#- argocd/<PRODUCT>/prod.yaml
```

</details>



## Personas 
| Persona |  Responsibilities | Not responsible for | Required skills |
|---|---|---|---|
| OpenShift cluster administrator  | - Provision/install the cluster <br> - Configure compute, network, storage (i.e. compute infrastructure) <br> - Install gitOps and pipelines operator (ArgoCD and Tekton technologies) <br> - Creates required cluster-wide resources <br> - Install common pipelines and tasks used by product tenants <br> - | - Very little knowledge of products installed in the cluster, for example MQ or ACE <br> - Delegates cluster security admin to Cluster security administrator | - Strong skills in Kubernetes administration and Kubernetes operations <br> - Working knowledge of DevOps: practices, tools, implementation |
| OpenShift cluster security administrator | - Responsible for administering OCP cluster security <br> - Responsible for implementing organization wide security practices Works with both cluster admin and tenant product admin <br> - Responsible for administering tenant product security <br> - Security artifacts have the same structure for different tenant products | - Unlikely to have knowledge of tenant products such as MQ, ACE| - Strong security skills <br> - Strong Kubernetes skills administration and operations |
| OpenShift cluster tenant product administrator | - Implements CICD DevOps for tenant product such as MQ or ACE <br> - Can add tenant product specific cluster resources | - Delegates cluster security admin to OCP cluster security administrator | - Good skills in Kubernetes administration and Kubernetes operations <br> - Good knowledge of DevOps: practices, tools, implementation <br> - Good application development experience using containers and Kubernetes <br> - Basic/working knowledge tenant product such as MQ or ACE |
| Tenant product administrator  | - The product/integration administrator <br> - May have some knowledge/experience of Kubernetes  |  | - Working/strong admin skills for tenant product, e.g. MQ or ACE <br> - Basic knowledge of Kubernetes |
| Tenant product developer | - The developer who writes an application program that uses MQ <br> - The integration developer who authors an ACE integration flow <br> - Maintains development assets in source repository | - No knowledge of Kubernetes required | - Working/strong developer skills for tenant product, e.g. MQ or ACE |
| DevOps leader | - Is an expert in in DevOps <br> - Establishes initial GitOps configuration at a customer <br> - Works in close partnership with OCP Cluster administrator and cluster tenant administrator <br> - Establishes/fixes/updates/evolves the DevOps resources deployed to the cluster <br> - Ensures that DevOps infrastructure evolves in a well governed manner <br> - Ensures the DevOps infrastructure is tested before it is rolled out | | - Strong Kubernetes skills administration and operations <br> - Strong knowledge of DevOps: practices, tools, implementation <br> - Basic work knowledge of how tenant products such as MQ, ACE interact with Kubernetes |
| Site reliability engineer (SRE) | - A Kubernetes engineer responsible for diagnosing and fixing issues with the cluster <br> - Under time pressure to get failed service(s) back up and running <br> -  <br> - | - No knowledge of tenant products such as MQ, ACE | - Strong Kubernetes skills administration and operations <br> - Working knowledge of DevOps: practices, tools, implementation |
