# IBM Garage Solution Engineering
[![Build Status](https://travis-ci.org/ibm-garage-cloud/ibm-garage-developer-guide.svg?branch=master)](https://travis-ci.org/ibm-garage-cloud/ibm-garage-developer-guide)

## Cloud Native Toolkit - Developer Guide

The developer guide has been written to help developers get familiar with how to use to the tools to manage the full
lifecycle of cloud native development with IBM Kubernetes Service or managed Red Hat OpenShift on IBM Cloud.

The rendered Developer Guide can be viewed here - [https://ibm-garage-cloud.github.io/ibm-garage-developer-guide/](https://ibm-garage-cloud.github.io/ibm-garage-developer-guide/)

To update and manage the Developer Guide follow these steps.

### Clone the repository

```
git clone
```

### Install dependencies

```
npm install
```

This will install all the dependencies necessary to run the environment in development mode
and to build and publish the content.

Most notably, this project depends on the following:
(documented in `package.json`):

```bash
npm install -g gatsby
```

### Write content

The content of the Developer Guide is authored through a hybrid of Markdown and React. The content
itself is primarily provided using Markdown. React components are sprinkled into the Markdown to
provide for a richer and more interactive set of components in the published guide.

To render the content within your local development environment, run the following:

```
npm run build
npm run dev
```

View your locally rendered content:

```
http://localhost:8000/
```

### Publish Content

This repository has been configured to build and publish the changes automatically via travis-ci. There are two builds currently configured:

- `dev` branch is automatically published to the `gh-pages` branch in [https://github.com/ibm-garage-cloud/ibm-garage-developer-guide-staging](https://github.com/ibm-garage-cloud/ibm-garage-developer-guide-staging) and is visible as a staging site here - [https://ibm-garage-cloud.github.io/ibm-garage-developer-guide-staging/](https://ibm-garage-cloud.github.io/ibm-garage-developer-guide-staging/)
- `master` branch is automatically published to the `gh-pages` branch in this repository which is visible here - [https://ibm-garage-cloud.github.io/ibm-garage-developer-guide/](https://ibm-garage-cloud.github.io/ibm-garage-developer-guide/)

The status of the travis-ci build can be seen here - https://travis-ci.org/github/ibm-garage-cloud/ibm-garage-developer-guide

**Note:** There is a time delay between when deploy process completes and when the
content is available on the published site.

### Gatsby and Carbon

Get started using with the Gatsby Carbon theme which includes all configuration you might need to build a
beautiful site inspired by the [Carbon Design System](https://www.carbondesignsystem.com).

## Resources

- [Getting Started](https://gatsby-theme-carbon.now.sh/getting-started)
- [Guides](https://gatsby-theme-carbon.now.sh/guides/configuration)
- [Components](https://gatsby-theme-carbon.now.sh/components/markdown)
- [Demo](https://gatsby-theme-carbon.now.sh/demo)
- [Gallery](https://gatsby-theme-carbon.now.sh/gallery)
- [Contributions](https://gatsby-theme-carbon.now.sh/contributions)
