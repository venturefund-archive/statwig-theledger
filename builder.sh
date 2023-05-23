#!/bin/bash

# Set your GitLab Container Registry details
GITLAB_REGISTRY_URL="https://gitlab.example.com"
GITLAB_PROJECT_ID="your-project-id"
GITLAB_REGISTRY_USERNAME="your-gitlab-username"
GITLAB_REGISTRY_PASSWORD="your-gitlab-access-token-or-password"

# Find all directories containing a Dockerfile
DIRECTORIES=$(find . -type f -name Dockerfile -exec dirname {} \;)

# Loop through the directories
for DIR in $DIRECTORIES; do
    # Get the directory name
    DIRECTORY_NAME=$(basename "$DIR")

    # Set the Docker image name
    DOCKER_IMAGE_NAME="$DIRECTORY_NAME"
    DOCKER_IMAGE_TAG="latest"

    # Build the Docker image
    docker build -t "$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG" "$DIR"

    # Authenticate with GitLab Container Registry
    docker login -u "$GITLAB_REGISTRY_USERNAME" -p "$GITLAB_REGISTRY_PASSWORD" "$GITLAB_REGISTRY_URL"

    # Tag the Docker image with the GitLab Container Registry URL
    docker tag "$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG" "$GITLAB_REGISTRY_URL/$GITLAB_PROJECT_ID/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"

    # Push the Docker image to GitLab Container Registry
    docker push "$GITLAB_REGISTRY_URL/$GITLAB_PROJECT_ID/$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"

    # Cleanup: Remove the local Docker image
    docker rmi "$DOCKER_IMAGE_NAME:$DOCKER_IMAGE_TAG"
done
