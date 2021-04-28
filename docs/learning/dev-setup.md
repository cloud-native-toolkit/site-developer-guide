# Cloud-Native Toolkit Developer Setup

!!!ToDo
    This will be the setup needed for a developer to run through the learning content  
    - Prerequisites  
    - Install required CLI tools  
    - Git setup (Personal Access Token)

!!!Todo
    Should we offer different experiences?  
    - Local laptop  
    - LMS system (no local tooling/setup required)  
    - Hosted Shell in web browser (no local tooling/setup required)

!!!Todo
    Should we create the ArgoCD GitOps repo as part of developer setup - this way the gitops stage in the pipeline will run automatically - saving an additional run after configuration in the Continuous Delivery stage?

    Is creating the CD gitops repo considered a developer setup activity - or should it be within the CD section?

!!!Todo
    Format and verify content migrated below

---
title: Prerequisites
---

import Globals from 'gatsby-theme-carbon/src/templates/Globals';

<PageDescription>

Prepare your accounts for the Cloud-Native Toolkit

</PageDescription>

To complete the Getting Started activities, you will need to have a couple of accounts set up and some tokens created. 
Both developers and administrators will need to perform these steps.

This guide assumes that you have some basic knowledge of Kubernetes, Docker, and modern software delivery techniques 
including CI/CD. To learn more about these topics, after installing the environment, consult the educational materials 
listed in the Learning section [Cloud-Native Learning](/learning).

## User accounts

You'll need the following accounts to complete the Cloud-Native Toolkit Getting Started steps.

### Github account

You will need a [GitHub account](https://github.com) (public, not enterprise) to use the Starter Kit templates. Create 
one if you do not have one already. If you have not logged in for a while, make sure your login is working.

### IBM Cloud account

Create an [IBM Cloud account](https://cloud.ibm.com), if you don't have one already, and make sure you can log in. 
  
If you're going to [create a cluster](/admin/installation-ibm-cloud), you need to be a [member of a paid account](https://cloud.ibm.com/docs/iam?topic=iam-iamuserinv) and have permissions to create a cluster.

Otherwise, you can be added to another account and be granted access to an existing cluster.

## Account tokens

### Configure a Github personal access token

For your CI pipeline ([Jenkins](/tools/continuous-integration), [Tekton](/tools/continuous-integration-tekton), etc) to 
connect to and use your GitHub repo, it will need a [GitHub personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) with `public_repo` and `write:repo_hook` scopes. The Personal Access Token only needs to be generated once because it is associated with the GitHub organization and can be used to access any of the organization's repos.

- Navigate to [Developer Settings](https://github.com/settings/tokens) and generate a new token; name it something like "CI pipeline"
- Select `public_repo` scope to enable git clone
- Select `write:repo_hook` scope so the pipeline can create a web hook
  
    ![Pipeline OAuth scopes](./images/pipeline-scopes.png)
  
- The GitHub UI will never again let you see this token, so be sure to save the token in your password manager or somewhere safe that you can access later on

### Create an IBM Cloud API Key

API Keys are tokens scoped to a particular IBM Cloud account that can be used to access cloud services, particularly through
the IBM Cloud CLI. Generate an API Key for whichever account contains the cluster you will be using for the Getting Started
activities.

Follow these steps to [create an API key](https://cloud.ibm.com/docs/account?topic=account-userapikey#create_user_key) and
download the key to a file. Be sure to include a descriptive name of the API Key so you know where it is used.
