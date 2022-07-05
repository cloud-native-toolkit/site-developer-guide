# Build multiarchitecture images

<!--- cSpell:ignore CICD cntk pipelinerun Omni Frontends cloudnative -->

Build multiarchitecture images using the Cloud Native Toolkit, Tekton pipelines and ArgoCD.
The resulting images can be deployed to any OpenShift cluster running on x86, IBM Z (s390x) or IBM Power (ppc64le).

## Overview

This is a setup to build images using the Cloud Native Toolkit, Tekton pipelines and ArgoCD, following a DevSecOps approach. The workflow we are trying to achieve is the following :
![DevSecOps Workflow](./images/multiarch-build-workflow.png)

### Prerequisites

| Task                                                           | Instructions                                                        |
| -------------------------------------------------------------- | ------------------------------------------------------------------- |
| An x86 OpenShift **development cluster**                       | You will need admin access to this cluster for the setup            |
| x86, IBM Z and IBM Power OpenShift **workload clusters**       | You will need admin access to this cluster for the setup            |
| Install the Cloud Native Toolkit on the **develoment cluster** | [Install the Cloud Native Toolkit](../../../setup/setup-options.md) |

### Setup the clusters

The **workload clusters** serve two purposes :

1.  They are used to build _remotely_ the images for the x86, IBM Z and IBM Power architectures; they act as agents for the build process.
2.  They _can_ be used to deploy the images to the x86, IBM Z and IBM Power architectures, granted if ArgoCD is configured to deploy the images to the workload clusters.

We are using the clusters as agents because we cannot build multiarchitecture images on the same development cluster.

The build is performed remotely, the dev cluster needs access to trigger the build pipelines on the workload clusters. A setup is needed in order to perfom this remote build.

A Terraform script is available [here](https://github.com/ibm-ecosystem-lab/multiarch-build-clusters-setup). A template file is available, you can find explanations in the repository.
![tfvars template](./images/tfvars-template-file.png)

The script should take care of the following :

- Setup remote pipeline execution, including the creation of the required secrets to access the image registry where the images will be pushed.
- Create the pipelines and tasks to build the images under the `Tools` project if not already done.
- Create the required projects and services on the development and workload clusters. The projects names will follow the convention :
  - `<PROJECT_NAME>-dev`
  - `<PROJECT_NAME>-test`
  - `<PROJECT_NAME>-prod`
    The test and prod project refer to deployment environments that could be used later on by ArgoCD. These two projects only exist on the workload clusters as we are not deploying the images to the development cluster.
    Note that deploying the images in a **multi-cloud/cluster** environment requires more setup, using [Red Hat Advanced Cluster Management](https://www.redhat.com/en/technologies/management/advanced-cluster-management) and the [Submariner add-on](https://submariner.io/).

### Run the Tekton pipelines

Using the `ìgc pipeline` command, we can run the Tekton pipelines. The services we will be using are available [here](https://github.com/ibm-ecosystem-lab/multiarch-deployment-showcase-repos). Login to the development cluster, select the `dev` project and run the command :

![igc pipeline](./images/igc-pipeline.png)

Note that the git credentials are only used to create webhooks for the pipelines, wrong git credentials won't affect the execution of the pipelines.

We can check afterwards the pipeline execution on the dev cluster :

![Pipeline execution](./images/pipeline-execution.png)

### Pipeline execution

The multiarch pipeline showcased here is an extension of the CI pipelines found [here](/learning/pipeline). They mostly the same tasks, with some additional ones to perform multiarchitecture builds.

- `simver` : This step uses the same logic as the `tag-release`step that uses the `ibm-tag-release` Tekton task, with the difference that we don't release the new tag on the code repository.
- `build-x86`, `build-power` and `build-z` : These steps build remotely the images for the x86, IBM Power and IBM Z architectures. The dev cluster connects to workload clusters and triggers a 1-step build pipeline.
  ![build-x86](./images/remote-build-x.png)
  ![build-power](./images/remote-build-p.png)
  ![build-z](./images/remote-build-z.png)
  After each build, the images are pushed to the image registry, tagged with the code version and an architecture label. In this example we are using [quay.io](https://quay.io) but any image registry can be used.
- `manifest` : This step creates a manifest file for the images; when pulling the images, the manifest will serve as a pointer to the appropriate image depending on the architecture of the pulling machine.

After the execution of these steps, we should have this result depending on the image registry used :

- On quay :
  ![quay-images](./images/quay-images.png)

- On Dockerhub :  
  ![dockerhub-images](./images/dockerhub-images.png)

---

- This OmniChannel application contains an [AngularJS](https://angularjs.org/) based web application.
- The Web app invokes its own backend Microservice to fetch data, we call this component BFFs following the [Backend for Frontends](http://samnewman.io/patterns/architectural/bff/) pattern. The Web BFF is implemented using the Node.js Express Framework.
- The BFFs invokes another layer of reusable Java Microservices. The reusable microservices are written in Java using [Quarkus](https://quarkus.io/) framework.
- The Java Microservices are as follows:
  - The [Inventory Service](https://cloudnativereference.dev/related-repositories/inventory) uses an instance of [MySQL](https://www.mysql.com/) to store the inventory items.
  - The [Catalog service](https://cloudnativereference.dev/related-repositories/catalog) retrieves items from a searchable JSON data source using [ElasticSearch](https://www.elastic.co/).
  - [Keycloak](https://cloudnativereference.dev/related-repositories/keycloak) delegates authentication and authorization.
  - The [Customer service](https://cloudnativereference.dev/related-repositories/customer) stores and retrieves Customer data from a searchable JSON data source using [CouchDB](http://couchdb.apache.org/).
  - The [Orders Service](https://cloudnativereference.dev/related-repositories/orders) uses an instance of [MariaDB](https://mariadb.org/) to store order information.

### Deploy the Storefront using Cloud native toolkit

Follow the below guide for instructions on how to deploy all the microservices of StoreFront onto Openshift using Cloud native toolkit.

[Cloud native toolkit - StoreFront Quarkus version](https://cloudnativereference.dev/deployments/cntk-quarkus)

To get an idea, here is a view of a completed and successful pipeline runs for all the microservices.

![Pipeline run](images/sf_pipelines.png)
