# Starter kits

## Overview

In the [Overview](./starter-kit.md){: target=_blank} section we describe why *Start Kits* provide a perfect on ramp to help projects get started. The Developer Tools project is providing a set of seed templates that can be used to get projects moving quickly and focusing on use case business logic.

Read up on why you should start with a **Starter Kit** and if you have not already tried to [deploy your first app](../../learning/fast-ci.md){: target=_blank} to show you how easy it is to get started

Here are links to the base set of **Starter Kits** provided for the *Cloud-Native Toolkit*.

- To use the Starter Kits, click on the link and then the **Template** button to create a version in your own git organization.

- Then clone it onto your local machine and then use `igc pipeline` to register it with your Jenkins server.

    ```shell
    oc login
    oc get pods
    git clone <code pattern> | cd <code pattern>
    oc sync <project> --dev
    oc pipeline
    ```

- If you are bringing your own code run the `oc enable` command to add a Helm chart and make sure you code exposes a `/health` endpoint and the `values.yaml` is exposing the correct port for your application.

### Git Repo Links

| Title | Subtitle | Link
|-------|----------|---------
| React UI Patterns | Carbon based UI to help with common patterns using React framework | [https://github.com/IBM/template-node-react](https://github.com/IBM/template-node-react){: target=_blank}
| Angular UI Patterns | Carbon based UI to help with common patterns using Angular framework | [https://github.com/IBM/template-node-angular](https://github.com/IBM/template-node-angular){: target=_blank}
| Typescript Microservice | Node.js TypeScript Microservice offering OpenAPI endpoints | [https://github.com/IBM/template-node-typescript](https://github.com/IBM/template-node-typescript){: target=_blank}
| Typescript GraphQL | Node.js TypeScript GraphQL Backend for Frontend| [https://github.com/IBM/template-graphql-typescript](https://github.com/IBM/template-graphql-typescript){: target=_blank}
| Spring Boot Microservice | Spring Boot Java Microservice | [https://github.com/IBM/template-java-spring](https://github.com/IBM/template-java-spring){: target=_blank}
| Go Gin Microservice | Go Gin Microservice/Bff/Edge | [https://github.com/IBM/template-go-gin](https://github.com/IBM/template-go-gin){: target=_blank}
| Quarkus Microservice | Quarkus Java Microservice | [https://github.com/IBM/template-quarkus](https://github.com/IBM/template-quarkus){: target=_blank}
| Liberty Microservice | Open Liberty Java Microservice | [https://github.com/IBM/template-liberty](https://github.com/IBM/template-liberty){: target=_blank}
| Artificial Intelligence (AI) Microservice | Deep Learning Model: Locate and identify multiple objects in a single image | [https://github.com/IBM/MAX-Object-Detector](https://github.com/IBM/MAX-Object-Detector){: target=_blank}
| ArgoCD GitOps | Template configuration to help to set up GitOps with ArgoCD | [https://github.com/IBM/template-argocd-gitops](https://github.com/IBM/template-argocd-gitops){: target=_blank}
