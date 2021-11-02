class Election {
    constructor(name) {
        this.name = name
        this.candidates = []
    }

    addCandidate(candidate) {
        this.candidates.push(candidate)
    }

    getCandidates(){
        return this.candidates
    }
}

export default Election
