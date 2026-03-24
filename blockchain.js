// Import
const Block = require("./block");

class Blockchain{

    constructor(){
        this.chain = [Block.genesis()]; //  Array m. Genesis-Block
    }

    addBlock(blockData){
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock,blockData); 
        this.chain.push(block);
    }

}

module.exports = Blockchain;
