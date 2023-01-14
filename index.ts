import * as k8s from "@pulumi/kubernetes";
import {deployment} from "./deployments/bitcoind";
import {lightningdDeployment} from "./deployments/lightningd"
// bitcoin set up

export const bitcoind =deployment.metadata.name;
export const lightningd=lightningdDeployment.metadata.name
