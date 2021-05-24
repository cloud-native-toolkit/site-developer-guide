# Introduction to IBM Cloud Shell

<!--- cSpell:ignore invokecloudshell -->

IBM Cloud Shell is a free service that gives you complete control of your cloud resources, applications, and
infrastructure, from any web browser. It's instantly accessible from your IBM Cloud account - no other installation
is needed.

Features of IBM Cloud Shell include:

- Pre-configured environment: IBM Cloud Shell provides a curated, cloud-based workspace with dozens of preinstalled tools
  and programming languages. It's automatically authenticated with your IBM Cloud account so you can start to develop
  immediately.

- File upload/download: use this feature to import files to IBM Cloud Shell or pull-down data to your local machine.

- Multiple sessions: use up to five shell sessions at a time to maximize your productivity. Mirror workflows on your
  local machine, or view logs on one session while editing a file in another.

## Accessing the Cloud Shell

- Open the IBM Cloud console (cloud.ibm.com) in your browser and log in if needed.

- Invoke Cloud Shell by clicking on the button at the top, right-hand corner of the browser window.

    ![Invoke Cloud Shell](./images/invokecloudshell.png)

## Set up the shell environment

We have provided a simplified installer that will install tools and configure the shell environment. The installer will first check if the required tool is available in the path. If not, the missing tool(s) will be installed into the `bin/` folder of the current user's home directory and the `PATH` variable will be updated in the `.bashrc` or `.zshrc` file to include that directory.

The following tools are included in the shell installer:

- IBM Cloud cli (ibmcloud)
- ArgoCD cli (argocd)
- Tekton cli (tkn)
- IBM Cloud fast switching (icc)
- kube-ps1 prompt
- OpenShift cli (oc)
- Kubernetes cli (kubectl)
- JSON cli (jq)
- IBM Garage Cloud CLI (igc)

1. Set up the shell environment by running:

    ```shell
    curl -sL shell.cloudnativetoolkit.dev | bash -
    source ~/.bashrc || source ~/.zshrc

    ```

2. If successful, you should see something like the following:

    ```text
    Downloading scripts: https://github.com/cloud-native-toolkit/cloud-shell-commands/releases/download/0.3.5/assets.tar.gz
    ** Installing argocd cli
    ** Installing tkn cli
    ** Installing kube-ps1
    ** Installing icc
    ** Installing Cloud-Native Toolkit cli

    kube-ps1 has been installed to display the current Kubernetes context and namespace in the prompt. It can be turned on and off with the following commands:

      kubeon     - turns kube-ps1 on for the current session
      kubeon -g  - turns kube-ps1 on globally
      kubeoff    - turns kube-ps1 off for the current session
      kubeoff -g - turns kube-ps1 off globally

    Your shell configuration has been updated. Run the following to apply the changes to the current terminal:

      source ~/.zshrc
    ```

3. Follow the instruction given at the end of the output to enable the changes in the current terminal session.

4. You can check the shell was installed correctly by checking the `oc sync` version:

    ```shell
    oc sync --version
    ```
