
# Continous Integration with Jenkins

## What is Jenkins

Jenkins is a self-contained, open source automation server which can be used to automate all sorts of tasks related to building, testing, and delivering or deploying software.

Jenkins Pipeline (or simply "Pipeline") is a suite of plugins which supports implementing and integrating continuous delivery pipelines into Jenkins.

A continuous delivery pipeline is an automated expression of your process for getting software from version control right through to your users and customers.

Jenkins Pipeline provides an extensible set of tools for modeling simple-to-complex delivery pipelines "as code". The definition of a Jenkins Pipeline is typically written into a text file (called a [Jenkinsfile](https://jenkins.io/doc/pipeline/tour/hello-world/)) which in turn is checked into a project’s source control repository.


## Deploying Code into Pipelines

Now you have a working development environment that includes Jenkins on the IBM Public Cloud. You can now start working with code to deploy into your cluster using Jenkins pipelines. The following instructions help describe this process.

You can click on the `Starter Kit Templates` tab on the Development Cluster Dashboard and follow the instructions for provisioning a new microservice into your development cluster. You can easily create an microservice by using the github templates listed below:

* [12 UI Patterns with React and Node.js](https://github.com/ibm-garage-cloud/template-node-react)
* [TypeScript Microservice or BFF with Node.js](https://github.com/ibm-garage-cloud/template-node-typescript)
* [GraphQL BFF with Node.js](https://github.com/ibm-garage-cloud/template-graphql-typescript)
* [Spring Boot Java Microservice](https://github.com/ibm-garage-cloud/template-java-spring)

Click on the `Use this template` button to create a repo in your git organisation. Then follow the pipeline registration instructions below: 

- You will need to be logged into the OpenShift Console or IKS clusters on the command line. 

- You will also need a [Personal Access Token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) from your git organistaion.

The following steps will enable you to register the template with OpenShift or IKS instance of Jenkins Pipelines.

```bash
git clone <generated start kit template>
cd <generated start kit template>
vi package.json ! rename the template
git add .
git commit -m "Rename project"
git push
igc register ! register pipeline with Jenkins
? Please provide the username for https://github.com/mjperrins/hello-world-bff.git: mperrins
? Please provide your password/personal access token: [hidden]
? Please provide the branch the pipeline should use: master
Creating git secret
Copying 'ibmcloud-apikey' secret to dev
Registering pipeline
? The build pipeline (mjperrins.hello-world-bff) already exists. Do you want to update it? (Y/n)
```

The pipeline will be created in the `dev` namespace in OpenShift and `tools` name space on IKS . The registration will copy the necessary secrets required to run the pipeline and expose the secrets to the `Jenkinsfile`. The app docker image will be stored in the IBM Container Registry and deployed into the `dev` name space. 


This is screen shot of a Jenkins pipeline, you can access this view from the Developer Dashboard.

![Jenkins Pipelines View](./images/pipelines.png)

This is a screen shot of the Build Pipeline in OpenShift. You can access this from the `Application Console` and selecting `Builds->Pipelines` from the menu.

![OpenShift Pipelines View](./images/ospipelines.png)

### Stages

You can see from either the vanilla Jenkins pipelines view of the Application Console pipelines view, each template offers a number of pipeline stages. The stages have been configured to be work from the defined `secrets` and `config maps` that have been defined in the Development cluster setup.

The `Jenkinsfile` is consistent between registration with OpenShift or IKS. The `Dockerfile` has been optimized for `UBI` images, this means the docker images when deployed can run on both OpenShift and IKS.

The following gives a description of what each stage in the pipeline does. The *Optional* stages can be deleted or ignored if the tool support it is not installed. These stages represent a typical production pipeline flow for a Cloud Native application.

- **Setup** clones the code into the pipeline	
- **Build** runs the build commands for the code
- **Test**	validates the unit tests for the code
- **Publish pacts**	(*optional*) publishes any pact contracts that have been defined
- **Verify pact** (*optional*) verifies the pact contracts 
- **Sonar scan** (*optional*) runs a sonar code scan of the source code and publishes the results to SonarQube
- **Verify environment** Validates the OpenShift or IKS environment configuration is valid	
- **Build image** Builds the code into a Docker images and stores it in the IBM Cloud Image registry
- **Deploy to DEV env**	Deploys the Docker image tagged version to `dev` namespace using Helm Chart
- **Package Helm Chart** (*optional*) Stores the tagged version of the Helm chart into Artifactory
- **Health Check** Validates the Health Endpoint of the deployed application


### Ingress URLs or testing 

If you want to get easy access to your application routes or ingress end points for your apps run the following command. All the `igc` commands run the same on IKS and OpenShift.
```bash
igc ingress -n dev
```
This will list out the applications URLs that have been deployed.

```bash
Host(s):
[
  'http://stock-bff-dev.showcase-dev-oswdc06-cl.us-east.containers.appdomain.cloud',
  'http://stock-service-dev.showcase-dev-oswdc06-cl.us-east.containers.appdomain.cloud',
  'http://stock-ui-dev.showcase-dev-oswdc06-cl.us-east.containers.appdomain.cloud',
]
```

Once you become familar with deploying code into OpenShift or IKS, read up about how you can manage code deployment with `Continuous Deployment` with `Artiactory` and `ArgoCD`

- [Artiact Storage with Artifactory](./ARTIFACTORY.md)
- [Continuous Deployment with ArgoCD](./ARGOCD.md)

You can use the [Argo CD Template](https://github.com/ibm-garage-cloud/template-argocd-test) to help define a deployment configuration for `test` and `staging` namespaces.



