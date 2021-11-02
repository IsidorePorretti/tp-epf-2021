module.exports = {
    compilers: {
        solc: {
            version: "^0.6.8",
            parser: "solcjs"
        }
    },
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        }
    }
};
