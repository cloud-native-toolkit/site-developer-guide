# Application Modernization DevOps, Monolith to Container

<!--- cSpell:ignore wfish rbarcia appmod -->

<iframe width="100%" height="500" src="https://www.youtube-nocookie.com/embed/ss9joPm2M1U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This section will cover:

- Application Modernization DevOps, Monolith to Container
- Deploy the modernized Customer Order Services application in a WebSphere Liberty container to a Red Hat OpenShift cluster
- The DevOps process is composed of Continuos Integration (CI) with OpenShift Pipelines (Tekton) and Continuos Deployment (CD) with GitOps engine ArgoCD

1. Prerequisites

    - The instructor should [Setup Workshop Environment](setup.md)
    - The student should [Setup CLI and Terminal Shell](setup.md#4-optional-auto-configure-terminal-shell)
    - An user with cluster-admin (ie kubeadmin) needs to deploy a DB2 instance to be shared by all the users

    ```shell
    oc new-project db2
    oc create -n db2 serviceaccount mysvcacct
    oc adm policy add-scc-to-user privileged system:serviceaccount:db2:mysvcacct
    oc apply -n db2 -f "http://$(oc get route -n tools gitea --template='{{.spec.host}}')/toolkit/appmod-liberty-toolkit/raw/master/db2/db2-dc.yaml"
    oc apply -n db2 -f "http://$(oc get route -n tools gitea --template='{{.spec.host}}')/toolkit/appmod-liberty-toolkit/raw/master/db2/db2-service.yaml"
    ```

1. (Optional) Analyze the application using the following guide [Modernizing runtimes with Liberty](https://ibm-cloud-architecture.github.io/modernization-playbook/applications/liberty/liberty-analyze)
    - Download [Transformation Advisor](https://www.ibm.com/garage/method/practices/learn/ibm-transformation-advisor/)
    - The results of a Data Collector is already provided provided download [AppSrv01.zip](AppSrv01.zip){: target=_blank}
    - Upload the data collection into Transformation Advisor
    - Review the CustomerOrderServicesApp.ear analysis
    - The migration path files have been deployed to git for this lab.

1. Instructor will provide the following info:
    - OpenShift Console URL (OCP_CONSOLE_URL)
    - The username and password for OpenShift and Git Server (default values are user1, user2, etc.. for users and `password` for password).

1. Set `TOOLKIT_USERNAME` environment variable replace `user1` with assigned usernames

    ```shell
    TOOLKIT_USERNAME=user1
    ```

1. **(Skip if using KubeAdmin or IBM Cloud)** Login into OpenShift using `oc`
    - If you are using an IBM Cloud cluster login with your IBM account email and IAM API Key or Token, if using a cluster that was configured with the workshop scripts outside IBM Cloud then use `user1` or respective assigned username, and the password is `password`

    ```shell
    oc login $OCP_URL -u $TOOLKIT_USERNAME -p password
    ```

1. Set `TOOLKIT_PROJECT` environment variable replace `project1` or `projectx` based on user id assigned

    ```shell
    TOOLKIT_PROJECT=project1
    ```

1. Create a project/namespace using your project prefix, and `-dev` and suffix

    ```shell
    oc sync $TOOLKIT_PROJECT-dev
    ```

1. Fork Inventory Sample Application Java
    - Open Developer Dashboard from the OpenShift Console
    - Select Starter Kits
    - Select **Liberty AppMod** (Java)
    - Click Fork
    - Login into GIT Sever using the provided username and password (ie `user1` and `password`)
    - Click **Fork Repository**

1. Setup environment variable `GIT_URL` for the git url using the value from previous step or as following

    ```shell
    GIT_REPO=appmod-liberty-toolkit
    GIT_URL=http://${TOOLKIT_USERNAME}:password@$(oc get route -n tools gitea --template='{{.spec.host}}')/${TOOLKIT_USERNAME}/${GIT_REPO}
    echo GIT_URL=${GIT_URL}
    ```

1. Create a pipeline for the application

    ```shell
    oc pipeline --tekton \
    ${GIT_URL}#master \
    --pipeline ibm-appmod-liberty \
    -p scan-image=false \
    -p health-endpoint=/ \
    -p java-bin-path=CustomerOrderServicesApp/target
    ```

    - Notice above that the Toolkit `pipeline` CLI plugin accepts pipeline names and parameters
    - The endpoint to check that the external access is possible is `/`
    - The Java bin path is not located based on the root of the git repository and instead in `CustomerOrderServicesApp/target`
    - Every application would have custom values you can pass them to the pipeline as parameters.

1. Verity that the Pipeline started using the URL printed by the command

1. This is a good moment to take a break as the pipelines will take a few minutes.

1. Verify that Pipeline Run completed successfully

1. Review the Pipeline Tasks/Stages
    - Test
    - Open SonarQube from Console Link
    - Open Registry from Console Link
    - Open Artifactory from Console Link

1. Review the Application in GitOps git repository. The pipeline step `gitops` is pushing the application manifest into the GitOps git repository
    - Open **Git Ops** from Console link
    - Navigate to `project1/qa/project1/appmod-liberty-toolkit`
    - Review the Helm Chart for the Application

1. Register the Application in ArgoCD to deploy using GitOps
    - Select ArgoCD from the Console Link and login using OpenShift login
    - Click **NEW APP**
    - Application Name: ${TOOLKIT_PROJECT}-qa-websphere-liberty (ie project1-qa-websphere-liberty)
    - ArgoCD Project: `default`
    - Sync Policy: `Automatic` (Check prune resources and self heal)
    - Repository URL: `http://gitea.tools:3000/toolkit/gitops.git`
    - Revision: `HEAD`
    - Path: `qa/${TOOLKIT_PROJECT}/appmod-liberty-toolkit` (ie project1/qa/project1/appmod-liberty-toolkit)
    - Cluster: `in-cluster`
    - Namespace: `${TOOLKIT_PROJECT}-qa` (ie. project1-qa)
    - Click **CREATE**

1. Review the Applications in ArgoCD
    - Filter by Namespace `${TOOLKIT_PROJECT}-qa` (ie project1-qa)
    - Review Application: `${TOOLKIT_PROJECT}-websphere-liberty` (ie project1-websphere-liberty)

1. Review the Application in OpenShift
    - Switch to Developer perspective
    - Select **Topology** from the menu
    - Switch to project `${TOOLKIT_PROJECT}-qa` (ie project1-qa)
    - Click on the route url from the `appmod-liberty-toolkit` deployment, or the link on the circle.
    - Add `/CustomerOrderServicesWeb` to the end of the URL in the browser to access the application
    - Log in to the application with username: `rbarcia` and password: `bl0wfish`

1. Now the Websphere application is ready, the development teams can make changes to git repository for the application, while the gitops git repository is owned by the operations team.

1. Congratulations you finished this activity, continue with another lab in the workshop
