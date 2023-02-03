# Bitcoin Payserver manual set up

To start the bitcoin server run the following commands:

`docker-compose up -d`

Open up a browser that is running tor such as brave. The command below will print out the tor hostname:

` cat /var/lib/docker/volumes/btc-pay-server_torservice_data/_data/BTCPayServer/hostname`

Copy the output and past it in the url. The page may take a minute to load but you should see the btcpay home page once the page is loaded.

## Current issues:

- still need to configure a lightning node for btcpay
- When you start this up, you'll be running a new blockchain without any coins that have been mined. In order to use this you'll have to mine some coins. 
- NBxplorer has a btc indexer error that reads:   `NBXplorer.Indexer.BTC: Error connecting to RPC server The 'bitcoind' scheme is not supported.`
- There isn't any security configured yet

<!-- /var/lib/docker/volumes/btc-pay-server_torservice_data/_data/BTCPayServer/hostname -->