import * as k8s from "@pulumi/kubernetes";
const btcServerLabels = { app: "bitcoinserver" };
export const btcServerDeployment = new k8s.apps.v1.Deployment("bitcoinserver", {
	spec: {
		selector: { matchLabels: btcServerLabels },
		replicas: 1,
		template: {
			metadata: { labels: btcServerLabels },
			spec:
			{
				
				containers:
					[{
						name: "postgres",
						image: "postgres:latest",
						ports: [
							{ containerPort: 5432 },
						],
						env: [{
							name: "POSTGRES_HOST_AUTH_METHOD",
							value:
								"trust"
						}],
						
						
					},

					// 	 {
					//     name: "btcpayserver", 
					//     image: "btcpayserver/btcpayserver:1.7.3",
					//     ports:[
					//         { containerPort:8080 },
					//         { containerPort:9735 },
					//         { containerPort:11001 },
					//     ],
					//     args:[
					//         "--network=regtest",
					//         "--bitcoin-rpcuser=foo",
					//         "--bitcoin-rpcpassword=7d9ba5ae63c3d4dc30583ff4fe65a67e$9e3634e81c11659e3de036d0bf88f89cd169c1039e6e09607562d54765c649cc",
					//         "--bitcoin-rpcport=18443",
					//         "--log-level=debug",
					//         "--grpc-port=11001",
					//         // "--dev-fast-gossip",
					//         // "--plugin=/opt/c-lightning-rest/plugin.js",
					//         // "--rest-port=8080",
					//         // "--rest-protocol=http",

					//     ],
					//     env:[ {
					// 			name:"LIGHTNINGD_CHAIN",
					// 			value:"btc"
					// 		}, 
					// 		{
					// 			name:"LIGHTNINGD_NETWORK",
					// 			value:"regtest"
					// 		} ],
					// },

					{
						name: "xbxplorer",
						image: "nicolasdorier/nbxplorer:2.3.54",
						// ports: [
						// 	{ 
						// 		containerPort: 18440,
						// 		// hostPort: 18440,
						// 		// hostIP: "172.17.0.4",
						// 		// name: "bitcoind",
						// 	 },
						// ],
						env: [{
							name: "NBXPLORER_CHAINS",
							value: "btc",
						}, {
							name: "NBXPLORER_NETWORK",
							value: "regtest",
						}, {
							name: "NBXPLORER_SIGNAL_FILEDIR",
							value: "/datadir",
						}, {
							name: "NBXPLORER_BIND",
							value: "0.0.0.0:28334",
						}, {
							name: "NBXPLORER_BTCRPCURL",
							value: "https://127.0.0.1:18443",
						}, {
							name: "NBXPLORER_BTCNODEENDPOINT",
							value: "127.0.0.1:28334",
						},{
							name: "NBXPLORER_POSTGRES",
							value: "User ID=postgres;Application Name=payserverdb;Include Error Detail=true;Host=localhost;Port=5432",
						},{
							name: "NBXPLORER_RPCCONNECT",
							value: "127.0.0.1:18443",
						},{
							name: "NBXPLORER_BTCRPCUSER",
							value: "foo",
						},{
							name: "NBXPLORER_BTCRPCPASSWORD",
							value: "qDDZdeQ5vw9XXFeVnXT4PZ--tGN2xNjjR4nrtyszZx0=",
						},
						{
							name:"NBXPLORER_ZMQ",
							value:"tcp://0.0.0.0:28334"
						}

					],
				 } ],
				restartPolicy: "Always"
			}
		}
	}
});
