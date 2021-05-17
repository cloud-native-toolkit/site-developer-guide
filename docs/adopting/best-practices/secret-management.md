#Secret management

Deploying an application into containers involves both the application logic and the associated configuration. The application logic is packaged into a container image so that it can be deployed but in order to make the container image portable across different environments, the application configuration should be managed separately and applied to the application container image at deployment time.

Fortunately, container platforms like Red Hat OpenShift and Kubernetes provides a mechanism to easily provide the configuration at deployment time: ConfigMaps and Secrets. Both ConfigMaps and Secrets work in the same way to represent information in key value pairs and allow that information to be attached to a running container in a number of different ways. Unlike ConfigMaps, Secrets are intended to hold sensitive information (like passwords) and have additional access control facilities to limit who can read and use that information.

With a [GitOps](./getting-started-day-0/git-ops){: target=_blank} approach to [continuous delivery](./getting-started-day-2/continuous-delivery){: target=_blank}, the application container image and the associated configuration are represented in the Git repository together. When the desired state defined in Git is applied to an environment, the relevant Kubernetes resources like Deployments, ConfigMaps, and Secrets are generated from the provided Git configuration.

A common issue when doing GitOps is how to handle sensitive information that should not be stored in the Git repository 
(e.g. passwords, keys, etc). There are two different approaches to how to handle this issue:

1. Inject the values from another source into kubernetes Secret(s) at deployment time
2. Inject the values from another source in the pod at startup time via an InitContainer

The "other source" in this case would be a key management system that centralizes the storage and management of sensitive 
information. There are a number of key management systems available to manage the secret values:

- [Key Protect](../../reference/tools/secret-management-with-key-protect)
- Hyper Protect
- Hashicorp Vault

## Use the key management system at deployment time

[CD with ArgoCD](../../reference/tools/argocd.md) covers how to use ArgoCD to do GitOps, including how to manage sensitive information in a key management system.

## Use the key management system at pod startup time

!!Todo
    Coming soon
