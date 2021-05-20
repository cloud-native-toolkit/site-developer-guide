# Static Analysis

Static analysis tools are a valuable part of a software development toolkit to identify potential issues.  Static analysis is not restricted to source code.  It can be applied to tooling configuration, such as a *Dockerfile* and also the the output of the build process, such as a container image.

There are a number of analysis tools used in a default install of the Cloud-Native Toolkit.

## SonarQube

SonarQube is a code analysis tool.  It works across multiple languages and can identify a number of issues within the source code, such as:

- common coding errors like forgetting the **this** keyword or using assign operator '=' instead of the equality operator '==', which create valid syntax for the language, but the incorrect functionality
- security issues, such as using versions of libraries or packages that have known security issues;  Using older encryption technologies for authentication where better alternatives now exist
- identifying poorly written code, such as overly complex code or duplicated code

SonarQube can be configured with quality gates, so poorly written or buggy code will fail analysis, but minor issues will be highlighted but still pass analysis.

The standard pipelines used by the Cloud-Native Toolkit use SonarQube analysis.

## Hadolint

Hadolint is a linter that checks Dockerfiles to ensure that container best practices are being used.

## Vulnerability advisor

The vulnerability advisor scans container images to identify if the container contains any packages that contain known security contained in operating system packages.  Some scanning applications will also check application dependencies contained in the container image.

The Cloud-Native Toolkit uses 2 scanning applications:

- [IBM Vulnerability Advisor](https://cloud.ibm.com/docs/va){: target=_blank} for containers stored in the IBM Container registry on the IBM Cloud
- [Trivy](https://aquasecurity.github.io/trivy){: target=_blank} is an open source tool providing vulnerability scanning

The pipelines installed by the Cloud-Native Toolkit include vulnerability scanning.  However, the scan can be controlled by setting a variable on the pipeline to opt to skip the scan or perform the scan.
