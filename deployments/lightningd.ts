import * as k8s from "@pulumi/kubernetes";
const lightingdLabels = { app: "lightningd" };
export const lightningdDeployment = new k8s.apps.v1.Deployment("lightningd", {
    spec: {
        selector: { matchLabels: lightingdLabels },
        replicas: 1,
        template: {
            metadata: { labels: lightingdLabels },
            spec: 
            { containers: 
                [ {
                    name: "lightningd", 
                    image: "btcpayserver/lightning:v22.11.1",
                    ports:[
                        { containerPort:8080 },
                        { containerPort:9735 },
                        { containerPort:11001 },
                    ],
                    args:[
                        "--network=regtest",
                        "--bitcoin-rpcuser=foo",
                        "--bitcoin-rpcpassword=7d9ba5ae63c3d4dc30583ff4fe65a67e$9e3634e81c11659e3de036d0bf88f89cd169c1039e6e09607562d54765c649cc",
                        "--bitcoin-rpcport=18443",
                        "--log-level=debug",
                        // "--dev-fast-gossip",
                        "--grpc-port=11001",
                        // "--plugin=/opt/c-lightning-rest/plugin.js",
                        // "--rest-port=8080",
                        // "--rest-protocol=http",

                    ],
                    env:[ 
                            {
                                name:"LIGHTNINGD_CHAIN",
                                value:"btc"
                            }, 
                            {
                                name:"LIGHTNINGD_NETWORK",
                                value:"regtest"
                            }
                    ],
                } ],
                restartPolicy:"Always" 
            }
        }
    }
});