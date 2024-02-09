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

To run the project locally simply run:

`helm install btcpayserver btcpayserver`

To deploy the project create a kubeconfig file then run:

` helm install btcpayserver btcpayserver --kubeconfig=./path-to-kubeconfig.yaml `

view the pods, services and the persistence volume claim by running

`kubectl get po, svc, pvc`
