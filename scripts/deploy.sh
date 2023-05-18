#! /bin/sh

docker login -u $DOCKER_REGISTRY_USER -p $DOCKER_REGISTRY_PASSWORD 
docker build -t vultkayn/bta-web-app:latest -f Dockerfile.built .
docker push vultkayn/bta-web-app:latest

# NODE_ENV=production node ./bin/www