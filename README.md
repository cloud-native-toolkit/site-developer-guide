# Cloud Native Toolkit - Developer Guide

[![Publish](https://github.com/cloud-native-toolkit/site-developer-guide/actions/workflows/publish.yaml/badge.svg)](https://github.com/cloud-native-toolkit/developer-guide/actions/workflows/publish.yaml)

[![Publish Beta](https://github.com/cloud-native-toolkit/site-developer-guide/actions/workflows/publish-beta.yaml/badge.svg)](https://github.com/cloud-native-toolkit/developer-guide/actions/workflows/publish-beta.yaml)

![Release](https://img.shields.io/github/v/release/cloud-native-toolkit/site-developer-guide)

[![Docker Repository on Quay](https://quay.io/repository/ibmgaragecloud/toolkit-guide/status "Docker Repository on Quay")](https://quay.io/repository/ibmgaragecloud/toolkit-guide)

The developer guide has been written to help developers get familiar with how to use to the tools to manage the full
lifecycle of cloud native development with IBM Kubernetes Service or managed Red Hat OpenShift on IBM Cloud.

The rendered Developer Guide can be viewed here - [https://cloudnativetoolkit.dev](https://cloudnativetoolkit.dev)

*Note*: The Beta version of the Developer Guide can be found here - [https://beta.cloudnativetoolkit.dev](https://beta.cloudnativetoolkit.dev)

It is primarily used to document features that are currently in Beta prior to releasing those features (and the associated documentation). The content for the Beta version of the Developer Guide is sourced from the `beta` branch.

## Logos

We have painstakingly documented all of the logos and icons used for 3rd party tools and the process for
documenting their use within the Developer Guide and the broader Toolkit. The [Logo Usage page](./docs/logos) documents
the approved logos and the requirements for their use.

## Contributing to Docs

To update and manage the Developer Guide, follow these steps in [Updating the Developer Guide](https://cloudnativetoolkit.dev/contribute/documentation/).

### Publish Content

This repository has been configured to build and publish the changes automatically via travis-ci. There are two builds currently configured:

- `main` branch is automatically published to the `gh-pages` branch in this repository which is visible here - https://cloudnativetoolkit.dev

**Note:** There is a time delay between when deploy process completes and when the
content is available on the published site.

