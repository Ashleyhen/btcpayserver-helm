# Introduction

Start accepting Bitcoin today with BTCPay Server! This guide will walk you through the installation.

While [our instructions](https://docs.btcpayserver.org/LunaNodeWebDeployment/) cover how to install BTCPayServer in one click on Azure or Lunanode, BTCPay Server is not limited to those options.

You will find below information about how you can install BTCPay Server easily in any environment having docker available.

# Architecture

![Architecture](https://github.com/btcpayserver/btcpayserver-doc/raw/master/docs/img/Architecture.png)

As you can see, BTCPay depends on several pieces of infrastructure, mainly:

* A lightweight block explorer (NBXplorer),
* A database (PostgreSQL),
* A full node (eg. Bitcoin Core)

There can be more dependencies if you support more than just standard Bitcoin transactions, including:

* [Core Lightning (CLN)](https://github.com/ElementsProject/lightning)
* [LitecoinD](https://github.com/litecoin-project/litecoin) and other coin daemons
* And more...

Note: The setup process can be time consuming, but is heavily automated to make it a fun and easy experience.

Take a look at how BTCPay works in a video below.

[![](https://img.youtube.com/vi/nr0UNbz3AoQ/hqdefault.jpg)](https://www.youtube.com/watch?v=nr0UNbz3AoQ)

Here is a presentation of the global architecture at Advancing Bitcoin conference.

[![BTCPay - Architecture overview](https://i3.ytimg.com/vi/Up0dvorzSNM/maxresdefault.jpg)](https://www.youtube.com/watch?v=Up0dvorzSNM "BTCPay - Architecture overview")

# Full installation (for technical users)

You can also install BTCPay Server on your own machine or VPS instance.

The officially supported setup is driven by Helm.

## Running locally

Requirements:

* minikube
* helm
* docker
* kubectl

The first time you run this application make sure you start minikube:

`minikube start`

To build the dependency run: 

`helm dependency build`

To run the project locally simply run:

`helm install btcpayserver btcpayserver`

To deploy the project create a kubeconfig file then run:

` helm install btcpayserver btcpayserver --kubeconfig=./path-to-kubeconfig.yaml `

View the pods, services and the persistence volume claim by running

`kubectl get po, svc, pvc`

There are 3 different environments:
* regtest
* testnet
* mainnet 

Currently the only environment that is being supported is **regtest**

## Logging into btcpayserver locally:

1. Enable LoadBalaning on minikube run 

    `minikube tunnel` 

2. Get the EXTERNAL-IP for **btcpayserver-nginx** 

    `kubectl get svc` or `kubectl get svc | grep btcpayserver-nginx | awk '{print $3}'`

3. You should beable to login by running the following command and going to the site. The command should print out something that looks like _http://10.110.218.162/regtest_

    `echo "http://$(kubectl get svc | grep btcpayserver-nginx | awk '{print $3}')/regtest"` 

## Accessing the kuberenetes dashboard for monitoring locally 

To access the dashboard locally follow the steps above but instead go to dashboard 

    echo "http://$(kubectl get svc | grep btcpayserver-nginx | awk '{print $3}')/dashboard" 
 
    