# What is the Cloud-Native Toolkit?

<!--- cSpell:ignore qube cntk autoplay allowfullscreen -->

Cloud-Native Toolkit is an open-source collection of assets that provide an environment for developing
cloud-native applications for deployment within Red Hat OpenShift and Kubernetes. It embodies IBM Garage Method principles and practices for consistently developed applications, incorporating best practices that increase developer velocity for efficient delivery of business value.

<iframe width="100%" height="500" src="https://www.youtube-nocookie.com/embed/u3PTRqkd94k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Cloud-Native Toolkit objectives

There are a number of objectives behind providing the Cloud-Native Toolkit. The three main goals of the Toolkit are provided below:

### 1. Accelerate time to business value

One goal of the Cloud-Native Toolkit is to prepare the development environment quickly and allow the development
team to start delivering business function on day one of the first iteration using enterprise cloud-native practices. After all,
the point of cloud-native development is to deliver business value to end users and the development and operations infrastructure
are provided in service to that goal.

Through the automation provided by the Cloud-Native Toolkit we can provision an environment in minutes through automation
that is fully configured and ready for a development team to start working immediately. With the other components of
the Toolkit, developers can begin with a rich DevOps framework with a focus on "build to manage" techniques to
help build production-ready applications.

### 2. Reduce risk through consistent delivery models from start to production

The Cloud-Native Toolkit encapsulates many of the available best practices for cloud-native development including
DevOps and "Build to Manage" practices. They have been provided through the Toolkit in this way so that
developers and site reliability engineers (SREs) can benefit from these practices without requiring any additional effort and so that they can be applied
consistently from project to project.

### 3. Quickly ramp up development teams on Red Hat OpenShift and Kubernetes

Containerized platforms like Red Hat OpenShift and Kubernetes provide a great deal of functionality and
flexibility for application teams. However, these platforms can at time seem unapproachable for developers and SREs new to the environment
given all the different concepts and components. The Cloud-Native Toolkit aims to help with the learning curve in two
different ways:

1. Provide tools and techniques to "round off the corners" of the more complex aspects of working in a containerized environment
2. Provide a learning journey that incrementally introduces the concepts of a containerized environment in terms of practical scenarios, not abstract theory

## Guided walk-though

If you'd like to have a guided walk through of what the Cloud-Native Toolkit provides, check out this video demonstration of the Toolkit in action:

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/LcWboN1T7Zk?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Components of the Cloud-Native Toolkit

As the name suggests, the Cloud-Native Toolkit provides a collection of tools that can be used in part or in whole to support the activities of software development life-cycle. The following provides a listing of the assets that make up the Cloud-Native Toolkit:

![Cloud-Native Toolkit](images/cntk-in-the-toolkit.png)

- **Guides** - this set of documentation that weaves the various toolkit components together with a perspective on how to apply cloud-native practices to deliver business solutions
- [**Infrastructure as Code**](../adopting/best-practices/infrastructure-as-code.md){: target="_blank"} - Terraform scripts and GitOps configuration to provision and manage the environment
- [**CLI**](../reference/cli.md){: target="_blank"} - a simple node-based CLI that installs as a plugin to the `kubectl` and `oc` CLIs and provides commands to simplify common
- [**Developer Dashboard**](../reference/dashboard.md){: target="_blank"} - Dashboard component and Red Hat OpenShift console extensions to simplify common developer activities
- [**DevOps pipelines**](../reference/tasks/pipelines.md){: target="_blank"} - continuous integration pipelines for Tekton and Jenkins
- [**Starter Kits and Code Patterns**](../reference/starter-kit/starter-kit.md){: target="_blank"} - software repositories that can be used to quickly get started building applications using common patterns, or to serve as a reference to enhance existing patterns
- [**Learning Journey**](../learning/fast-start.md){: target="_blank"} - activation material to teach practitioners how to apply cloud-native practices in real-world scenarios using the Toolkit

## Cloud-Native Toolkit Developer Environment

The Cloud-Native Toolkit Developer Environment includes several features that support IBM Garage Method best practices
for consistent and rapid development of cloud-native applications:

- **Cluster**: A Red Hat OpenShift or Kubernetes cluster that both hosts the tools and itself is a deployment target for application builds
- **Software Development Life Cycle (SDLC)**: Deployment target environments that support the application development lifecycle: *dev*, *test*, and *staging*
- **Backend services**: Cloud services commonly required by cloud-native applications for monitoring, security, and persistence
- **CI/CD**: A prebuilt, ready-to-run continuous delivery pipeline incorporating best-of-breed open source software tools
- **Starter Kits**: Prebuilt code templates for common application components and tasks incorporating best practices that developers can add to their codebase as needed
- **Dashboard**: A centralized console to help developers use the environment's capabilities

