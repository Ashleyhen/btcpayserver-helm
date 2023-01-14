# Bitcoin Payserver manual set up

## Goal

 Have a repository with the required configurations needed a btc server in kubernets.

 what we have

- bitcoind
- lightningd

 high prority

- bitpay server

 medium prority

- connect to tour for enhanced

## Running the application

 requirements

- node
- minikube
- kubeclt
- pulumi

### Deploying to kubernetes

```bash
 pulumi up
```

To view local deployment run

```bash
 kubectl get deployments
```

### current sturture

```mermaid
flowchart LR
    bitcoin-core -->|rpc:18443|id1(c-lightning rpc:11001)
```
