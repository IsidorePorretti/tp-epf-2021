import {bigNumberify, hexlify} from "ethers/utils";
import InMemoryElectionContract from "./InMemoryElectionContract";

class InMemoryElectionCreatorContract {
    constructor(userAddress) {
        this.userAddress = userAddress
        this.elections = []
        this.adresses = []
        this.onCreationCallback = () => {
        }
    }

    getElectionsCount() {
        return Promise.resolve(bigNumberify(this.elections.length))
    }

    getElectionAddress(electionId) {
        return Promise.resolve(this.adresses[electionId])
    }

    createNewElection(name) {
        let address = this.withElection(name)
        this.onCreationCallback(address)
        return Promise.resolve({
            wait: () => Promise.resolve({
                events: [{
                    args: {
                        0: address,
                        electionAddress: address
                    }
                }]
            })
        })
    }

    onCreation(onCreationCallback) {
        this.onCreationCallback = onCreationCallback
    }

    // Test
    withElection(electionName) {
        let address = hexlify(this.elections.length);
        this.adresses.push(address)
        this.elections.push(new InMemoryElectionContract(electionName, this.userAddress))
        return address
    }
}

export default InMemoryElectionCreatorContract
