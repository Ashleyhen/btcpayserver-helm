use std::str::FromStr;
use bitcoin::Network;
use crate::tasks::regtest_init::regtest_generate_to_address;
mod tasks;



fn main() {
    let args: Vec<String> = std::env::args().collect();
    const ARGUMENT_NETWORK:&str = "--network=";
    const ARGUMENT_URL: &str = "--url=";
    const ARGUMENT_USER: &str = "--user=";
    const ARGUMENT_PASSWORD:&str = "--password=";
    let mut user = "";
    let mut url="localhost";
    let mut network =Network::Regtest; //default
    let mut password="";

    for arg in &args {
        if arg.starts_with(ARGUMENT_NETWORK) {
            let network_str = arg.trim_start_matches(ARGUMENT_NETWORK);
            network=Network::from_str(network_str).expect(&("network must either be mainent, testnet or regtest but got ".to_owned()+network_str));
        }

        if arg.starts_with(ARGUMENT_USER) {
            user = arg.trim_start_matches(ARGUMENT_USER);
        }

        if arg.starts_with(ARGUMENT_URL) {
            url = arg.trim_start_matches(ARGUMENT_URL);
        }

         if arg.starts_with(ARGUMENT_PASSWORD) {
            password = arg.trim_start_matches(ARGUMENT_PASSWORD);
        }
   }

    if network.eq(&Network::Regtest){
        println!("network: regtest");
        regtest_generate_to_address(&url, &user, &password)
    }
    
    // lnd_grpc_rust::LndClient{}

    
}
