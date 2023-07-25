
author: Blockless Team
summary: Deploy and manage a Blockess Node using Docker
id: deploying-a-blockless-node-with-docker
categories: codelab,markdown
environments: Web
status: Published
feedback link: https://www.github.com/blocklessnetwork/b7s
analytics account: UA-123

# Deploying using Docker Image
Duration: 0:10:00

## Getting Started

## Things You Will Need

*   A machine running Docker.
*   A valid AWS\_ACCESS\_KEY\_ID and AWS\_SECRET\_ACCESS\_KEY for an S3-compatible storage provider. These credentials will be used for backing up your node's keys and configuration.
*   A valid KEY\_PATH and KEY\_PASSWORD for your S3-compatible storage provider. These credentials are used for backing up your node's keys and configuration.

## Step 1: Pull the Latest b7s Docker Image


    docker pull ghcr.io/blocklessnetwork/b7s:v0.0.25

## Step 2: Run the Node in the Head Node Configuration

    docker run -d --name b7s \
        -e AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID> \
        -e AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY> \
        -e KEY_PATH=<YOUR_S3_KEY_PATH> \
        -e KEY_PASSWORD=<YOUR_S3_KEY_PASSWORD> \
        -e NODE_ROLE=head \
        -e P2P_PORT=9527 \
        -e REST_API=8081 \
        -e DIALBACK_PORT=32342 \
        -e DIALBACK_ADDRESS=1.1.1.1 \
        -v /var/tmp/b7s/peerdb:/var/tmp/b7s/peerdb \
        -v /var/tmp/b7s/function-db:/var/tmp/b7s/function-db \
        -p 9527:9527 \
        ghcr.io/blocklessnetwork/b7s:v0.0.25

Make sure to replace <YOUR\_AWS\_ACCESS\_KEY\_ID>, <YOUR\_AWS\_SECRET\_ACCESS\_KEY>, <YOUR\_S3\_KEY\_PATH>, and <YOUR\_S3\_KEY\_PASSWORD> with your actual credentials.

## Step 3: Run the Node in the Worker Node Configuration

    docker run -d --name b7s \
        -e AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID> \
        -e AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY> \
        -e KEY_PATH=<YOUR_S3_KEY_PATH> \
        -e KEY_PASSWORD=<YOUR_S3_KEY_PASSWORD> \
        -e NODE_ROLE=worker \
        -e P2P_PORT=9527 \
        -v /var/tmp/b7s/peerdb:/var/tmp/b7s/peerdb \
        -v /var/tmp/b7s/function-db:/var/tmp/b7s/function-db \
        -p 9527:9527 \
        ghcr.io/blocklessnetwork/b7s:v0.0.25

Again, remember to replace <YOUR\_AWS\_ACCESS\_KEY\_ID>, <YOUR\_AWS\_SECRET\_ACCESS\_KEY>, <YOUR\_S3\_KEY\_PATH>, and <YOUR\_S3\_KEY\_PASSWORD> with your actual credentials.

Congratulations! You have successfully launched the b7s Docker image with either the Head Node or Worker Node Configuration. Your node is now up and running, ready to participate in the Blockless Network. Happy coding!