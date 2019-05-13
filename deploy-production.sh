#!/bin/bash
set -e

docker build -t gcr.io/${PROJECT_NAME_PRD}/${DOCKER_IMAGE_NAME}:$TRAVIS_COMMIT .

echo $GCLOUD_SERVICE_KEY | base64 --decode -i > ${HOME}/client-secret.json
gcloud auth activate-service-account --key-file ${HOME}/client-secret.json

gcloud --quiet config set project $PROJECT_NAME_PRD
gcloud --quiet config set container/cluster $CLUSTER_NAME_PRD
gcloud --quiet config set compute/zone ${CLOUDSDK_COMPUTE_ZONE}
gcloud --quiet container clusters get-credentials $CLUSTER_NAME_PRD

gcloud docker -- push gcr.io/${PROJECT_NAME_PRD}/${DOCKER_IMAGE_NAME}:$TRAVIS_COMMIT
