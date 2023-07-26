
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

* Build the b7s agent from source
* Download a prebuilt binary

You should have a recent version of MacOS, Linux or Windows. A Dual Core Machine, and 1Gb of Spare Ram, and at least 512Mb of Disk Space.

## Downloading a Prebuilt Binary

The latest version of the `b7s` agent, can be found on github. Choose a prebuilt for the Operating System and Processor Type you are deploying to.

### Downloading using the Browser

* [b7s v0.0.25](https://github.com/blocklessnetwork/b7s/releases/tag/v0.0.25)

The latest version of the runtime can be found on github. 

* [runtime v0.0.15](https://github.com/blocklessnetwork/runtime/releases/tag/v0.0.15)

## Installing a Prebuilt Binary

The installation is pretty simple. Place the binaries in a directory that the user account you plan to use to run the binary agent, has access to execute within. 

Often placing them in `~/blockless` is enough. Ensure that the agents have been `chmod +x` on your system.

```bash
chmod +x b7s
chmod +x blockless-cli
```

## Building the b7s Agent from Source

To build the `b7s` repository you will need, you will also need to follow the `Installing Runtime` steps.

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
cargo build
```
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