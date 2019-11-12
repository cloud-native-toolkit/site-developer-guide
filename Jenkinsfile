/*
 * This is a vanilla Jenkins pipeline that relies on the Jenkins kubernetes plugin to dynamically provision agents for
 * the build containers.
 *
 * The individual containers are defined in the `jenkins-pod-template.yaml` and the containers are referenced by name
 * in the `container()` blocks. The underlying pod definition expects certain kube Secrets and ConfigMap objects to
 * have been created in order for the Pod to run. See `jenkins-pod-template.yaml` for more information.
 *
 * The cloudName variable is set dynamically based on the existance/value of env.CLOUD_NAME which allows this pipeline
 * to run in both Kubernetes and OpenShift environments.
 */

def buildAgentName(String jobName, String buildNumber) {
    if (jobName.length() > 55) {
        jobName = jobName.substring(0, 55);
    }

    return "a.${jobName}.${buildNumber}".replace('_', '-').replace('/', '-').replace('-.', '.');
}

def buildLabel = buildAgentName(env.JOB_NAME, env.BUILD_NUMBER);
def namespace = env.NAMESPACE ?: "dev"
def cloudName = env.CLOUD_NAME == "openshift" ? "openshift" : "kubernetes"
def workingDir = env.CLOUD_NAME == "openshift" ? "/home/jenkins" : "/home/jenkins/agent"
podTemplate(
   label: buildLabel,
   cloud: cloudName,
   yaml: """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins
  containers:
    - name: node
      image: node:11-stretch
      tty: true
      command: ["/bin/bash"]
      workingDir: ${workingDir}
      envFrom:
        - configMapRef:
            name: pactbroker-config
            optional: true
        - configMapRef:
            name: sonarqube-config
            optional: true
        - secretRef:
            name: sonarqube-access
            optional: true
      env:
        - name: HOME
          value: ${workingDir}
"""
) {
    node(buildLabel) {
        container(name: 'node', shell: '/bin/bash') {
            checkout scm
            stage('Install') {
                sh '''#!/bin/bash
                    npm install
                '''
            }
            stage('Build') {
                sh '''#!/bin/bash
                    npm run build
                '''
            }
            stage('Git init') {
                sh '''#!/bin/bash
                   git config --global user.email "jenkins@ibm.com"
                   git config --global user.name "Jenkins Pipeline"
                '''
            }
            stage('Checkout gh-pages') {
                sh '''#!/bin/bash
                   git remote -v
                   git checkout -b test-pages origin/test-pages
                '''
            }
            stage('Copy files') {
                sh '''#!/bin/bash
                   cp -R ./public/* .
                '''
            }
            stage('Push changes') {
                sh '''#!/bin/bash
                   git add .
                   git commit -m "Pipeline updates"
                   git push
                '''
            }
        }
    }
}

