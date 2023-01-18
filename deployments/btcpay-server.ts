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
					}, {
						name: "xbxplorer",
						image: "nicolasdorier/nbxplorer:2.3.54",
						ports: [
							{ containerPort: 32838 },
						],
						args:[
							"--noauth"
						],
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
							value: "0.0.0.0:32838",
						}, {
							name: "NBXPLORER_BTCRPCURL",
							value: "https://127.0.0.1:18443",
						}, {
							name: "NBXPLORER_BTCNODEENDPOINT",
							value: "127.0.0.1:28334",
						}, {
							name: "NBXPLORER_POSTGRES",
							value: "User ID=postgres;Application Name=payserverdb;Include Error Detail=true;Host=localhost;Port=5432",
						}, {
							name: "NBXPLORER_RPCCONNECT",
							value: "127.0.0.1:18443",
						}, {
							name: "NBXPLORER_BTCRPCUSER",
							value: "foo",
						}, {
							name: "NBXPLORER_BTCRPCPASSWORD",
							value: "qDDZdeQ5vw9XXFeVnXT4PZ--tGN2xNjjR4nrtyszZx0=",
						}, {
							name: "NBXPLORER_ZMQ",
							value: "tcp://0.0.0.0:28334"
						} ],
					}, {

						name: "btcpayserver",
						image: "btcpayserver/btcpayserver:1.7.3",
						env: [{
							name: "BTCPAY_POSTGRES",
							value: "User ID=postgres;Application Name=payserverdb;Include Error Detail=true;Host=localhost;Port=5432",

						}, {
							name:"BTCPAY_NETWORK",
							value:"regtest"
						}, {
							name:"BTCPAY_CHAINS",
							value:"btc"
						}, {
							name:"BTCPAY_BTCEXPLORERURL",
							value:"http://127.0.0.1:32838/"
						}, {
							name:"BTCPAY_LAUNCHSETTINGS", 
							value:"true"
						}, {
							name:"BTCPAY_HOST",
							value:"btcpay.local"
						}
					],
					}],
				restartPolicy: "Always"
			},

		}
	}
}
);
