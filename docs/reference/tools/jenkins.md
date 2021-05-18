# Tekton (OpenShift pipelines)

!!!Information
    Openshift Pipelines (Tekton) is the preferred pipeline technology used by the Toolkit.

Use Jenkins to automate your continuous integration process

[Jenkins](https://jenkins.io/){: target=_blank} is a self-contained, open source automation server that can be used to automate all sorts of tasks related to building, testing, and delivering or deploying software.  It is a perfect tool for helping manage continuous integration tasks for a wide range of software components.

Jenkins Pipeline (or simply "Pipeline") is a suite of plugins that supports implementing and integrating continuous delivery pipelines into Jenkins.

A continuous delivery pipeline is an automated expression of your process for getting software from version control right through to your users and customers.

Jenkins Pipeline provides an extensible set of tools for modeling simple-to-complex delivery pipelines "as code." The definition of a Jenkins Pipeline is typically written into a text file (called a [Jenkinsfile](https://jenkins.io/doc/pipeline/tour/hello-world/)){: target=_blank}) that in turn is checked into a project’s source control repository.

## Pipelines

Pipelines offer a set of stages or steps that can be chained together to allow a level of software automation. This automation can be tailored to the specific project requirements.

You can read more information about Jenkins Pipelines [here](https://jenkins.io/doc/book/pipeline/)){: target=_blank}

## Stages

Pipelines are defined in a `Jenkinsfile` that sits in the root of your application code. It defines a number of stages. Each of the [templates](../starter-kit/starter-kit.md)){: target=_blank} includes a `Jenkinsfile` that offers a number of stages. The stages have been configured to complete the build, test, package, and deploy of the application code. Each stage can use the defined defined `secrets` and `config maps` that were previously configured during the installation of Development cluster setup.

## Developer Tools Pipeline

To enable application compatibility between Kubernetes and OpenShift, the `Jenkinsfile` is consistent between pipeline registration with
both platforms. Also, the Docker images are built from [UBI images](https://www.redhat.com/en/blog/introducing-red-hat-universal-base-image)){: target=_blank} so that their containers can run on both platforms.

These are the stages in the pipeline and a description of what each stage does. The **bold stage names** indicate
the stages that are required; the ***italics stage names*** indicate optional stages that can be deleted or will be ignored if the tool
supporting the stage is not installed. These stages represent a typical production pipeline flow for a cloud-native application.

- **Setup**: Clones the code into the pipeline
- **Build**: Runs the build commands for the code
- **Test**: Validates the unit tests for the code
- ***Publish pacts***: Publishes any pact contracts that have been defined
- ***Sonar scan***: Runs a sonar code scan of the source code and publishes the results to SonarQube
- **Verify environment**: Validates the OpenShift or IKS environment configuration is valid
- **Build image**: Builds the code into a Docker images and stores it in the IBM Cloud Image registry
- **Deploy to DEV env**: Deploys the Docker image tagged version to `dev` namespace using Helm Chart
- **Health Check**: Validates the Health Endpoint of the deployed application
- ***Package Helm Chart***: Stores the tagged version of the Helm chart in Artifactory
- ***Trigger CD Pipeline***: This is a GitOps stage that will update the build number in designated git repo and trigger ArgoCD for deployment to **test**

## Registering Pipelines

The [templates](../starter-kit/starter-kit.md)){: target=_blank} are a good place to start to see how `Jenkinsfile` and `Dockerfile` should be configured for use in a Jenkins CI pipeline. To register your git repo, use the [IGC CLI](../../reference/cli.md)){: target=_blank}. This command automates a number of manual steps you would have to do with Jenkins, including: managing secrets, webhooks, and pipeline registration in the Jenkins tools.

```shell
igc pipeline
```

By default, the pipeline will register into the `dev` namespace and will copy all the `configMaps` and `secrets` from the `tools` namespace to the `dev` namespace. This means the pipeline can execute, knowing it has access to the key information that enables it to integrate with both the cloud platform and the various development tools. See [Cluster Configuration](../../adopting/admin/cluster-config.md)){: target=_blank} for more detailed information.

### Registering Pipeline in new namespace

You can use any namespace you want to register a pipeline. If you add `-n` or `namespace` to your `igc pipeline` command, it will create a new namespace if it doesn't already exist. It will copy the necessary `secrets` and `configMaps` into that namespace and configure the build agents pods to run in that namespace.

```shell
igc pipeline -n team-one
```

This is good if you have various squads, teams, pairs or students working in the same Development Tools environment.

## Continuous deployment

In addition to continuous integration, the environment also supports continuous delivery using Artifactory and ArgoCD:

- [Artifact Management with Artifactory](artifactory.md){: target=_blank}
- [Continuous Delivery with ArgoCD](argocd.md){: target=_blank}
