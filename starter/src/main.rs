use std::{fs, str::FromStr};
use bitcoin::Network;
use postgres::{Client, NoTls};
use crate::tasks::regtest_init::regtest_generate_to_address;
mod tasks;



fn main() {
    let args: Vec<String> = std::env::args().collect();
    const ARGUMENT_NETWORK:&str = "--network=";
    const ARGUMENT_URL: &str = "--url=";
    const ARGUMENT_USER: &str = "--user=";
    const ARGUMENT_PASSWORD:&str = "--password=";

    const NBXPLORER_POSTGRES_URL:&str=""; // format as username:password@hostname/database 

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

         if arg.starts_with(ARGUMENT_PASSWORD) {
            password = arg.trim_start_matches(ARGUMENT_PASSWORD);
        }
 
   }

    if network.eq(&Network::Regtest){
        println!("network: regtest");
        regtest_generate_to_address(&url, &user, &password)
    }


      // Read the SQL file
    let sql_content = fs::read_to_string("path/to/your/sql/file.sql")
        .expect("Failed to read SQL file");

    // Create a PostgreSQL connection
    let mut client = Client::connect(&("postgresql://".to_owned()+NBXPLORER_POSTGRES_URL), NoTls)
        .expect("Failed to connect to database");

    // Execute the SQL query
    match client.batch_execute(&sql_content) {
        Ok(_) => println!("SQL file executed successfully"),
        Err(e) => eprintln!("Failed to execute SQL file: {}", e),
    }

    
}

    // https://lightning.engineering/api-docs/api/lnd/wallet-unlocker/init-wallet