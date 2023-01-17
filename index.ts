import * as k8s from "@pulumi/kubernetes";
import {deployment} from "./deployments/bitcoind";
import {lightningdDeployment} from "./deployments/lightningd"
import {btcServerDeployment} from "./deployments/btcpay-server"
// bitcoin set up

export const bitcoind =deployment.metadata.name;
export const lightningd=lightningdDeployment.metadata.name
export const btcpayserver = btcServerDeployment.metadata.name;