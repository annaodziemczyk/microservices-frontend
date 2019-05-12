set -e

docker build -t gcr.io/${PROJECT_NAME_PRD}/${DOCKER_IMAGE_NAME}:$TRAVIS_COMMIT .

echo $GCLOUD_SERVICE_KEY_PRD | base64 --decode -i > ${HOME}/gcloud-service-key.json
gcloud auth activate-service-account --key-file ${HOME}/gcloud-service-key.json

gcloud docker -- push gcr.io/${PROJECT_NAME_PRD}/${DOCKER_IMAGE_NAME}:$TRAVIS_COMMIT
