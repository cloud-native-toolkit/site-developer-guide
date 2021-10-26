# Image Signing

Using signed images with Container Image Security Enforcement enables you to enforce trusted workloads within your Kubernetes deployments.  In other words, you can restrict the images running within your cluster to only those that you've explicitly allowed and have been signed with valid keys that you have specified.  This ensure that the container image has not changed since it left your build process, thus preventing the execution of compromised workloads.

See [Container Image Security Enforcement](../reference/tools/container-image-security-enforcement.md) for additional details and a  step by step guide to configure Container Image Security Enforcement on your clusters.