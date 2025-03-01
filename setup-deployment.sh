#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Copying .env.example to .env..."
    cp .env.example .env
    echo
    echo "WARNING: Please configure your .env file before running this script!"
    echo
    exit 1
fi

# Load environment variables from .env
set -a
source .env
set +a

# Trim whitespace from variables
DOCKER_USER=$(echo "$DOCKER_USER" | xargs)
COMPOSE_PROJECT_NAME=$(echo "$COMPOSE_PROJECT_NAME" | xargs)
USER_ID=$(echo "$USER_ID" | xargs)
GROUP_ID=$(echo "$GROUP_ID" | xargs)
USERNAME=$(echo "$USERNAME" | xargs)
GROUPNAME=$(echo "$GROUPNAME" | xargs)
API_PORT=$(echo "$API_PORT" | xargs)
CLIENT_PORT=$(echo "$CLIENT_PORT" | xargs)

# Construct IMAGE_NAME
IMAGE_NAME="${DOCKER_USER}/${COMPOSE_PROJECT_NAME}-client"

# Execute docker build with environment variables
docker build --no-cache \
    --build-arg USER_ID="${USER_ID}" \
    --build-arg GROUP_ID="${GROUP_ID}" \
    --build-arg USERNAME="${USERNAME}" \
    --build-arg GROUPNAME="${GROUPNAME}" \
    -t "${IMAGE_NAME}:latest" .

docker push "${IMAGE_NAME}:latest"
cp .env .deployment/.env

echo "Build completed successfully!"