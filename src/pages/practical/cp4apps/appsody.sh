#!/bin/bash


set -x

OPERATOR_NAMESPACE="appsody"

oc new-project ${OPERATOR_NAMESPACE}

curl -L https://raw.githubusercontent.com/appsody/appsody-operator/master/deploy/releases/0.2.0/appsody-app-cluster-rbac.yaml \
  | sed -e "s/APPSODY_OPERATOR_NAMESPACE/${OPERATOR_NAMESPACE}/" \
  | kubectl apply -f -


curl -L https://raw.githubusercontent.com/appsody/appsody-operator/master/deploy/releases/0.2.0/appsody-app-operator.yaml \
 | sed -e "s/APPSODY_WATCH_NAMESPACE/''/" \
 | kubectl apply -n ${OPERATOR_NAMESPACE} -f -