Typically a Cloud System Admin installs and sets up a new Developer Environment after the [inception workshop](https://www.ibm.com/garage/method/practices/think/inception){: target="_blank"}, providing a place for the developers to start developing the [minimum viable product (MVP)](https://www.ibm.com/garage/method/practices/think/inception/practice_minimum_viable_product){: target="_blank"}.  The objective is to reduce the time required for a team to configure and prepare their development environment. The key benefit is to make the end-to-end [CI/CD development lifecycle](https://www.ibm.com/garage/method/practices/deliver/practice_continuous_delivery/){: target="_blank"} consistent across each platform and make the out-of-the-box developer experience as simple as possible.

The installation is performed using [Terraform](https://cloud.ibm.com/docs/terraform){: target="_blank"} scripts structured as [modular components](https://github.com/ibm-garage-cloud/garage-terraform-modules){: target="_blank"} so unneeded tools can be easily disabled or new tools added. The combination of tools selected are proven in the industry to deliver real value for modern cloud-native development.

[Red Hat Open Innovation Labs CI/CD components](https://github.com/rht-labs/labs-ci-cd){: target="_blank"} embodies a very similar approach to how they deliver success with OpenShift.

### Environment components

After installation, the environment consists of the following components and developer tools:

- A Red Hat OpenShift or IBM Cloud Kubernetes Service development cluster
- A collection of continuous delivery tools deployed into the cluster
- A set of backend services

This diagram illustrates the environment:

![Typical Cloud-Native Toolkit environment](images/catalyst-provisioned-environment.png)
![Software choices for development tooling](images/catalyst-provisioned-environment.drawio-catalog-only.png)

The diagram shows the components in the environment: the cluster, the deployment target environments, the cloud services, and the tools.

???info "Logo Usage Reference"
    | Logo      | Usage Reference |
    | --------- | ---------- |
    | Artifactory | is an Open Source product maintained by [JFrog](https://jfrog.com/brand-guidelines/) |
    | Jenkins | Open Source project [Jenkins](https://www.jenkins.io/artwork/) |
    | SonarQube | Open Source project maintained by [SonarSource](https://www.sonarsource.com/logos/) |
    | Nexus Repository | Open Source project maintained by [SonaType](https://www.sonatype.com/nexus-repository-oss) |
    | Trivy | Open Source project maintained by [Aqua](https://www.aquasec.com/brand/) |
    | IntelliJ | IDE from [JetBrains](https://www.jetbrains.com/company/brand/) |
    | VSCode | Free IDE maintained by [Microsoft](https://code.visualstudio.com/) |
    | Jaeger | Open Source tool maintained by [Jaeger Community](https://www.jaegertracing.io/get-in-touch/) |
    | ArgoCD | Open Source tool maintained by [ArgoCD Community](https://argoproj.github.io/cd/)|
    | OpenShift and CodeReady | Workspaces are products from [Red Hat](https://developers.redhat.com/products/codeready-workspaces/overview) |
    | LogDNA | IBM Cloud service supplied by [LogDNA](https://logdna.com/)|
    | Sysdig | IBM Cloud service supplied by [Sysdig](https://sysdig.com/)|

The tools to provision an environment using the Cloud-Native Toolkit can the customized to provision a particular set of tools fit for the environment. The Toolkit provides a default installation to provision a Developer Environment as a starting point. Any of the available components listed on the [Terraform modules](../reference/iteration-zero/terraform.md){: target="_blank"} page can be used to prepare the environment.

#### Development cluster

The heart of the Developer Environment is a cluster:

- An [IBM Cloud-managed Kubernetes](https://www.ibm.com/cloud/container-service){: target="_blank"} or [Red Hat OpenShift](https://www.ibm.com/cloud/openshift){: target="_blank"} cluster

- Cluster namespace that encapsulates the tooling installed in the cluster: *tools*
- A collection of SRE tools and services

#### Continuous delivery tools

The following best-of-breed open source software tools are installed in the cluster's *tools* namespace:

| Capability                  | Tool           | Bitnami |Description |
| --------------------------- |:-------------- | ------- |------------|
| Continuous Integration      | [Jenkins CI](../reference/tools/jenkins.md)            |  Yes    | Jenkins is a common tool for Continuous Integration   |
| Continuous Integration      | [Tekton CI](../reference/tools/tekton.md)       |         | Tekton is an emerging tool for Continuous Integration with Kubernetes and OpenShift  |
| API Contract Testing        | [Pact](../reference/tools/pact.md)                        |         | Pact enables API contract testing |
| Code Analysis               | [SonarQube](../reference/tools/sonar-qube.md)                       |  Yes    | SonarQube can scan code and display the results in a dashboard |
| Container Image Registry    | [IBM Cloud Container Registry](../reference/tools/ibm-cloud-container-registry.md)   |         | Stores container images to be deployed |
| Artifact Management         | [Artifactory](../reference/tools/artifactory.md)              |  Yes    | Artifactory is an artifact storage and Helm chart repository  |
| Continuous Delivery         | [ArgoCD](../reference/tools/argocd.md)                   |         | ArgoCD support Continuous Delivery with GitOps |
| Web IDE                     | [Code Ready Workspace](https://developers.redhat.com/products/codeready-workspaces/overview)              |         | IDE for editing and managing code in a web browser |
