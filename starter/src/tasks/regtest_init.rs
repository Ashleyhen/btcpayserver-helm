use bitcoin::{key::{Keypair, Secp256k1}, secp256k1::Scalar, Address};


use bitcoincore_rpc::{Client, RpcApi};
pub fn regtest_generate_to_address(url: &str, user:&str,password:&str){

        let secp=Secp256k1::new();

        let keypair=Keypair::from_seckey_slice(&secp, &Scalar::random().to_be_bytes()).unwrap();
        let address =Address::p2tr(&secp, keypair.x_only_public_key().0, None, bitcoin::Network::Regtest);
    
        let client=Client::new(
            url,
            bitcoincore_rpc::Auth::UserPass(
                user.to_owned(),
                password.to_owned(),
            ),
        )
        .unwrap();
        
        dbg!(client.get_index_info().unwrap());

        client.create_wallet(&address.to_string(), Some(true), None, None, Some(false)).unwrap();
        dbg!("created wallet successfully using address: {}", &address);

        client.generate_to_address(150, &address).unwrap();
        dbg!("best block height: {}",client.get_index_info().unwrap().txindex.unwrap().best_block_height);
    }