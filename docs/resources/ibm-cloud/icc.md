# IBM Cloud cluster fast-switching (icc) tool

Easily log in to an IBM Cloud account and cluster

The ICC command-line tool makes it easy to log into an IBM Cloud account and a cluster in that account. It is the equivalent of running this for Kubernetes:

```shell
ibmcloud login <a whole bunch of paratemers>
ibmcloud ks cluster <some more parameters>
```

or this for OpenShift:

```shell
ibmcloud login <a whole bunch of paratemers>
oc login <some more parameters>
```

If you have multiple clusters, especially in multiple accounts, ICC makes it easy to switch your command line between clusters. All ICC requires is your API key for each account.

## Install ICC

To install ICC, perform [Developer Tools Setup](../../learning/dev-setup.md) to install all of the CLIs including ICC.

### Install yq

ICC (currently) requires `yq`, and it has to be v3 (v4 doesn't have the commands ICC needs). Check to see if `yq` is currently installed and if it's version 3:

!!!Todo
   Windows alternate commands? 

```shell
$ which yq
/usr/local/bin/yq
$ yq -V
yq version 3.3.2
```

If you don't have `yq` installed, follow either of these instructions:

- Installing yq in [Installing Command-Line Tools > For macOS](https://docs.pivotal.io/scdf-k8s/1-1/installing-command-line-tools.html#macos)
  - Download the [latest v3 build](https://github.com/mikefarah/yq/releases/tag/3.4.1)
- Install [yq v3 using Homebrew](https://formulae.brew.sh/formula/yq@3)

  ```shell
  brew install yq@3
  ```

And follow the instructions to add the install directory to your path.

### ICC help

Once ICC (and yq) is installed, you can view help for how to use it:

```shell
icc --help
Usage: icc [nickname] [--account {ACCOUNT_FILTER}] [--resourceGroup {RG_FILTER}] [--generate [{ACCOUNT_FILTER}]] [--nickname [{cluster name}]]

  Logs into an IBM Cloud cluster

Modes:
  cluster login   - icc {nickname}
  print config    - icc [--account {account name}] [--resourceGroup {resourceGroupName}]
  generate config - icc --generate [{account name}]
  update nickname - icc --nickname [{cluster name}]

Args:
  nickname - the cluster nickname
  --account, -a - filter to print the config for the provided account
  --resourceGroup, -g - filter to print the config for the provided resource group
  --generate - flag to generate the config from the account, optionally restricted to {account name}. The --generate process appends to the existing configuration
  --nickname - update the nickname for a cluster, optionally passing the cluster name after the flag
  --help, -h - display help
```

## Configure ICC

Once ICC is installed, before you can use it, you need to set it up:

1. Get your API key for your IBM Cloud account. If you don't have one, then [create an API key](https://cloud.ibm.com/docs/account?topic=account-userapikey#create_user_key). Remember, [your API key is uniquely for you](https://cloud.ibm.com/docs/account?topic=account-manapikey#ibm-cloud-api-keys), so keep it secret.

2. Run `icc --add-account` to add you API key to ICC

   ```shell
   icc --add-account
   Please provide the nickname for the IBM Cloud account: my-account
   Provide the IBM Cloud API Key for the my-account account: <hidden>
   Account information added for my-account

   Next steps:
   - Run '/Users/bwoolf/bin/icc --generate' to generate the cluster config from the account
   ```

   This creates the files `~/ibmcloud-account.yaml` and `~/ibmcloud.yaml`. The first file contains your API keys, so keep it secret.

3. Get the cluster metadata for the account by running `icc --generate`

   ```shell
   icc --generate
   Generate config for accounts: my-account
   Logging in to account: my-account
   Processing provider: classic
   Processing provider: vpc-gen2
   Processing provider: satellite
   Config file generated/updated: /Users/bwoolf/ibmcloud.yaml

   Next steps:
   - Run '/Users/bwoolf/bin/icc' to list the clusters
   - Run '/Users/bwoolf/bin/icc {nickname}' to log into a cluster
   - Run '/Users/bwoolf/bin/icc --nickname' to update the nickname for a cluster
   ```

   !!!Note   
      If you have multiple accounts, run `icc --add-account` multiple times to add the different API Keys. Also, `icc --generate` can be run multiple times to refresh the list of available clusters. Any nicknames that have been added will be preserved.

4. List the available clusters with `icc`

   ```shell
   icc
   my-cluster - my-account/my-resource-group/my-cluster
   ```

5. Optionally, give a short nickname for your cluster by running `icc --nickname`

   ```shell
   icc --nickname my-cluster
   Provide the new nickname for my-cluster: my-nickname
   Nickname for my-cluster updated to my-nickname in /Users/bwoolf/ibmcloud.yaml
   
   icc
   my-nickname - my-account/my-resource-group/my-cluster
   ```

## Use ICC

You can now log in to a cluster by running `icc [cluster name|cluster nickname]`

```shell
icc my-cluster
Logging into ibmcloud: us-south/my-resource-group
Logging into OpenShift cluster my-cluster with server url https://x123-z.us-south.containers.cloud.ibm.com:31047
```
