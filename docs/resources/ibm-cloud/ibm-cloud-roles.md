# IBM Cloud account management

The IBM Cloud environment is provided with a number of powerful tools to manage user access and resource provisioning
but little is configured for you out of the box. This guide gives an approach to managing the account in a sensible way that can easily be extended or re-configured based upon the requirements of a given situation.

This approach to managing the account is organized around four key roles:

- **Account owner(s)**
- **Account managers**
- **Environment administrators**
- **Environment users**

This diagram shows the relationship of these access groups to a pair of development environments:

![Access groups example](images/access-example.png){: style="width: 90%" .center}

## Account owner(s)

The `account owner(s)` is the user who owns the account or users who have been granted super-user access to the account
at the same level as the account owner.

An account owner must create the access group for account managers. The account owner will:

- Create an `ACCT-MGR-IAM-ADMIN` access group using the `acp-mgr` script
- Add a functional ID, configured using the `acp-iaas` script, with API keys for the account managers

## Account managers

The `account managers` are an account owner or other users with account management permissions

As described in [Configure Account](/admin/config-account), the account managers can set up the resource groups and access groups needed to install and use the environments. For each environment, the account managers will:

- Create a resource group
- Create an access group named `<resource_group>-ADMIN` using the script `acp-admin`
- Create an access group named `<resource_group>-USER` using the script `acp-user`

## Environment administrators

The `environment administrators` are users in the account with permissions to create services in the environment's resource group. In this case, the "environment" is scoped to the `resource group`. Environment administrators are granted broad access to create, manage, and destroy services and resources within a given `resource group`.

## Environment users

The `environment users` are users in the account with permissions to use existing services in the environment's resource group (e.g. developers, data scientists, etc.). They are consumers of the services and resources that have been provisioned in order to build and deploy business applications.

More information can be found on the [IBM Cloud documentation](https://cloud.ibm.com/docs/account?topic=account-iamoverview){: target=_blank }
