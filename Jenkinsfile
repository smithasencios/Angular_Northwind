pipeline {

  environment {
    PROJECT = "northwind-project"
    APP_NAME = "northwindui"
    CLUSTER = "northwind"
    CLUSTER_ZONE = "us-central1-f"
    IMAGE_TAG = "gcr.io/${PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
    JENKINS_CRED = "${PROJECT}"
  }

  agent {
    kubernetes {
      label 'northwind-ui'
      defaultContainer 'jnlp'
      yaml """
apiVersion: v1
kind: Pod
metadata:
labels:
  component: ci
spec:
  # Use service account that can deploy to all namespaces
  serviceAccountName: cd-jenkins
  containers:
  - name: gcloud
    image: gcr.io/cloud-builders/gcloud
    command:
    - cat
    tty: true
  - name: kubectl
    image: gcr.io/cloud-builders/kubectl
    command:
    - cat
    tty: true
"""
}
  }
  stages {
    stage('Build and push image with Container Builder') {
      steps {
        container('gcloud') {
          sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${IMAGE_TAG} ."
        }
      }
    }

    stage('Deploy Production') {
      // Master branch
      when { branch 'master' }
      steps{
        container('kubectl') {
          sh("kubectl get ns production || kubectl create ns production")
          sh("sed -i.bak 's#gcr.io/cloud-solutions-images/northwindui:1.0.0#${IMAGE_TAG}#' ./k8s/production/*.yaml")
          step([$class: 'KubernetesEngineBuilder',namespace:'production', projectId: env.PROJECT, clusterName: env.CLUSTER, zone: env.CLUSTER_ZONE, manifestPattern: 'k8s/production', credentialsId: env.JENKINS_CRED, verifyDeployments: true])
        }
      }
    }
    
  }
}