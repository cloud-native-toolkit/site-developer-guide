# Cloud Native Toolkit - Command Line Interface

<!--- cSpell:ignore myapp gituser gitpat gitsecret buildconfig prereq -->

## Invoking the CLI

When the [CLI is installed](../learning/dev-setup.md#install-the-cloud-native-toolkit-command-line-interface-cli), it adds an executable named `igc` to the PATH. Running `igc --help` will list
the available commands. The output text will be similar to the following:

```text
$ igc --help
IBM Garage Cloud Native Toolkit CLI (https://cloudnativetoolkit.dev)

Usage: igc <command> [args]

Commands:
  igc console                  Launch the IKS or OpenShift admin console
  igc create-webhook           Create a git webhook for a given Jenkins pipeline
  igc credentials              Lists the urls and credentials for the tools
                               deployed to the cluster
  igc dashboard                Open the Developer Dashboard in the default
                               browser
  igc enable                   Enable the current repository with pipeline logic
  igc endpoints                List the current ingress hosts for deployed apps
                               in a namespace
                                         [aliases: ingress, endpoint, ingresses]
  igc git-secret [name]        Create a kubernetes secret that contains the url,
                               username, and personal access token for a git
                               repo
  igc git [remote]             Launches a browser to the git repo url specified
                               by the remote. If not provided remote defaults to
                               origin
  igc gitops                   Registers the git repository in the kubernetes
                               cluster as the gitops repository for the given
                               namespace
  igc sync [namespace]         Create a namespace (if it does not exist) and
                               prepare it with the necessary configuration
                                                   [aliases: project, namespace]
  igc pull-secret [namespace]  Copy pull secrets into the provided project from
                               the template namespace
  igc pipeline [gitUrl]        Register a pipeline for the current code
                               repository
  igc tool-config [name]       Create the config map and secret for a tool
                               configured in the environment
  igc vlan                     Print out the vlan values
  igc yq <command>             lightweight yaml command-line processor that
                               addresses deficiencies with the existing `yq`
                               command

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

!!!Info
    As of v0.5.1, the Toolkit CLI will now install the commands as [plugins](https://kubernetes.io/docs/tasks/extend-kubectl/kubectl-plugins/){: target="_blank" .external } to the `kubectl` and `oc` CLIs.
    For example, all of the following are equivalent:

    ```shell
    igc pipeline
    kubectl pipeline
    oc pipeline
    ```

### Prerequisite tools

Some of the commands provided by the Toolkit CLI orchestrate interactions between other CLIs. To get
started please install the [prerequisite tools](../learning/dev-setup.md){: target=_blank}, in particular:

- The Kubernetes CLI
- The Red Hat OpenShift CLI
- The IBM Cloud CLI - used to interact with IBM Cloud vlans (not needed if tools will not run on IBM Cloud)

## Available commands

### dashboard

Opens the [Developer Dashboard](dashboard.md) in the default browser. If a default browser has not been
configured, then the URL to the Dashboard will be printed out.

The dashboard displays the Cloud-Native Toolkit tools configured within the cluster along with links to
activation content and links to Starter Kits to start a project quickly.

This command requires that the login context for the cluster has already been established.

#### Command flags

- `-n`: the namespace where the dashboard has been deployed; the default is `tools`

#### Usage

=== "CLI"
    The command is used in the following way:

    ```shell
    igc dashboard
    ```

=== "OpenShift"
    The following commands would have the same result on OpenShift:

    ```shell
    HOST=$(oc get routes/dashboard -n tools -o jsonpath='{.spec.host}')
    open "https://$HOST"
    ```

===  "Kubernetes"
  The following commands would have the same result on Kubernetes:

  ```shell
  HOST=$(kubectl get ingress/developer-dashboard -n tools -o jsonpath='{.spec.rules[0].host}')
  open "https://$HOST"
  ```

#### Related commands

- [credentials](#credentials): shows information about the same tools shown in the dashboard from the
command-line
- [tool-config](#tool-config): allows configuration for additional tools to be added to the cluster, making them
available to the dashboard and `credentials` command

### console

Opens the *IKS or OpenShift admin console* in the default browser. If a default browser has not been
configured, then the URL to the console will be printed out.

This command requires that the login context for the cluster has already been established.

#### Usage

=== "CLI"
    The command is used in the following way:

    ```shell
    igc console
    ```
=== "OpenShift"
    The following commands would have the same result on OpenShift:

    ```shell
    open $(oc whoami --show-console)
    ```

=== "Kubernetes"
    The following commands would have the same result on Kubernetes:

    ```shell
    REGION="..."
    CLUSTER_NAME="..."
    CLUSTER_ID=$(ibmcloud ks cluster get --cluster ${CLUSTER_NAME} | grep -E "^ID" | sed -E "s/ID: +([^ ]+)/\\1/g")
    open "https://${REGION}.containers.cloud.ibm.com/kubeproxy/clusters/${CLUSTER_ID}/service/#/overview?namespace=default"
    ```

#### Related commands

- [credentials](#credentials): shows information about the same tools shown in the dashboard from the
command-line
- [tool-config](#tool-config): allows configuration for additional tools to be added to the cluster, making them
available to the dashboard and `credentials` command

### git

Opens the Git repo in the default browser for the current working directory. If a default browser has not been
configured, then the URL to the repo will be printed out.

#### Usage

=== "CLI"
    The command is used in the following way:

    ```shell
    igc git
    ```

    If you have multiple remotes and would like to open one other than `origin`:

    ```shell
    igc git origin-fork
    ```

=== "Manual"
    The following commands would have the same result with shell commands:

    ```shell
    alias gh="open https://github.$(git config remote.origin.url | cut -f2 -d. | tr ':' /)"
    ```

#### Related commands

- [credentials](#credentials): shows information about the same tools shown in the dashboard from the
command-line
- [tool-config](#tool-config): allows configuration for additional tools to be added to the cluster, making them
available to the dashboard and `credentials` command

### credentials

Lists the endpoints, user names, and passwords for the tools configured in the environment. This is the easiest way to
get the login credentials for each of the installed tools. Ideally all of the tools would be accessible via SSO at which
point this command will be obsolete.

The command works by reading information available in the cluster. When each tool is installed by the toolkit, a
`config map` and `secret` are created to store the url and credential for the tool. That information is used in a
number of different ways within the environment:

- Provide configuration information to the pipelines
- Populate the tiles on the [Developer Dashboard](dashboard.md){: target=_blank}
- Populate the results of the `credentials` command

This command requires that the login context for the cluster has already been established.

#### Command flags

- `-n`: the namespace where the tools have been deployed; the default is `tools`

#### Usage

=== "CLI"
    The command is used in the following way:

    ```shell
    igc credentials
    ```

    The credential output is JSON format like this

    ```shell
    Credentials:  {
      argocd: {
        user: 'admin',
        password: '12345678',
        url: 'https://argocd-tools.mycluster.us-east.containers.appdomain.cloud'
      },
      . . .
      dashboard: {
        url: 'https://dashboard-tools.mycluster.us-east.containers.appdomain.cloud'
      },
      . . .
    }
    ```

=== "OpenShift or Kubernetes"
    The following commands have the same result (note the dependency on `jq`):

    ```shell
    # config maps
    kubectl get configmap -n tools -l grouping=garage-cloud-native-toolkit -o json | \
      jq '[.items[] | select(.metadata.name != "ibmcloud-config").data]'

    # secrets
    kubectl get secret -n tools -l grouping=garage-cloud-native-toolkit -o json | \
      jq '[.items[] | select(.metadata.name != "ibmcloud-apikey").data | with_entries(.value |= @base64d)]'
    ```

#### Related commands

- [dashboard](#dashboard): displays the url of the Developer Dashboard and launches the default browser
- [tool-config](#tool-config): allows configuration for additional tools to be added to the cluster, making them
available to the dashboard and `credentials` command

### endpoints

Lists the ingress and/or route URLs for the applications in a given namespace. An attempt will be made to get the
namespace from the current context if one is not provided as an argument. Results of the command are provided in an
interactive menu. If one of the endpoints is selected, it will display the URL and launch it in the default browser.
Selecting `Exit` will print the full list of endpoints and exit.

This command requires that the login context for the cluster has already been established.

#### Command flags

- `-n`: the namespace from which the endpoints will be read; the value will be read from the current context if not
provided

#### Usage

=== "CLI"
    The command is used in the following way:

    ```shell
    igc endpoints
    ```

=== "OpenShift"
      The following commands list the route and ingress endpoints:

      ```shell
      # routes
      kubectl get route -n tools

      # ingress
      kubectl get ingress -n tools
      ```

=== "Kubernetes"
    The following commands list the ingress endpoints:

    ```shell
    kubectl get ingress -n tools
    ```

### sync

Creates a Kubernetes namespace or OpenShift project (if it doesn't already exist) and sets it up so that the namespace
can be used as a target for application deployments and/or to host the environment.

The command synchronize the `ConfigMaps` and `Secrets` from a template namespace (ie `tools`) to create a "development" namespace. After
the command has run successfully it will set the provided namespace in the current context
(e.g. equivalent to `oc project X`)

This command copies the relevant `ConfigMaps` and `Secrets` into the namespace that are
needed for development activities. Managing resources across namespaces (particularly `ConfigMaps` and `Secrets`) is a
common challenge in Kubernetes environments. We have provided the command at this time to simplify the steps required
to get everything ready. Ultimately, this problem seems like an ideal one for an Operator to solve and when one is
available (either from the Toolkit or elsewhere) this command will be retired or transitioned.

The command will setup the "development" namespace where DevOps pipelines can be run (e.g. myapp-dev)

The "development" namespace will have the `ConfigMaps` and `Secrets` copied over.

The command can also add additional privileges to the tekton pipeline service account.  These privileges are needed to run the buildah task in OpenShift 4.7

```text
Positionals:
  namespace  The namespace that will be created and/or prepared

Options:
      --version            Show version number                         [boolean]
      --help               Show help                                   [boolean]
  -t, --templateNamespace  the template namespace that will be the source of the
                           config                    [string] [default: "tools"]
  -z, --serviceAccount     the service account that will be used within the
                           namespace               [string] [default: "default"]
  -p, --tekton             flag indicating the tekton pipeline service account
                           should be given privileged scc
      --verbose            flag to produce more verbose logging        [boolean]
```

#### Usage

=== "CLI"
    Create a `dev` namespace for development

    ```shell
    igc sync -p myapp-dev
    ```

=== "OpenShift"
    Create a `dev` namespace for development

    ```shell
    oc sync -p myapp-dev
    ```

=== "Kubernetes"
    Create a `dev` namespace for development

    ```shell
    kubectl sync myapp-dev
    ```

=== "Manual ConfigMap and Secret setup"
    The following steps will copy the `ConfigMaps` and `Secrets` from a template namespace to a target namespace:

    ```shell
      export TEMPLATE_NAMESPACE="tools"
      export NAMESPACE="NAMESPACE"

      kubectl get configmap -l group=catalyst-tools -n ${TEMPLATE_NAMESPACE} -o jsonpath='{ range .items[*] }{ .metadata.name }{ "\n" }{ end }' | \
        while read cm; do
          kubectl get configmap ${cm} --namespace ${TEMPLATE_NAMESPACE} --export -o yaml | \
            kubectl apply --namespace $NAMESPACE -f -
        done

      kubectl get secret -l group=catalyst-tools -n ${TEMPLATE_NAMESPACE} -o jsonpath='{ range .items[*] }{ .metadata.name }{ "\n" }{ end }' | \
        while read cm; do
          kubectl get secret ${cm} --namespace ${TEMPLATE_NAMESPACE} --export -o yaml | \
            kubectl apply --namespace $NAMESPACE -f -
        done
    ```

    The **-p** or **--tekton** flag performs the same function as command:

    ```shell
      oc adm policy add-scc-to-user privileged -z pipeline
    ```

### pull-secret

Copy pull secrets into the provided project from the template namespace for the IBM Container Registry.

Set up a service account in the namespace with the pull secret(s) for the IBM Container Registry that are copied.

The pull secret(s) are required in order for pods to pull images that are stored in the IBM Container Registry.
When the cluster is created in IBM Cloud, a pull secret is provided in the `default` namespace. In order for a
pod in another namespace to use it, the secret must first be copied into the namespace. After that, the pod either
needs to reference the pull secret directly or the service account used by the resource needs to have a reference to
the secret. The CLI copies the pull secret over and adds it to the service account so the pod can take either
approach.

This command should be use to set up "release" namespaces where applications can be deployed (e.g. test, staging)

```text
Positionals:
  namespace  The namespace into which the pull-secret(s) will be created

Options:
      --version            Show version number                         [boolean]
      --help               Show help                                   [boolean]
  -t, --templateNamespace  the template namespace that will be the source of the
                           config                    [string] [default: "tools"]
  -z, --serviceAccount     the service account that will be used within the
                           namespace               [string] [default: "default"]
      --dev                flag to indicate this is a development namespace and
                           that development artifacts should be created[boolean]
      --verbose            flag to produce more verbose logging        [boolean]
```

#### Usage

=== "CLI"
    Copy the pull secret from `default` namespace into `myapp-test` namespace and add to serviceAccount `default`

    ```shell
    igc pull-secret myapp-test -t default -z default
    ```

=== "Manual pull secret setup"
    The following commands will copy the pull secret(s) from the `default` namespace and add them to the service account:

    ```shell
    export NAMESPACE="myapp-test"
    export SERVICE_ACCOUNT="default"

    if [[ $(kubectl get secrets -n "${NAMESPACE}" -o jsonpath='{ range .items[*] }{ .metadata.name }{ "\n" }{ end }' | grep icr | wc -l | xargs) -eq 0 ]]; then
        echo "*** Copying pull secrets from default namespace to ${NAMESPACE} namespace"

        kubectl get secrets -n default | grep icr | sed "s/\([A-Za-z-]*\) *.*/\1/g" | while read default_secret; do
            kubectl get secret ${default_secret} -n default -o yaml --export | sed "s/name: default-/name: /g" | kubectl -n ${NAMESPACE} create -f -
        done
    else
        echo "*** Pull secrets already exist on ${NAMESPACE} namespace"
    fi


    EXISTING_SECRETS=$(kubectl get serviceaccount/${SERVICE_ACCOUNT} -n "${NAMESPACE}" -o json  | tr '\n' ' ' | sed -E "s/.*imagePullSecrets.: \[([^]]*)\].*/\1/g" | grep icr | wc -l | xargs)
    if [[ ${EXISTING_SECRETS} -eq 0 ]]; then
        echo "*** Adding secrets to serviceaccount/${SERVICE_ACCOUNT} in ${NAMESPACE} namespace"

        PULL_SECRETS=$(kubectl get secrets -n "${NAMESPACE}" -o jsonpath='{ range .items[*] }{ "{\"name\": \""}{ .metadata.name }{ "\"}\n" }{ end }' | grep icr | grep -v "${NAMESPACE}" | paste -sd "," -)
        kubectl patch -n "${NAMESPACE}" serviceaccount/${SERVICE_ACCOUNT} -p "{\"imagePullSecrets\": [${PULL_SECRETS}]}"
    else
        echo "*** Pull secrets already applied to serviceaccount/${SERVICE_ACCOUNT} in ${NAMESPACE} namespace"
    fi
    ```

### pipeline

Connects a branch in a Git repo to a either a Jenkins or Tekton CI pipeline in the environment and triggers
an initial build. A webhook is also created so that when a new commit is added to the branch, the pipeline is triggered
to start the process to rebuild and redeploy the app using the new code. Currently, webhook creation is supported for
repositories hosted on Gitlab, Github, Github Enterprise, Bitbucket, Gitea and Gogs.

This command can either be used to register a git repository that has previously been cloned to the local filesystem **OR**
using the remote repo url.

#### Repository location

The `pipeline` command supports registering a CI pipeline for a repository that has been cloned locally or using the
remote repository url.

##### Local repository

If you are registering a local repository then you must run the command from within the directory of your local clone of the Git repo. When
registering a local repository, the pipeline will use the branch that is currently checked out.

##### Remote repository

To register a remote repository, pass the repo url as an argument to the `pipeline`
command. For example:

```shell
oc pipeline "https://github.com/my-org/my-repo"
```

You can optionally provide the branch name with the url using a hash (`#`):

```shell
oc pipeline "https://github.com/my-org/my-repo#my-branch"
```

!!!Note
    When registering a remote git repo, if the branch is not provided then the default branch will be used.

#### Pipeline type

The `pipeline` command supports registering pipelines with either Tekton or Jenkins. The pipeline can be specified from
the command-line with either the `--tekton` or `--jenkins` flags. If a flag is not provided then you will
be prompted to select the pipeline.

#### Git credentials

The command will prompt for the username and password/personal access token to access the Git repository, unless those are
already stored in a secret in the cluster namespace or provided as command-line parameters. The username and password can
be provided with the `-u` and `-p` flags. If you want to change the credentials that have already been stored in the
cluster namespace, the `-g` argument an be provided and you will be prompted for the credentials.

#### Tekton template pipeline

If a Tekton pipeline will be used, a template pipeline must be selected for the new repository pipeline. The command
reads the template pipelines available in the template namespace. The template namespace can be provided with the `-t` argument
and will default to `tools` if not provided. The command will also filter the list of pipelines based on the runtime
determined from the given repository.

If there is more than one template pipeline available then you will be prompted to pick one. The template pipeline
can also be provided on the command-line using the `--pipeline` argument. If the name doesn't match an available
pipeline then you will be prompted to select one.

#### Pipeline parameters

Once the pipeline template is selected, you will be prompted to provide values for the defined pipeline parameters. The
values can also be provided from the command-line using the `-p` argument. The name of the parameter is listed at the
beginning of the prompt message. Multiple parameters can be provided by repeating the `-p` argument. For example:

```shell
oc pipeline --tekton "https://github.com/my-org/my-repo" -p scan-image=false -p edge=false
```

#### Optional arguments

- `-u`: the username for accessing the Git repo
- `-P`: the password or personal access token for accessing the Git repo
- `-g`: ignore existing `git-credentials` secret and prompt to update the values
- `-p`: provide parameters for the pipeline
- `--jenkins`: deploy using a Jenkins pipeline
- `--tekton`: deploy using a Tekton pipeline
- `--pipeline`: the name of the Tekton pipeline
- `-n`: the deployment namespace; if not provided the namespace from the current context will be used
- `-t`: the template namespace; if not provided the value will default to `tools`

!!! Info "Usage"
    === "CLI"
        Create a Jenkins pipeline in the current namespace and prompt for the Git credentials

        ```shell
        oc pipeline --jenkins
        ```

        Create a Tekton pipeline in the `my-dev` namespace, using the Git credentials `gituser` and `gitpat`

        ```shell
        oc pipeline -n my-dev -u gituser -P gitpat --tekton
        ```

    === "Manual Steps for Tekton"
        The following is the list of steps required to manually configure a **Tekton**
        pipeline with your development cluster.

        1. Set the current namespace/project

            === "OpenShift"
                ```shell
                oc project {namespace}
                ```

            === "Kubernetes"
                ```shell
                kubectl config set-context --current --namespace={namespace}
                ```

        2. Copy the tasks from the `tools` namespace into the current namespace
            ```shell
            kubectl get tasks -o json -n tools | \
              jq 'del(.items[].metadata.uid) | del(.items[].metadata.selfLink) | del(.items[].metadata.resourceVersion) | del(.items[].metadata.namespace) | del(.items[].metadata.creationTimestamp) | del(.items[].metadata.generation) | del(.items[].metadata.annotations."kubectl.kubernetes.io/last-applied-configuration")' | \
              kubectl apply -f -
            ```

        3. List the available pipeline templates in the `tools` namespace and select the one to use for your project.
            ```shell
            kubectl get pipelines -n tools
            ```

        4. Clone the selected pipeline from the `tools` namespace into the current namespace
            ```shell
            kubectl get pipeline ${TEMPLATE_NAME} -o json -n tools | \
              jq --arg PIPELINE_NAME ${PIPELINE_NAME} '.metadata.name = $PIPELINE_NAME | del(.metadata.uid) | del(.metadata.selfLink) | del(.metadata.resourceVersion) | del(.metadata.namespace) | del(.metadata.creationTimestamp) | del(.metadata.generation) | del(.metadata.annotations."kubectl.kubernetes.io/last-applied-configuration")' | \
              kubectl apply -f -
            ```

            where:
            - `TEMPLATE_NAME` is the name of the pipeline selected in the previous step
            - `PIPELINE_NAME` is the name of the pipeline for your project

        #### Start the pipeline

        The Tekton pipeline does not automatically start when it is first created. After the webhook is created in the subsequent steps the
        pipeline will start when changes are pushed to the repository but before that, we can manually trigger the build to start using the CLI.
        (The pipeline can also be started through the OpenShift Console.)

        - Kick off the pipeline using the Tekton CLI

            ```shell
            tkn pipeline start {PIPELINE_NAME} -s pipeline -p git-url={GIT_REPO} -p git-revision={GIT_BRANCH}
            ```

        - To create a new PipelineRun with the same parameters from a previous PipelineRun you can do the following

            ```shell
            tkn pipeline start {PIPELINE_NAME} --use-pipelinerun {PIPELINE_RUN_NAME}
            ```

        #### Create a Git Webhook**

        ##### Create the event listener and triggers

        In order for a Tekton pipeline to be triggered by a webhook notification, several resources need to be created:

        - `TriggerTemplate` - defines how to create the PipelineRun and any other required resources when a webhook notification is received.
        - `TriggerBinding` - provides a mapping for the information available in the webhook payload into the TriggerTemplate
        - `EventListener` - makes the connection between the Pipeline, TriggerBinding, and TriggerTemplate together that will be created when a webhook is triggered

        1. Create a file named `tekton-trigger.yaml` and paste in the following contents:

            ```yaml
            apiVersion: triggers.tekton.dev/v1alpha1
            kind: TriggerTemplate
            metadata:
              labels:
                app: {PIPELINE_NAME}
              name: {TRIGGER_TEMPLATE_NAME}
            spec:
              params:
              - description: The git revision
                name: gitrevision
              - description: The git repository url
                name: gitrepositoryurl
              resourcetemplates:
              - apiVersion: tekton.dev/v1beta1
                kind: PipelineRun
                metadata:
                  generateName: {PIPELINE_NAME}-
                spec:
                  params:
                  - name: git-url
                    value: $(params.gitrepositoryurl)
                  - name: git-revision
                    value: $(params.gitrevision)
                  - name: scan-image
                    value: "false"
                  pipelineRef:
                    name: {PIPELINE_NAME}
            ---
            apiVersion: triggers.tekton.dev/v1alpha1
            kind: TriggerBinding
            metadata:
              labels:
                app: {PIPELINE_NAME}
              name: {TRIGGER_BINDING_NAME}
            spec:
              params:
              - name: gitrevision
                value: $(body.head_commit.id)
              - name: gitrepositoryurl
                value: $(body.repository.url)
            ---
            apiVersion: triggers.tekton.dev/v1alpha1
            kind: EventListener
            metadata:
              labels:
                app: {PIPELINE_NAME}
              name: {EVENT_LISTENER_NAME}
            spec:
              serviceAccountName: pipeline
              triggers:
              - bindings:
                - kind: TriggerBinding
                  name: {TRIGGER_BINDING_NAME}
                interceptors:
                - cel:
                    filter: header.match('X-GitHub-Event', 'push') && body.ref == 'refs/heads/{BRANCH_NAME}'
                name: {PIPELINE_NAME}
                template:
                  name: {TRIGGER_TEMPLATE_NAME}
            ```

        2. Replace the place holder values with the appropriate values:

            where:
            - `{PIPELINE_NAME}` is the name of your Pipeline resource from the previous section.
            - `{TRIGGER_TEMPLATE_NAME}` is the name of the TriggerTemplate. This can be the same as the `{PIPELINE_NAME}`.
            - `{TRIGGER_BINDING_NAME}` is the name of the TriggerBinding. This can be the same as the `{PIPELINE_NAME}`.
            - `{EVENT_LISTENER_NAME}` is the name of the EventListener. This can be `el-{PIPELINE_NAME}` if the EventListeners will be configured one-to-one with the Pipelines or the instance can be shared across the project.
            - `{BRANCH_NAME}` is the name of the branch from which webhook events should trigger the build to start

        3. Apply the trigger resources to the cluster, in the same namespace where the Pipeline was created

            ```shell
            kubectl apply -f tekton-trigger.yaml
            ```

        4. In order for the Git repository to trigger the build with a webhook, an endpoint needs to be available. Expose the EventListener service with a route to provide that endpoint.

            ```shell
            oc expose service ${EVENT_LISTENER_NAME} --name=${EVENT_LISTENER_NAME}
            ```

        ##### Register the webhook url with your Git repository

        The particular steps will vary to create the Webhook depending on the flavor of hosted Git you are using (GitHub, GitHub Enterprise, GitLab, BitBucket, etc)
        but the general flow will remain the same.

        1. Get the host name for the route created in the previous step

            ```shell
            oc get route ${EVENT_LISTENER_NAME} -o jsonpath='{.spec.host}'
            ```

        2. Create a webhook in your hosted Git repository using the https url of the host name from the previous step that is triggered by the desired events (e.g. push, pull request, release)

    === "Manual steps for Jenkins on OpenShift"
        #### Provision Jenkins ephemeral

        Jenkins ephemeral provides a kubernetes native version of Jenkins that dynamically provisions build agents on-demand.
        It's _ephemeral_ meaning it doesn't allocate any persistent storage in the cluster.

          1. Set the project/namespace

              ```shell
              oc project {NAMESPACE}
              ```

              where:
              - `{NAMESPACE}` is the development namespace where the pipelines will run

          2. Run the following command to provision the Jenkins instance in your namespace

              ```shell
              oc new-app jenkins-ephemeral
              ```

          3. Open the OpenShift console as described in the login steps above

          4. Select `Workloads -> Pods` from the left-hand menu

          5. At the top of the page select your project/namespace from the drop-down list to see the Jenkins instance running

        #### Give the `jenkins` service account `privileged` access

        All of the Cloud-Native Toolkit pipelines use `buildah` to build and push the container image to the registry.
        Unfortunately, the `buildah` container must run as root. By default, OpenShift does not allow containers to run as the
        root user and special permission is required for the pipeline to run.

        With the Jenkins build engine, all the build processes run as the `jenkins` service account. In order for the pipeline
        container to run as root on OpenShift we will need to give the `privileged` security context constraint (scc) to
        `jenkins` service account with the following command:

        ```shell
        oc project {NAMESPACE}
        oc adm policy add-scc-to-user privileged -z jenkins
        ```

        where:
        - `{NAMESPACE}` should be the name you claimed in the box note prefixed to `-dev` (e.g. user01-dev)

        #### Create a secret with git credentials

        In order for Jenkins to have access to the git repository, particularly if it is a private repository, a Kubernetes
        secret needs to be added that contains the git credentials.

        1. Create a personal access token (if you don't already have one) using the [prereq instructions](../learning/dev-setup.md#git-pat){: target=_blank}

        2. Copy the following into a file called `gitsecret.yaml` and update the {Git-Username}, and {Git-PAT}

            ```yaml
            apiVersion: v1
            kind: Secret
            metadata:
              annotations:
                build.openshift.io/source-secret-match-uri-1: https://github.com/*
              labels:
                jenkins.io/credentials-type: usernamePassword
              name: git-credentials
            type: kubernetes.io/basic-auth
            stringData:
              username: {Git-Username}
              password: {Git-PAT}
            ```

            where:
            - `Git-Username` is the username that has access to the git repo
            - `Git-PAT` is the personal access token of the git user

        2. After logging into the cluster, create the secret by running the following:

            ```shell
            oc project {NAMESPACE}
            oc create -f gitsecret.yaml
            ```

            where:
            - `{NAMESPACE}` is the development namespace where the pipelines will run

        #### Create the build config

        On OpenShift 4.3, Jenkins is built into the OpenShift console and the build pipelines can be managed using Kubernetes
        custom resources. The following steps will create one by hand to create the build pipeline for the new application.

        1. Copy the following into a file called `buildconfig.yaml` and update the {Name}, {Secret}, {Git-Repo-URL},
        and {Namespace}

            ```yaml
            apiVersion: v1
            kind: BuildConfig
            metadata:
              name: {Name}
            spec:
              triggers:
              - type: GitHub
                github:
                  secret: my-secret-value
              source:
                git:
                  uri: {Git-Repo-URL}
                  ref: master
              strategy:
                jenkinsPipelineStrategy:
                  jenkinsfilePath: Jenkinsfile
                  env:
                  - name: CLOUD_NAME
                    value: openshift
                  - name: NAMESPACE
                    value: {NAMESPACE}
            ```

            where:
            - `Name` is in the name of your pipeline
            - `Git-Repo-URL` is the https url to the git repository
            - `{NAMESPACE}` is the development namespace where the pipelines will run

        2. Assuming you are still logged into the cluster, create the buildconfig resource in the cluster

            ```shell
            oc project {NAMESPACE}
            oc create -f buildconfig.yaml
            ```

            where:
            - `{NAMESPACE}` is the development namespace where the pipelines will run

        #### View the pipeline in the OpenShift console

        1. Open the OpenShift console for the cluster
        2. Select Builds -> Build Config
        3. Select your project/namespace (i.e. `{NAMESPACE}`) from the top
        4. The build pipeline that was created in the previous step should appear
        5. Manually trigger the pipeline by selecting `Start Build` the menu button on the right side of the row

        #### Create the webhook

        1. Run the following to get the webhook details from the build config

            ```shell
            oc project {NAMESPACE}
            oc describe bc {Name}
            ```

            where:
            - `{Name}` is the name used in the previous step for the build config
            - `{NAMESPACE}` is the development namespace where the pipelines will run

            The webhook url will have a structure similar to:

            `http://{openshift_api_host:port}/oapi/v1/namespaces/{namespace}/buildconfigs/{name}/webhooks/{secret}/generic`

            In this case `{secret}` will be `my-secret-value`

        2. Open a browser to the GitHub repo deployed in the previous step in the build config

        3. Select `Settings` then `Webhooks`. Press `Add webhook`

        4. Paste the webhook url from the previous step into the `Payload url`

        5. Set the content-type to `application/json` and leave the rest of the values as the defaults

        6. Press `Add webhook` to create the webhook

        7. Press the button to test the webhook to ensure that everything was done properly

        8. Go back to your project code and push a change to one of the files

        9. Go to the Build pipeline page in the OpenShift console to see that the build was triggered

    === "Manual steps for Jenkins on Kubernetes"
        TBD

### enable

Adds DevOps artifacts to a Git repo that the environment uses to deploy the app. The command displays a
list of available pipelines and applies the one you select to your code repo. The DevOps files added to your repo
 include (but are not limited to):

- Helm chart
- Jenkinsfile

This command DOES NOT require that the terminal is already logged in to an IBM Cloud account nor the cluster. It DOES
require that the terminal's current directory is the repository directory for your local copy of the Git repo.

The command will add files to the local repo. You should commit these new files and push them to the server repo.
Then run `igc pipeline` to connect your repo to a pipeline in the environment.

#### Command flags

- `--repo`: the set of pipelines to choose from; the default is `https://github.com/ibm-garage-cloud/garage-pipelines`
- `-p`: the name of the pipeline that should be installed; if not provided then you will be prompted
- `-b`: the branch from which the pipeline should be installed; the default is `stable`
- `r`: the version number of the pipeline that should be installed; the default is `latest`

#### Usage

=== "CLI"
    1. Before running the command, make sure you have a clean repository with no unstaged changes. Either commit any
    changes or stash them temporarily with `git stash`. It is particularly important that any changes to the pipeline be
    dealt with.

    2. Apply the pipeline updates using the CLI command

        ```shell
        igc enable
        ```

    3. Review the changes using `git diff` and revert any application-specific changes that should remain (e.g.
    customization to the Jenkins pipeline in the `Jenkinsfile`, specific values added to `values.yaml`, customizations
    to the templates in the `helm chart`)

    4. Commit the changes when you are happy with them

=== "Manual steps"
    The follow provides the manual steps equivalent to the `igc enable` command:

    1. Before updating the pipelines, make sure you have a clean repository with no unstaged changes. Either commit any
    changes or stash them temporarily with `git stash`. It is particularly important that any changes to the pipeline be
    dealt with.

    2. Download the `index.yaml` file containing the available pipeline versions

        ```shell
        curl -O https://ibm-garage-cloud.github.io/garage-pipelines/index.yaml
        ```

    3. Look through the `index.yaml` file to identify the url for the desired pipeline branch and version

    4. With the PIPELINE_URL from the previous step, run the following to download the pipeline tar-ball

        ```shell
        curl -O ${PIPELINE_URL}
        ```

    5. Extract the tar-ball into your repository directory. You will be prompted to overwrite files. Overwrite as appropriate

        ```shell
        tar xzf ${PIPELINE_FILE}
        ```

    6. Review the changes using `git diff` and revert any application-specific changes that should remain (e.g.
    customization to the Jenkins pipeline in the `Jenkinsfile`, specific values added to `values.yaml`, customizations
    to the templates in the `helm chart`)

    7. Commit the changes when you are happy with them

### git-secret

Creates a kubernetes secret that contains the username and personal access token for a git repo and a config map that
contains the url, host, org, repo, and branch for the git repository. The secret is always named `git-credentials` and the config map
is named `{git org}.{git repo}`. The config map and secret will be created in the currently selected namespace/project,
unless a value is passed with the `-n` flag. If the `git-credentials` secret already exists then it won't be
replaced/updated it won't be updated unless the `--replace` argument is passed.

#### Command flags

- `[positional]`: overwrites the name of the config map
- `-n`: the namespace where the secret and config map should be created. Defaults to the currently selected project/namespace
- `-d`: the directory where the cloned repository is located. Defaults to the current working directory
- `-u`: the username for the git secret, If not provided the value will be collected from a prompt
- `-p`: the personal access token, If not provided the value will be collected from a prompt
- `--values`: an optional yaml file that contains additional attributes to add to the secret
- `--replace`: flag indicating that the secret should be replaced/updated if it already exists

#### Usage

==="CLI"
    The following gives an example of using the `git-secret` command to set up the config map and secret in the `dev` namespace

    ```shell
    igc git-secret -n dev
    ```

=== "Manual"
    The following gives the equivalent commands to create the config map and secret for a git repository in the `dev` namespace

    1. Create the `git-credentials` secret

        ```shell
        kubectl create secret generic git-credentials -n dev \
          --from-literal=username={git username} \
          --from-literal=password={git personal access token} \
          --dry-run --output=yaml | \
        kubectl label -f - --local --dry-run --output=yaml \
          "jenkins.io/credentials-type=usernamePassword" | \
        kubectl annotate -f - --local --dry-run --output=yaml \
          "build.openshift.io/source-secret-match-uri-1=https://github.com/*" \
          "tekton.dev/git-0=https://github.com" | \
        kubectl apply -f -
        ```

    2. Create the config map for a git repo located at `https://github.com/showcase/myrepo`

        ```shell
        kubectl create configmap showcase.myrepo -n dev \
          --from-literal=host=github.com \
          --from-literal=org=showcase \
          --from-literal=repo=myrepo \
          --from-literal=url=https://github.com/showcase/myrepo \
          --from-literal=branch=master
        ```

### gitops

Creates a kubernetes secret that contains the username and personal access token for a git repo and a config map that
contains the url, host, org, repo, and branch for the git repository. The secret is always named `git-credentials` and the config map
is named `gitops-repo`. The config map and secret will be created in the currently selected namespace/project,
unless a value is passed with the `-n` flag. If the `git-credentials` secret already exists then it won't be
replaced/updated unless the `--replace` argument is passed.

#### Command flags

- `-n`: the namespace where the secret and config map should be created. Defaults to the currently selected project/namespace
- `-d`: the directory where the cloned repository is located. Defaults to the current working directory
- `-u`: the username for the git secret, If not provided the value will be collected from a prompt
- `-p`: the personal access token, If not provided the value will be collected from a prompt
- `--values`: an optional yaml file that contains additional attributes to add to the secret
- `--replace`: flag indicating that the secret should be replaced/updated if it already exists

#### Usage

=== "CLI"
    The following gives an example of using the `gitops` command to set up the config map and secret in the `dev` namespace

    ```shell
    igc gitops -n dev
    ```

=== "Manual"
    The following gives the equivalent commands to create the config map and secret for a git repository in the `dev` namespace

    1. Create the `git-credentials` secret

        ```shell
        kubectl create secret generic git-credentials -n dev \
          --from-literal=username={git username} \
          --from-literal=password={git personal access token} \
          --dry-run --output=yaml | \
        kubectl label -f - --local --dry-run --output=yaml \
          "jenkins.io/credentials-type=usernamePassword" | \
        kubectl annotate -f - --local --dry-run --output=yaml \
          "build.openshift.io/source-secret-match-uri-1=https://github.com/*" \
          "tekton.dev/git-0=https://github.com" | \
        kubectl apply -f -
        ```

    2. Create the config map for a git repo located at `https://github.com/showcase/myrepo`

        ```shell
        kubectl create configmap github-repo -n dev \
          --from-literal=host=github.com \
          --from-literal=org=showcase \
          --from-literal=repo=myrepo \
          --from-literal=url=https://github.com/showcase/myrepo \
          --from-literal=branch=master
        ```

### tool-config

Configures a new tool in the environment. After deploying the tool, use this command to add the tool to the list of
credentials so that it will be displayed in the dashboard.

#### Command flags

- The name for the tool
- `-n`: the tools namespace; the default is `tools`
- `--url`: the endpoint for accessing the tool, usually its dashboard
- `--username`: (optional) the user name for logging into to tool
- `--password`: (optional) the password for logging into to tool

#### Usage

=== "CLI"
    The following gives an example of using the `tool-config` command to set up a tool named `my-tool` with its
    dashboard's endpoint and credentials

    ```shell
    igc tool-config my-tool \
      --url https://mytool-dashboard.mycluster.us-east.containers.appdomain.cloud \
      --username admin \
      --password password
    ```

=== "Manual install with helm"
    The following gives an example of using helm directly to do the equivalent (using helm 3):

    ```shell
    helm install my-tool tool-config \
      --repo https://ibm-garage-cloud.github.io/toolkit-charts/ \
      --set url=https://mytool-dashboard.mycluster.us-east.containers.appdomain.cloud \
      --set username=admin \
      --set password=password
    ```

### vlan

Lists the VLANs for a particular IBM Cloud region. This information is useful for preparing Terraform cluster creation
steps. The command reads all the data centers in the region and allows you to select the appropriate data center for
the vlan.

This command requires that the terminal is already logged in to the cloud region. It does NOT need to be logged in to a cluster.

#### Usage

=== "CLI"
    List a pair of public/private VLANs for a new environment to use

    ```shell
    igc vlan
    ```

=== "Manual steps"

    1. List the zones for the region

        ```shell
        ibmcloud ks zones --region-only --provider classic
        ```

    2. Select the desired zone from the listing provided by the previous command and run the following to list the vlans for that zone

        ```shell
        ibmcloud ks vlans --zone ${zone}
        ```
