# Container Image Security Enforcement

Container Image Security Enforcement enables trust within your container workloads.

Container Image Security Enforcement verifies container images before deploying them to a cluster. You can control where images are deployed from, enforce Vulnerability Advisor policies, and ensure that content trust is properly applied to the image. If an image does not meet your policy requirements, the pod is not deployed to your cluster or updated.

Container Image security is applied on a per-cluster basis.  This can be enabled in for a cluster in IBM Cloud in a single command using the [IBM Cloud CLI](https://cloud.ibm.com/docs/cli).

```shell
ibmcloud oc cluster image-security enable -c <cluster name>
```

This command will configure the cluster to use Container Image Security, which installs [Portieris](https://github.com/IBM/portieris) in the cluster, and will also create `ClusterImagePolicy` instances to enforce signatures for IBM Cloud images.

Portieris is a Kubernetes admission controller for the enforcement of image security policies. With Portieris you can create image security policies either for each Kubernetes namespace or at the cluster level, and enforce different rules for different images.  Portieris will block deployment for any image that fails signature validation as defined by the image policies.  Thus ensuring that the images running inside of your cluster are unmodified from their original source.


!!!note
    Portieris can be used in clusters that are not running on IBM Cloud by <a href="https://github.com/IBM/portieris#installing-portieris">installing via the helm chart</a>.

## Enabling Policy Enforcement

Portieris uses [RedHat Signatures](https://www.redhat.com/en/blog/container-image-signing) to sign container images.

To take advantage of Portieris and policy enforcement, you need 3 things:

1. A GnuPG key to sign container images, stored in a vault
2. A process to sign container images using the key from the credentials vault
3. An `ImagePolicy` or `ClusterImagePolicy` that can instruct Portieris to apply enforcement rules

The following steps are based on [signing images for trusted content](https://cloud.ibm.com/docs/Registry?topic=Registry-registry_trustedcontent).

### Getting started quickly

A script that demonstrates how to easily create a GPG key, publish it to a vault, setup cluster secrets, and setup a default ClusterImagePolicy (as described below) is available at https://github.com/IBM/ibm-garage-tekton-tasks/blob/image-signing/utilities/setup-image-signing-keys.sh

The [toolkit's 8-image-release.yaml](https://github.com/IBM/ibm-garage-tekton-tasks/blob/main/tasks/8-image-release.yaml) tekton task has also been updated to accept the output of this script and enforce signatures during the image release phase.

### Create an Image Signing Key

An image signing key must be created to sign the container images.  This can be done by executing the following command:

```shell
gpg --generate-key
```

This will create a public and private key combination that can be used to sign and verify container images.  The output of the `gpg --generate-key` command will show the fingerprint of the newly generated key.  This fingerprint will be needed in the following steps.

#### Saving the private key in a vault


Once your key has been generated, the private key should be stored within a credentials vault, such as [Key Protect](key-protect.md) or [IBM HyperProtect Crypto Services](https://cloud.ibm.com/docs/hs-crypto?topic=hs-crypto-overview).

The private key should be placed in the vault as a base64 encoded string, which can be accessed by your [Tekton](tekton.md) pipeline during the image building task.

To place the private key in a vault

```shell
ENCODED_PRIVATE_KEY=$(gpg --export-secret-key <KEY_FINGERPRINT> | base64)

curl -X POST https://<region>.kms.cloud.ibm.com/api/v2/keys \
    -H 'authorization: Bearer <IAM_token>' \
    -H 'bluemix-instance: <instance_ID>' \
    -H 'content-type: application/vnd.ibm.kms.key+json' \
    -d "{
        \"metadata\": {
            \"collectionType\": \"application/vnd.ibm.kms.key+json\",
            \"collectionTotal\": 1
        },
        \"resources\": [
            {
                \"type\": \"application/vnd.ibm.kms.key+json\",
                \"name\": \"image-signing-key\",
                \"aliases\": [],
                \"description\": \"Private key for signing container images\",
                \"payload\": \"$ENCODED_PRIVATE_KEY\",
                \"extractable\": true
            }
        ]
    }"
```

Both [Key Protect](https://cloud.ibm.com/apidocs/key-protect) and [Hyper Protect Crypto Services](https://cloud.ibm.com/apidocs/hs-crypto) have an identical API, so the previous steps are identical except that a different API endpoint is used.

#### Saving the public key

The public key needs to be made available to the cluster for verifying container image signatures by either creating a secret within the cluster, or making the public key available through [Artifactory](artifactory.md).

Use the following commands to make the public key available for policy enforcement by creating a secret within the cluster:

```shell
gpg --export --armour <KEY_FINGERPRINT> > key.pubkey
oc create secret generic image-signing-public-key --from-file=key=key.pubkey
```

### Signing container images

Container image policy enforcement will reject images that are not signed, so you need to sign images either when they are pushed to the container registry.  This can be done using either the `skopeo copy` command or `buildah push` command, depending when you want to sign your images.

#### Extracting the private key for signing

The following commands can be used to access your private key from the vault, and import it into gpg for use in signing.  This would be used inside of your pipeline:

```shell
echo "Getting private key from keystore for image signing"
curl -s -o payload \
    https://<region>.kms.cloud.ibm.com/api/v2/keys/<key_ID_or_alias> \
    -H "Authorization: Bearer <IAM_token>"   \
    -H "Content-Type: application/json" \
    -H "bluemix-instance: <instance_ID>"

ENCODEDKEY=$(jq ".resources[0].payload" -r payload)
echo $ENCODEDKEY > encodedkey
base64 -d encodedkey > decodedkey

echo "Importing key"
gpg --import decodedkey
```

Once the key is imported, then the image can be signed.  If the image is being signed at build time, the signature can be specified by the `--sign-by` parameter to the `buildah` command:

```shell
buildah --sign-by <KEY_FINGERPRINT> --storage-driver=overlay push --digestfile ./image-digest ${APP_IMAGE} docker://${APP_IMAGE}
```

If the image is being signed at copy-time, it can be specified as a parameter to the `skopeo` command:

```shell
skopeo --sign-by <KEY_FINGERPRINT> copy ${IMAGE_FROM_CREDS} docker://${IMAGE_FROM} docker://${IMAGE_TO}
```

!!!note
    On Linux® and macOS: The default configuration for the signing tools is to store the signatures locally. Storing signatures locally can lead to signature verification failure because the signature is not in the registry. To fix this problem, you can modify or delete the configuration file. On Linux®, the configuration is saved in /etc/containers/registries.d/default.yaml. On macOS, the configuration file is saved in /usr/local/etc/containers/registries.d/default.yaml.  If you sign images in your container registry, yet your deployments are failing with the message `policy denied the request: A signature was required, but no signature exists`, then the default configuration is likely saving your image signatures locally instead of pushing the signature to the registry API server and you need to modify the tools configuration. 




### Create image policies

Finally, image policies need to be created to instruct Portieris which keys should be used to sign images from specific container registries.  These policies can be applied globally to the entire cluster using a `ClusterImagePolicy`, or to a specific namespace using an `ImagePolicy` resource.  In those policies, rules can be defined for enforcement for specific container registries/namespaces, or globally to all container registries used by the cluster.

For example, the following `ClusterImagePolicy` enforces a policy that all images in the container registry `private.us.icr.io/mynamespace/*` must be signed by the public key that was earlier created and placed into the `image-signing-public-key` cluster secret.  This policy should be updated for your own registry namespace and images.

```yaml
apiVersion: portieris.cloud.ibm.com/v1
kind: ClusterImagePolicy
metadata:
  name: mynamespace-cluster-image-policy
spec:
   repositories:
    - name: "private.us.icr.io/mynamespace/*"
      policy:
        mutateImage: false
        simple:
          requirements:
          - type: "signedBy"
            keySecret: image-signing-public-key
```

This policy also uses the `mutateImage:false` configuration so that the GitOps operations using ArgoCD do not enter an infinite loop due to mutated image paths.    
More information about [policies and enforcement](https://github.com/IBM/portieris/blob/master/POLICIES.md) and [image mutation](https://github.com/IBM/portieris#image-mutation-option) can be found in the Portieris Policies documentation.


## Tekton tasks

A script that demonstrates how to easily create a GPG key, publish it to a vault, setup cluster secrets, and setup a default ClusterImagePolicy is available at [IBM/ibm-garage-tekton-tasks/setup-image-signing-keys.sh](https://github.com/IBM/ibm-garage-tekton-tasks/blob/main/utilities/setup-image-signing-keys.sh)

The [toolkit's 8-image-release.yaml](https://github.com/IBM/ibm-garage-tekton-tasks/blob/main/tasks/8-image-release.yaml) tekton task has also been updated to accept the output of this script and enforce signatures during the image release phase.


## Impact to Kubernetes yaml or helm charts

The Portieris image signing tools require an explicit specifcation which image pull secrets should be used to retrieve the signature/trust data.  You deployment must specify an `imagePullSecret` value, or else the trust/verification will fail.



## Additional Information

Additional information on trusted content and policy enforcement can be found at:

- [Signing images for trusted content](https://cloud.ibm.com/docs/Registry?topic=Registry-registry_trustedcontent)
- [Gnu Privacy Guard (GPG)](https://gnupg.org/)
- [RedHat Signatures](https://www.redhat.com/en/blog/container-image-signing)
- [Portieris](https://github.com/IBM/portieris)
- [Portieris Policies](https://github.com/IBM/portieris/blob/master/POLICIES.md)
- [Key Protect API Docs](https://cloud.ibm.com/apidocs/key-protect)
- [Hyper Protect API Docs](https://cloud.ibm.com/apidocs/hs-crypto)
