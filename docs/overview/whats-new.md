# What's new

<!--- 
  Use Heading 2 style to introduce a new release, then jump to heading 4 for components - this keeps the Table of contents displayed on the page more navigable)
--->

## Jan 28, 2021

[Cloud Native Toolkit Workshop](https://cloudnativetoolkit.dev/workshop) released. The workshop in a box environment is easy and quick to setup with hands on labs including videos.
Check them out at [cloudnativetoolkit.dev/workshop](https://cloudnativetoolkit.dev/workshop). More hands on labs for the workshop coming soon.


## Jan 6, 2021

#### [CLI](../reference/cli.md)

[v1.11.1](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.11.1),
[v1.11.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.11.0),
[v1.10.2](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.10.2),
[v1.10.1](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.10.1),
[v1.10.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.10.0),
[v1.9.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.9.0),
[v1.8.1](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.8.1),
[v1.8.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.8.0),
[v1.7.1](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.7.1),
[v1.7.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.7.0),
[v1.6.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.6.0),
[v1.5.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.5.0)

Many usability changes, particularly for the `pipeline` command:

__Reduces required permissions__

- At the start of every command that needs access to the kube api, the cli checks that a connection is available.
  Previously it did that by trying to list all the pods in the cluster (e.g. the equivalent of `kubectl get pods -A`).
  Unfortunately, that command needs a great deal of access to succeed. The check was changed to run a command that requires
  much less permission.
- Before creating the webhook triggers, the pipeline command would read the Tekton version number from annotations on the
  operator deployment in the `openshift-operators` namespace. This check required a great deal of permissions to be able
  to read the deployment in that namespace. Instead, the `pipeline` command has been changed to resort to a brute force
  check - it assumes v0.6.0 and if it fails tries again with v0.4.0.

__Usability updates for `pipeline` command__

- Allows the repo url to be passed in so it is not necessary to clone the repository first
- Creates a single event listener per namespace/project instead of a new event listener for each repo
- Detects the runtime of the repository and filters the tekton pipelines based on the runtime
- Reads params from tekton pipeline and prompts for values
- The input arguments have been cleaned up to remove conflicts and to use values that make more sense for the
  input parameters.

## Dec 11, 2020

#### [IasC (IZero and Terraform modules)](../reference/iteration-zero/iteration-zero.md)

[v2.5.0](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.5.0)

- Updates ibm-container-platform module to v1.18.3 to provision ocp 4.5 clusters properly
- Adds option of storage class for Artifactory
- Updates to point releases of terraform modules with updated workflows to generate module catalogs
  - argocd v2.10.1
  - artifactory v1.10.0
  - dashboard v1.10.4
  - ibm-image-registry v1.2.3
  - ocp-image-registry v1.2.2
  - k8s-image-registry v1.1.5
  - k8s-source-control v1.2.1
  - jenkins v1.4.3
  - pactbroker v1.4.2
  - sonarqube v1.9.2
  - swaggereditor v1.4.1
  - tekton v2.0.2
  - tekton-resources v2.2.0
  - ibm-logdna v2.4.3
  - ibm-sysdig v2.3.3

#### [CLI](../reference/cli.md)

[v1.4.2](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.4.2),
[v1.4.1](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.4.1)

- Prints next steps to the console after calling the `pipeline` command

    ```text
    Pipeline run started: memcached-operator-catalog-1762ff0a6d7

    Next steps:
      Tekton cli:
        View PipelineRun info - tkn pr describe memcached-operator-catalog-1762ff0a6d7
        View PipelineRun logs - tkn pr logs memcached-operator-catalog-1762ff0a6d7
      OpenShift console:
        View PipelineRun - https://console-openshift-console.garage-dev-ocp45-vpc-0143c5dd31acd8e030a1d6e0ab1380e3-0000.us-east.containers.appdomain.cloud/k8s/ns/operator-dev/tekton.dev~v1beta1~PipelineRun/memcached-operator-catalog-1762ff0a6d7
    ```

- Registers the `gitops` command as a plugin to kubectl and oc clis

#### [Tekton tasks](../reference/tools/tekton.md)

[v2.2.3](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.2.3),
[v2.2.2](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.2.2),
[v2.2.1](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.2.1),
[v2.2.0](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.2.0),
[v2.1.27](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.27)

- Updates tasks to use images hosted in quay.io instead of docker.io to avoid rate limiting issue
- Adds workflow to mirror required images from docker.io to quay.io on a nightly schedule
- Adds pipelines for operator and operator catalog builds

## Nov 20, 2020

#### [CLI](../reference/cli.md)

[v1.4.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.4.0),
[v1.3.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.3.0),
[v1.2.2](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.2.2),
[v1.2.1](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.2.2)

- Refactors Git server interaction logic to make more extensible
- Adds support to `pipeline` command for Gogs git server running in cluster
- Adds support to `pipeline` command for Bitbucket along with existing support for GitHub, GitHub Enterprise, and GitLab

## Nov 13, 2020

#### [IasC (IZero and Terraform modules)](../reference/iteration-zero/iteration-zero.md)

[v2.4.0](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.4.0)

- Adds image-registry and source-control modules
- Updates numbering for generated tiles
- Updates default settings when installing from iZero
- Updates underlying module versions
  - ibm-container-platform v1.18.0
  - artifactory v1.9.2
  - dashboard v1.10.0
  - ibm-image-registry v1.2.0
  - ocp-image-registry v1.2.0
  - tools-tekton-resources v2.1.9
  - k8s-source-control v1.2.0
  - tools-swagger-editor v1.4.0

#### [Tekton tasks](../reference/tools/tekton.md)

[v2.1.26](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.26),
[v2.1.25](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.25),
[v2.1.24](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.24),
[v2.1.23](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.23),
[v2.1.24](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.22),
[v2.1.21](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.21),
[v2.1.20](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.20)

- Updates tekton tasks to support Gogs git server running in cluster
- Fixes setup task to handle different characters in git url
- Updates the task order in the pipelines to release the helm chart after the scan
- Defaults to using the internal OCP registry if none is defined

## Nov 6, 2020

#### [IasC (IZero and Terraform modules)](../reference/iteration-zero/iteration-zero.md)

[v2.3.9](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.8](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.7](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.6](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.5](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.4](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.3](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.2](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.1](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.3.0](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9),
[v2.2.2](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.3.9)

- Prints the elapsed time for the Toolkit installation process
- Updates tile definition to include README.md in long description and update input parameters
- Updates module versions
  - ibm-container-platform v1.18.0
  - ibm-object-storage v2.0.1

#### [CLI](../reference/cli.md)

[v1.2.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.2.0),
[v1.1.0](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.1.0)

- Simplifies the logic used to determine cluster type by using intrinsic information within the cluster. This expands the number of commands that can be run against a cluster that doesn't have the toolkit installed
- Updates the git secret logic to support older versions of the git cli (which allows the CLI to be run in the IBM OpenLab environment)

## Oct 30, 2020

#### [IasC (IZero and Terraform modules)](../reference/iteration-zero/iteration-zero.md)

[v2.2.1](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.2.1),
[v2.2.0](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.2.0)

- Adds quick install option with Terraform job running within the cluster
- Updates Tekton Resources module to v2.1.8
- Update terraform modules to latest
  - dashboard v1.9.0
  - ocp-cluster v2.3.5
  - pactbroker v1.4.0

#### [CLI](../reference/cli.md)

[v1.0.3](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.0.3),
[v1.0.2](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.0.2)

- Fixes bug that causes the `endpoint` command to fail due to a missing import
- Fixes bug with the `credentials` command that caused the internal urls to be displayed instead of the external ones

#### [Tekton tasks](../reference/tools/tekton.md)

[v2.1.19](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.19),
[v2.1.18](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.18),
[v2.1.17](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.17),
[v2.1.16](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.16),
[v2.1.15](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.15),
[v2.1.14](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.14),
[v2.1.13](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.13),
[v2.1.12](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.12),
[v2.1.11](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.11),
[v2.1.10](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.10),
[v2.1.9](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.9),
[v2.1.8](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.8),
[v2.1.7](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.7),
[v2.1.6](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.6),
[v2.1.5](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.5),
[v2.1.4](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.4),
[v2.1.3](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.3)

- Fixes bug in deploy task when the Git hash has an "e" in it (tries to convert to an exponential number)
- Combines Trivy and IBM VA scan into one task
- Uses internal endpoints for tools hosted within the cluster (like artifactory and sonarqube)
- Updates from helm v2 to v3 for the pipeline logic
- Fix the health url check logic
- Uses registry-access to get image registry information instead of ibmcloud-config
- Adds logic to wait for Vulnerability Advisor to complete before testing the result

## Sept 25, 2020

#### [Tekton tasks](../reference/tools/tekton.md)

[v2.1.2](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.2),
[v2.1.1](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.1),
[v2.1.0](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.1.0),

- Introduces image vulnerability scan with Aquasec Trivy
- Fixes trivy scan logic to check for PERFORM_SCAN flag in setup and execute steps

## Sept 11, 2020

#### [IasC (IZero and Terraform modules)](../reference/iteration-zero/iteration-zero.md)

[v2.1.0](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.1.0),
[v2.0.2](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.0.2),
[v2.0.1](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.0.1)

- Introduced Key Protect ArgoCD plugin in argocd module to v2.9.0 to generate kubernetes secrets from key material in Key Protect
- Updates namespace module to v2.6.0 to remove use of previously deprecated, now removed `--export` flag

## Aug 25, 2020

#### [IasC (IZero and Terraform modules)](../reference/iteration-zero/iteration-zero.md)

[v2.0.0](https://github.com/ibm-garage-cloud/ibm-garage-iteration-zero/releases/tag/v2.0.0)

- Updates Tekton module and resources to support the Red Hat Tekton operator and related versions
- Simplifies the process to install the Cloud-Native Toolkit on a Red Hat OpenShift provisioned anywhere
- Provide Private Catalog tile for install with Schematics
- Improves the handling of LogDNA and Sysdig in the cluster
- Automates the post-install configuration steps for Artifactory
- Automates the post-install configuration steps for SonarQube

#### [CLI](../reference/cli.md)

[v1.0.1](https://github.com/ibm-garage-cloud/ibm-garage-cloud-cli/releases/tag/1.0.1)

- Updates tekton pipeline handling to create the webhook
- Adds `git`,`gitops` and `console` commands

#### [Tekton tasks](../reference/tools/tekton.md)

[v2.0.3](https://github.com/IBM/ibm-garage-tekton-tasks/releases/tag/v2.0.3)

- Refactors tasks and pipelines to support v1beta1 schema and remove dependency on PipelineResources
- Streamlines CI process in pipelines to be more modular and reusable
- Tasks for Vulnerability scanning with IBM Image Registry
