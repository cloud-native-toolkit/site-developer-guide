#!/bin/sh
set -e

oc get job/ibm-toolkit &>/dev/null && read -p "Tookit already installed, delete tool's namespace and do fresh install? N/y: " REPLY
if [[ "$REPLY" == "Y" || "$REPLY" == "y" ]]; then
  oc delete job/ibm-toolkit -n default
else
  echo "Installation skipped"
  exit 0
fi
oc apply -f https://raw.githubusercontent.com/ibm-garage-cloud/ibm-garage-iteration-zero/master/install/install-ibm-toolkit.yaml
sleep 5
oc wait pod -l job-name=ibm-toolkit --for=condition=Ready -n default
oc logs job/ibm-toolkit -f -n default
