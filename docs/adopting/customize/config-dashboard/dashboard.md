# Configure Dashboard

Customize the Developer Dashboard and the OpenShift console

!!!Note
  An **environment administrator** performs the steps on this page. See [Plan Installation > Roles](/admin/plan-installation#roles) for the overview of the roles involved.

## Customizing the Dashboard

After the Dashboard has been installed into your development cluster, you can customize it to you team's needs. You can change the Title, Prefix, and Cloud Console links by adding the following environment variables to your deployment yaml.

Customize the Dashboard's title from its default of "IBM Cloud Garage"
- The necessary set of environment variables isn't defined by default. You need to edit the YAML for the `developer-dashboard` deployment in the `tools` namespace to insert this set of variables.
- Edit the YAML for the /tools/deployments/developer-dashboard resource. In the `spec.template.spec.containers` section, in the resources for the container named `developer-dashboard`, add a new `env` resource to this container that defines these environment variables:

    ```
              env:
                - name: DASHBOARD_TITLE
                  value: GSI Labs Sandbox
                - name: DASHBOARD_PREFIX
                  value: IBM
                - name: CLOUD_TITLE
                  value: Azure Console
                - name: CLOUD_URL
                  value: https://azure.microsoft.com/en-us/
                - name: LINKS_URL
                  value: http://<url>/data/links.json
    ```
- Then fill in the values you want to use, such as the name of your team and company
- **Note**: The `CLOUD_TITLE`, `CLOUD_URL`, and `LINKS_URL` aren't needed when the platform is IBM Cloud

You can also tailor the list of content that is displayed in the Activation tab and the Starter Kits tab by creating your own version of the [`links.json`](https://github.com/ibm-garage-cloud/developer-dashboard/blob/master/public/data/links.json) JSON file and host that somewhere accessible to you cluster's network.


## Adding tools

You can add additional tools to the [Developer Dashboard](/getting-started/dashboard) and to the Tools menu on the OpenShift console. The tools in the cluster are added automatically, but the tools outside the cluster must be added manually. You can also add tools for the Cloud Paks that you install in the environment, for CodeReady Workspaces (if you've installed that in the environment), etc.

### Adding tools to the Dashboard

Use the [Cloud Native Toolkit CLI](/getting-started/cli) to add tools to the dashboard.

- Use this syntax to add a tool:
    ```bash
    igc tool-config --name <name of tool> --url <url of tool>
    ```

- These are tools that every Environment has but that are hosted outside of the cluster. To add these to the Dashboard, run these commands and provide the URLs:
    ```
    igc tool-config --name ir --url {url image registry}
    igc tool-config --name logdna --url {url to LogDNA instance}
    igc tool-config --name sysdig --url {url to Sysdig instance}
    igc tool-config --name github --url {url to git org}
    ```

- If your Environment includes the Cloud Paks with these tools, add them to your Dashboard:
    ```
    igc tool-config --name ta --url {url to the Transformation Advisor}
    igc tool-config --name mcm --url {url to IBM CP4MCM}
    igc tool-config --name integration --url {url to CP4I instance}
    ```

- If you've [installed CodeReady Workspaces](/admin/install-crw) in your Environment, add it to your Dashboard:
    ```
    igc tool-config --name codeready --url {url to the CRW instance}
    ```

This table lists the tools that can be displayed.

| Tool Name                | Name Parameter  | Description | Pre-Configured |
| -----------------------  |:-------------- |:------------| :----------- |
| GitLab | `gitlab`  | IBM Cloud GitLab instance for the region you are using | Yes |
| Eclipse Che | `che` | Link to Eclipse Che instance | No |
| Jenkins | `jenkins` | If IKS configured by default | Yes |
| Pipeline | `pipeline` | If OCP configured by default | Yes |
| ArgoCD | `argocd` | Link to ArgoCD instance in cluster | Yes |
| Artifactory | `artifactory` | Link to Artifactory instance in cluster | Yes |
| SonarQube | `sonarqube` | Link to SonarQube instance in cluster | Yes |
| Pact | `pact` | Link to Pact Broker instance in cluster | Yes |
| Tekton | `tekton` | Link to Tekton Dashboard in cluster | No |
| Transformation Advisor | `ta` | Link to Transformation Advisor tool in cluster | No |
| Swagger Editor | `apieditor` | Link to Swagger Editor instance in cluster | Yes |
| CodeReady Workspaces | `codeready` | Link to CodeReady Workspaces instance in cluster | No |
| GitHub | `github` | Link to teams GitHub organization | Yes |
| Cloud Pak for Integration | `integration` | Link to main console for Cloud Pak for Integration | No |
| Cloud Pak for Multi Cloud Manager | `mcm` | Link to main console for Cloud Pak for Multi Cloud Manager | No |
| Cloud Pak for Data | `data` | Link to main console for Cloud Pak for Data | No |
| Cloud Pak for Automation | `automation` | Link to main console for Cloud Pak for Automation | No |
| Grafana | `grafana` | Link to Grafana in cluster | No |
| Prometheus | `prometheus` | Link to Prometheus in cluster | No |
| LogDNA | `logDNA` | Link to LogDNA service instance | No |
| Sysdig | `Sysdig` | Link to Sysdig service instance | No |
| Image Registry | `ir` | Link to Image Registry | No |
| Jaeger| `jaeger` | Link to Jaeger in cluster | Yes |


### Adding Tools to the OpenShift Console

If the <Globals name="env" /> includes an OpenShift cluster, the Environment adds a Tools menu to the OpenShift console. The tools in the cluster are automatically added, but you need to add the tools outside of the cluster to specify their URLs. You can also extend the Tools menu to provide fast links to common tools you the development team will require. These tools links are common across the cluster.

![OCP Console Tools](/images/ocp-console-tools.png)

- Edit the file called `tools.yaml` in the `terraform/scripts` folder. This file contains the CRDs required to configure the menu items. Add custom links for `github`, `logdna`, and `sysdig`, and save the file.

- Run the `terraform/scripts/config-console-tools` script to apply the settings in `tools.yaml`. To do so: Make sure you are logged into your cluster from the command line and run the script, specifying your cluster's ingress subdomain. To find the ingress subdomain, go to the cluster overview page in the IBM Cloud console; it's something like `resource-group-NNN-XXX.region.containers.appdomain.cloud`.
    ```
    ./config-console-tools {cluster ingress subdomain}
    ```

- Optionally, you can extend the list of tools to include links to other tools. For example, here are two links to the Cloud Pak for Multicloud Management and the Cloud Pak for Integration.
    ```
    ---
    apiVersion: console.openshift.io/v1
    kind: ConsoleLink
    metadata:
      name: toolkit-mcm
    spec:
      applicationMenu:
        imageURL: https://dashboard-tools.#CLUSTER_INGRESS_URL/tools/icon/mcm
        section: Cloud Native Toolkit
      href: https://icp-console.gsi-learning-ocp43-7ec5d722a0ab3f463fdc90eeb94dbc70-0000.us-east.containers.appdomain.cloud/
      location: ApplicationMenu
      text: Multi Cloud Manager
    ---
    apiVersion: console.openshift.io/v1
    kind: ConsoleLink
    metadata:
      name: toolkit-integration
    spec:
      applicationMenu:
        imageURL: https://dashboard-tools.#CLUSTER_INGRESS_URL/tools/icon/integration
        section: Cloud Native Toolkit
      href: https://navigator-integration.gsi-ocp311-integration-7ec5d722a0ab3f463fdc90eeb94dbc70-0001.us-east.containers.appdomain.cloud/
      location: ApplicationMenu
      text: Integration
    ```

## Obtaining links to external tools

To add external tools to the Dashboard and/or Tools menu, you need to know the links to those tools. Here's how to find those links.

### Image registry

To get the URL for the image registry:
- In the IBM Cloud console, navigate to Kubernetes > Registry or OpenShift > Registry
- On the Registry page, select the Images tab
- That URL for the Images tab (or any of the Registry tabs) is the one to add to the tools lists

### LogDNA dashboard

Get the URL for the LogDNA web UI in your environment (as explained in [IBM Log Analysis with LogDNA: Viewing logs](https://cloud.ibm.com/docs/services/Log-Analysis-with-LogDNA?topic=LogDNA-view_logs))
- In the IBM Cloud dashboard, navigate to **Observability** > **Logging**
- Find the logging instance named after your environment's cluster, such as `showcase-dev-iks-logdna`. To help find it,
you can filter by your resource group.
    ![LogDNA Logging Instance](/images/logdna-logging-instance.png)
- In the logging instance, the URL in the **View LogDNA** button is the one to add to the tools lists

### Sysdig dashboard

Get the URL for the Sysdig web UI for your environment (as explained in [Step 4: Launch the web UI](https://cloud.ibm.com/docs/services/Monitoring-with-Sysdig?topic=Sysdig-getting-started#step4))
- In the IBM Cloud dashboard, navigate to **Observability** > **Monitoring**
- Find the monitoring instance named after your environment's cluster, such as `showcase-dev-iks-sysdig`
![Sysdig Monitoring Instance](/images/sysdig-monitoring-instance.png)
- In the monitoring instance, the URL in the **View Sysdig** button is the one to add to the tools lists

