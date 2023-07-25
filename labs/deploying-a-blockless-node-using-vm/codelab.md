
author: Blockless Team
summary: Deploy and manage a Blockess Node using a VM or Bare
id: deploying-a-blockless-node-with-vm
categories: codelab,markdown
environments: Web
status: Published
feedback link: https://www.github.com/blocklessnetwork/b7s
analytics account: UA-123

# Deploying using Docker a Virtual Machine or on Bare Metal
Duration: 0:10:00

## Obtaining the b7s Binary

You have multiple choices to obtain the binrary for b7s. You can:

* Build the b7s agent from source
* Download a prebuilt binary

## Run the Node in the Head Node Configuration (Bare Metal)

If you prefer running the b7s node directly on your machine without using Docker, follow the instructions below:

    if [ "$NODE_ROLE" = "head" ]; then
      ./b7s --peer-db /var/tmp/b7s/peerdb \
            --function-db /var/tmp/b7s/function-db \
            --log-level debug \
            --port $P2P_PORT \
            --role head \
            --workspace $WORKSPACE_ROOT \
            --private-key $NODE_KEY_PATH \
            --rest-api :$REST_API $dialback_args $bootnode_args
    else
      echo "This configuration is for the Head Node only. Use the Worker Node configuration for other nodes."
    fi

Make sure to set the environment variables like `P2P_PORT`, `REST_API`, `dialback_args`, `bootnode_args`, and replace `$NODE_KEY_PATH` and `$WORKSPACE_ROOT` with appropriate paths for your setup.