
author: Blockless Team
summary: Deploy and manage a Blockess Node using a VM or Bare
id: deploying-a-blockless-node-with-vm
categories: codelab,markdown
environments: Web
status: Published
feedback link: https://www.github.com/blocklessnetwork/b7s
analytics account: UA-123

# Deploying using a Virtual Machine or on Bare Metal
Duration: 0:10:00

## Obtaining the b7s Binary

You have multiple choices to obtain the binary for b7s. You can:

* <a href="./#2" target="_self" >Build the b7s agent from source</a>
* <a href="./#1" target="_self" >Download a prebuilt binary</a>

You should have a recent version of MacOS, Linux or Windows. A Dual Core Machine, and 1Gb of Spare Ram, and at least 512Mb of Disk Space.

## Downloading a Prebuilt Binary

The latest version of the `b7s` agent, can be found on github. Choose a prebuilt for the Operating System and Processor Type you are deploying to.

### Downloading using the Browser

* [b7s v0.0.25](https://github.com/blocklessnetwork/b7s/releases/tag/v0.0.25)

The latest version of the runtime can be found on github. 

* [runtime v0.0.15](https://github.com/blocklessnetwork/runtime/releases/tag/v0.0.15)

## Building the b7s Agent from Source

To build the `b7s` repository you will need, you will also need to follow the <a href="./#3" target="_self" >Installing Binaries</a> step.

* git
* golang 1.19 [install](https://go.dev/doc/install)
* cargo 1.70.0  [install](https://doc.rust-lang.org/cargo/getting-started/installation.html)

### Clone the Git Repo

Clone the git repos, starting from a blank diretory

```bash
git clone git@github.com:blocklessnetwork/b7s.git
git clone git@github.com:blocklessnetwork/runtime.git
```

This will give you both repositories, and prepare the system for building releases.

### Building the Go Agent

To connect to the network, we need to prepare the networking agent that is written with golang. 

From inside the `b7s` agent directory, execute the following command

```bash
make
```
The go compiler will build for the current system as it's target.

* `dist/b7s` : the agent binary
* `dist/b7s-keygen` : generates crypto keys
* `dist/b7s-manager` : out of process manager connects using P2P keys

### Building the Runtime using Rust

To execute WASM files, we need to provide the Networking Agent with a runtime. Our offically supported runtime.

The compiler will target the current system as the build target. Inside the `runtime` directory execute the following command.

```bash
cargo build --release
```

The release will now be available under `target/release/blockless-cli`.

## Installing Binaries

Pick a location to move the binary files. This directory should be write, and execution accessible to the user who will be issuing the processes.

* We recommend you use a normal user and not `root`. 
* We recommend this folder is `chmod 755`, so only the user running the agent process and runtime have access to write to the folder.

Here is an example of how we would accomplish this if we built the binaries from source.

```bash
mkdir ~/bls
cp b7s/dist/b7s* ~/bls 
cp runtime/target/release/blockless-cli ~/bls
chmod -R 755 ~/bls
```

* `~/bls` directory was created
* we copied `b7s` and `blockless-cli` into `~/bls`
* we ensured the user can execute and write to the directory

**if you downloaded zip files, substitute the paths for the folder in which you decompressed the archives. ~/Downloads/b7s-os.arch**

## Configuration and Setup

Configuration and setup is pretty simple. Most of the configuration is passed in during runtime. Before we are able to launch the agent, we need to prepare a private/pubic key pair using the `keygen`.

The keygen will place keys in `cwd`. (current working directory)

`./bls-keygen`

Using `~/bls` as the install path from the prior step, an example would look like.

```bash
cd ~/bls
mkdir identity
cd identity
../b7s-keygen
```

**It's good practice to backup this keypair, this will identify your node on the network, for all future transactions**

## Run the Node in the Head Node Configuration

To run the `b7s` agent in `Head Node` configuration.

Set the required environment variables:

- P2P_PORT: This variable defines the port number for peer-to-peer communication. You can set it to any available port number.
```bash
export P2P_PORT=5000
```
- REST_API: This variable determines the port number for the REST API. Choose an available port number for this purpose. If not provided, RPC will be disabled. 

```bash
export REST_API=8080
```
- $NODE_KEY_PATH: This is the path to your private key. Replace $NODE_KEY_PATH with the actual path. For instance:

```bash
export NODE_KEY_PATH=~/b7s/identity/priv.bin
```

- $WORKSPACE_ROOT: This variable represents the root directory of your workspace. Replace $WORKSPACE_ROOT with the actual path. For example:

```bash
export WORKSPACE_ROOT=~/b7s/workspace
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

Execute the `b7s` agent using the options. 

```bash
./b7s --peer-db $PEER_DB \
      --function-db $FUNCTION_DB \
      --log-level debug \
      --port $P2P_PORT \
      --role head \
      --workspace $WORKSPACE_ROOT \
      --private-key $NODE_KEY_PATH \
      --rest-api :$REST_API \
      --boot-nodes $BOOT_NODES
```

Make sure to set the environment variables like `P2P_PORT`,`REST_API`, `dialback_args`, `bootnode_args`, and replace `$NODE_KEY_PATH` and `$WORKSPACE_ROOT` with appropriate paths for your setup.

Optionals. In some instances it's possible that you are behind a firewall, and need to specify either an inbound port, or potentially an inbound IP Address. Both of these can be provided using two additional flags

```bash
--dialback-address $DIALBACK_ADDRESS --dialback-port $DIALBACK_PORT
```

## Run the Node in the Worker Node Configuration


Set the required environment variables:

- P2P_PORT: This variable defines the port number for peer-to-peer communication. You can set it to any available port number.
```bash
export P2P_PORT=5000
```
- REST_API: This variable determines the port number for the REST API. Choose an available port number for this purpose. If not provided, RPC will be disabled. 

```bash
export REST_API=8080
```
- $NODE_KEY_PATH: This is the path to your private key. Replace $NODE_KEY_PATH with the actual path. For instance:

```bash
export NODE_KEY_PATH=~/b7s/identity/priv.bin
```

- $WORKSPACE_ROOT: This variable represents the root directory of your workspace. Replace $WORKSPACE_ROOT with the actual path. For example:

```bash
export WORKSPACE_ROOT=~/b7s/workspace
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

Execute the `b7s` agent using the options. 

```bash
./b7s --peer-db $PEER_DB \
      --function-db $FUNCTION_DB \
      --log-level debug \
      --port $P2P_PORT \
      --role worker \
      --workspace $WORKSPACE_ROOT \
      --private-key $NODE_KEY_PATH \
      --rest-api :$REST_API \
      --boot-nodes $BOOT_NODES
```

Make sure to set the environment variables like `P2P_PORT` `REST_API`, `dialback_args`, `bootnode_args`, and replace `$NODE_KEY_PATH` and `$WORKSPACE_ROOT` with appropriate paths for your setup.

Optionals. In some instances it's possible that you are behind a firewall, and need to specify either an inbound port, or potentially an inbound IP Address. Both of these can be provided using two additional flags

```bash
--dialback-address $DIALBACK_ADDRESS --dialback-port $DIALBACK_PORT
```

## Common Problems

Incase you run into some issues during setup, we've detailed some common problems that may happen.