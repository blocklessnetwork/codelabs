
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

## Prerequisite

You should already have a machine running [Docker](https://www.docker.com/products/docker-desktop/). 

You should have:
*   A valid AWS\_ACCESS\_KEY\_ID and AWS\_SECRET\_ACCESS\_KEY for an S3-compatible storage provider. These credentials will be used for backing up your node's keys and configuration.
*   A valid KEY\_PATH and KEY\_PASSWORD for your S3-compatible storage provider. These credentials are used for backing up your node's keys and configuration.

If you do not currently have an S3 compatible file host, we recommend you use [Filebase](https://filebase.com/) to get an S3 compatible storage option that uses Blockchain compatible storage options.

## Step 1: Pull the Latest b7s Docker Image

    docker pull ghcr.io/blocklessnetwork/b7s:v0.0.25

## Step 2: Run the Node in the Head Node Configuration


- P2P_PORT: This variable defines the port number for peer-to-peer communication. You can set it to any available port number.
```bash
export P2P_PORT=5000
```
- REST_API: This variable determines the port number for the REST API. Choose an available port number for this purpose. If not provided, RPC will be disabled. 

```bash
export REST_API=8080
```
- $PEER_DB: This variable represents the location to save the P2P Peer Registration Database.

```bash
export PEER_DB=~/b7s/function-db
```

- $FUNCTION_DB: This variable represents the location to save the Function Deployment Database.

```bash
export FUNCTION_DB=~/b7s/function-db
```
- $BOOT_NODES: This variable represents a list of P2P addresses to bootstrap into a network

```bash
export BOOT_NODES=/ip4/159.89.90.90/tcp/32342/p2p/12D3KooWKTKwW1y6iRoGeag1y2wpNYV9UM8QaYXaTL7DUTZdEFw6,/ip4/65.108.6.185/tcp/30151/p2p/12D3KooWH7TiTXb4UzKKU5zMkCDSMx5KAwP4waBbknxnoXfWL7Db
```

Execute the `b7s` agent using docker run, passing in the environment the options. 

```bash
docker run -d --name b7s \
    -e AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID> \
    -e AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY> \
    -e KEY_PATH=<YOUR_S3_KEY_PATH> \
    -e KEY_PASSWORD=<YOUR_S3_KEY_PASSWORD> \
    -e NODE_ROLE=head \
    -e P2P_PORT=9527 \
    -e REST_API=8081 \
    -p 9527:9527 \
    ghcr.io/blocklessnetwork/b7s:v0.0.25
``


Optional Dialback can be passed through. In a case where the inbound address and port may differ from the one available to the container.

```bash
    -e DIALBACK_PORT=32342 \
    -e DIALBACK_ADDRESS=159.89.90.90 \
````

## Step 3: Run the Node in the Worker Node Configuration

Set the required environment variables:

- P2P_PORT: This variable defines the port number for peer-to-peer communication. You can set it to any available port number.
```bash
export P2P_PORT=5000
```

- $PEER_DB: This variable represents the location to save the P2P Peer Registration Database.

```bash
export PEER_DB=~/b7s/function-db
```

- $FUNCTION_DB: This variable represents the location to save the Function Deployment Database.

```bash
export FUNCTION_DB=~/b7s/function-db
```

- $BOOT_NODES: This variable represents a list of P2P addresses to bootstrap into a network

```bash
export BOOT_NODES=/ip4/159.89.90.90/tcp/32342/p2p/12D3KooWKTKwW1y6iRoGeag1y2wpNYV9UM8QaYXaTL7DUTZdEFw6,/ip4/65.108.6.185/tcp/30151/p2p/12D3KooWH7TiTXb4UzKKU5zMkCDSMx5KAwP4waBbknxnoXfWL7Db
```

Execute the `b7s` agent using docker run, passing in the environment the options. 

```bash
docker run -d --name b7s \
    -e AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID> \
    -e AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY> \
    -e KEY_PATH=<YOUR_S3_KEY_PATH> \
    -e KEY_PASSWORD=<YOUR_S3_KEY_PASSWORD> \
    -e NODE_ROLE=worker \
    -e P2P_PORT=$P2P_PORT \
    -p 9527:9527 \
    ghcr.io/blocklessnetwork/b7s:v0.0.25
```

Optional Dialback can be passed through. In a case where the inbound address and port may differ from the one available to the container.

```bash
    -e DIALBACK_PORT=32342 \
    -e DIALBACK_ADDRESS=159.89.90.90 \
```

Congratulations! You have successfully launched the b7s Docker image with either the Head Node or Worker Node Configuration. Your node is now up and running, ready to participate in the Blockless Network. Happy coding!