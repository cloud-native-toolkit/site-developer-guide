# Monitoring and Log Management on IBM Cloud

The IBM Cloud offers consolidated application monitoring and logging services.

## Monitoring

In IBM Garage Method, one of the Operate practices is to [automate application monitoring](https://www.ibm.com/garage/method/practices/manage/practice_automated_monitoring/). Sysdig automates application monitoring, enabling an operator to view stats and collect metrics about a Kubernetes cluster and its deployments. The environment includes an IBM Cloud Monitoring with Sysdig service instance configured with a Sysdig agent installed in the environment's cluster. Simply by deploying your application into the environment, Sysdig monitors it, just open the Sysdig web UI from the IBM Cloud dashboard to browse your application's status.

## Log Management

Imagine your application isn't working right in production even though the environment is fine. What information would you want in your logs to help you figure out what's wrong with your application? Build logging messages for that information into your application.

Given that your application is logging, as are lots of other applications and services in your cloud environment, these logs need to be managed and made accessible. LogDNA adds log management capabilities to a Kubernetes cluster and its deployments. The environment includes an IBM Log Analysis with LogDNA service instance configured with a LogDNA agent installed in the environment's cluster. Simply by deploying your application into the environment, LogDNA collects the logs, just open the LogDNA web UI from the IBM Cloud dashboard to browse your application's logs.
