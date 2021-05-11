# Continuous Integration Pipeline

!!!Todo
    Add the following content:

    - Pipeline technology comparison (Jenkins vs Tekton)
    - What the pipeline needs to deliver - everything needed by Continuous Delivery to deliver into testing and production
        - Build the application (Language specific - install dependencies, compile/link code, ...)
        - Run automated unit tests
        - Perform analysis
        - Package into container
        - Perform security scans
        - Build Helm package

The pipeline technology is what ties all the different tools and activities into you CI/CD workflow.  Tekton in the underlying technology in OpenShift Pipelines, which is the default pipeline technology now used by the Cloud-Native Toolkit.  Jenkins support is still available, but OpenShift Pipelines is the preferred technology.

There are a number of pipelines included with the Cloud-Native toolkit based around the programming language of the project.  A pipeline is make up by orchestrating a number of tasks.  There are a number of tasks installed by the Cloud-Native Toolkit.

As an example the Node.js pipeline performs the following tasks:

- check out the latest code from git
- run all the automated tests defined in the project
- check the Dockerfile using hadolint
- build the container
- tag the container with the version number then push to the registry
- create a release in the source code repository for this version of the app
- scan the container image for vulnerabilities
- create the helm chart, version it to match the container version and push it to the helm repository (Artifactory)
- Update the gitops repository with the latest version of the app

As you adopt the Cloud-Native Toolkit you may want to create your own pipelines and tasks to customize the set of activities that make up your own CI/CD process.

The integration of Pipelines into OpenShift adds a set of user interface capabilities so you can explore the pipelines and tasks, create and edit them, initiate pipeline runs and explore the output logs of each of the task runs.  There is also a command line tool if you prefer to use that.

The Cloud-Native Toolkit extension provides an easy way to add a pipeline to a project (you completed this task in the fast-start learning).  The [pipeline command](../reference/cli.md#pipeline){: target=_blank} section of the CLI reference outlines the actions performed by the CLI to enable a pipeline for a git hosted project.

!!!Note
    Red Hat also provide a set of tasks for OpenShift Pipelines which you can incorporate into your pipelines.
