// Klasse: Block
// Repräsentiert eine einzelne Einheit (Block) in der Blockchain

const SHA256 = require('crypto-js/sha256');
const SHA512 = require('crypto-js/sha512');

class Block {

    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp; // Zeitstempel der Erstellung
        this.lastHash = lastHash;   // Hash-Referenz des vorhergehenden Blocks
        this.hash = hash;           // Eigener digitaler Fingerabdruck (Hash)
        this.data = data;           // Enthaltene Transaktionsdaten oder Informationen
    }

    /**
     * Erzeugt den allerersten Block der Kette (Genesis Block).
     * Da es keinen Vorgänger gibt, werden Standardwerte genutzt.
     */
    static genesis() {
        return new this("Genesis time", "-----", "f1r57-h45h", []);
    }

    /**
     * Erzeugt einen neuen Block basierend auf einem Vorgängerblock.
     * Nutzt den Hash des lastBlock als lastHash für den neuen Block.
     */
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        // const hash = Block.hash(timestamp, lastHash, data);
        const hash      = Block.leadingZeroHash(timestamp,lastHash,data);
        return new this(timestamp, lastHash, hash, data);
    }

    /**
     * Hilfsmethode zur lesbaren Ausgabe des Block-Inhalts (Debugging).
     */
    toString() {
        return `Block -
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash} 
        Hash:      ${this.hash}
        Data:      ${JSON.stringify(this.data)}`;
    }

    // Hilfsmethode zur Hash-Berechnung
    static hash(timestamp, lastHash, data) {
        return SHA512(`${timestamp}${lastHash}${JSON.stringify(data)}`).toString();
    }

    static leadingZeroHash(timestamp,lastHash,blockData){
        
        let toBeHashed = timestamp + lastHash + blockData;

        const leadingZeros = 4;
        const pattern = "^0{"+leadingZeros+"}\w*";
        const regex = new RegExp(pattern);

        const maxNonce = 100000;
        let tmpNonce = 0;
        let tmpHash;

        let startTime = Date.now();

        do {
            tmpHash = this.hash(toBeHashed + tmpNonce);
            tmpNonce++;
        } while (!regex.test(tmpHash) && tmpNonce < maxNonce);
        
        let endTime = Date.now();
        
        let message =    
        `Anzahl der Durchläufe: ${tmpNonce}
        Hashwert:  ${tmpHash}
        Berechnungen pro ms: ${tmpNonce/(endTime-startTime)}`
        console.log(message);

        return tmpHash;
    }

}

// Export des Moduls für die Nutzung in dev-test.js
module.exports = Block;