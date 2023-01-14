import * as k8s from "@pulumi/kubernetes";
const bitcoindLabels = { app: "bitcoind" };
export const deployment = new k8s.apps.v1.Deployment("bitcoind", {
    spec: {
        selector: { matchLabels: bitcoindLabels },
        replicas: 1,
        template: {
            metadata: { labels: bitcoindLabels },
            spec: 
            { containers: 
                [ {
                    name: "bitcoind", 
                    image: "btcpayserver/bitcoin:24.0.1-1",
                    ports:[
                        { containerPort:18443 },
                        { containerPort:18444 },
                        { containerPort:28334 },
                        { containerPort:28335 },
                    ],
                    env:[ {
                        name:"BITCOIN_EXTRA_ARGS",
                        value:
                        "server=1 "+
                        "debug=1 "+
                        "rpcauth=foo:7d9ba5ae63c3d4dc30583ff4fe65a67e$9e3634e81c11659e3de036d0bf88f89cd169c1039e6e09607562d54765c649cc "+
                        "rpcbind=0.0.0.0 "+
                        "rpcbind=bitcoind "+
                        "rpcport=18443 "+
                        "rpcallowip=0.0.0.0/0 " +
                        "zmqpubrawblock=tcp://0.0.0.0:28334 "+
                        "zmqpubrawtx=tcp://0.0.0.0:28335 "+
                        "zmqpubhashblock=tcp://0.0.0.0:28336 "+
                        "txindex=1 "+
                        "reset "+
                        "port=39388 "+
                        "disablewallet=1 "
                    },{
                        name:"BITCOIN_NETWORK",
                        value:"regtest"
                    } ],
                } ],
                restartPolicy:"Always" 
            }
        }
    }
});