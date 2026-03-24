// Aufruf im Terminal: npm run dev-test

/* Import der Block-Klasse */
const Block = require("./block");

console.log("--- Testlauf: Blockchain Grundlagen & Mining ---");

// 1. Erstellung des Genesis-Blocks über die statische Methode
const genesisBlock = Block.genesis();
console.log("\n1. Genesis Block:");
console.log(genesisBlock.toString());


// 2. Erstellung eines ersten Daten-Blocks via "Mining"
const firstBlock = Block.mineBlock(genesisBlock, { amount: 50_000_000, sender: "Ji-Yong" });

console.log("\n2. Erster geschürfter (mined) Folge-Block:");
console.log(firstBlock.toString());


// 3. Verknüpfung prüfen (Integritätstest)
if (firstBlock.lastHash === genesisBlock.hash) {
    console.log("\n[Status]: Die Blöcke sind korrekt miteinander verkettet.");
    console.log(` -> Referenz passt: ${firstBlock.lastHash.substring(0, 10)}...`);
} else {
    console.log("\n[Fehler]: Die Verkettung der Hashes ist fehlerhaft!");
}


// 4. Test mit weiteren Daten
const secondBlock = Block.mineBlock(firstBlock, "Zweite Transaktion: 160_000 an Yassin");
console.log("\n3. Zweiter Folge-Block:");
console.log(secondBlock.toString());

// 5. Verknüpfung des zweiten Blocks prüfen
if (secondBlock.lastHash === firstBlock.hash) {
    console.log("\n[Status]: Auch der zweite Block ist korrekt verkettet.");
    console.log(` -> Referenz passt: ${secondBlock.lastHash.substring(0, 10)}...`);
} else {
    console.log("\n[Fehler]: Die Verkettung zum zweiten Block ist unterbrochen!");
}

console.log("--- Testlauf: Blockchain Grundlagen & Mining (DRY Version) ---");

// 1. Setup der Kette in einem Array (Vorbereitung auf die Blockchain-Klasse)
const chain = [Block.genesis()];

// 2. Mining-Prozess (Wir fügen Blöcke dynamisch hinzu)
chain.push(Block.mineBlock(chain[chain.length - 1], { amount: 50_000_000, sender: "Ji-Yong" }));
chain.push(Block.mineBlock(chain[chain.length - 1], "Zweite Transaktion: 160_000 an Yassin"));
chain.push(Block.mineBlock(chain[chain.length - 1], "Dritte Transaktion: 5.000 an Claudia"));

// 3. DRY-Validierung mit einer Schleife
console.log("\n--- Validierung der Kette ---");

for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const lastBlock = chain[i - 1];

    console.log(`Prüfe Block ${i}...`);
    console.log(currentBlock.toString());

    if (currentBlock.lastHash === lastBlock.hash) {
        console.log(`\x1b[32m[OK]\x1b[0m Verkettung zu Block ${i-1} ist intakt.`);
    } else {
        console.log(`\x1b[31m[FEHLER]\x1b[0m Bruch in der Kette bei Block ${i}!`);
    }
}



/*  Test der Block-Funktionalität  */
/*
const Blockchain = require("./blockchain");
const Block = require("./block");


const block = new Block("aktuelle zeit","hash1","hash2","meine Daten");
console.log(block.toString());
console.log(Block.genesis().toString());


const testBlock = Block.mineBlock(Block.genesis(),"testDaten")
console.log(testBlock.toString());

const chain = new Blockchain();
console.log(chain);

chain.addBlock("daten von Block 1");
console.log(chain);

chain.addBlock("daten von Block 2");
chain.addBlock("daten von Block 3");
chain.addBlock("daten von Block 4");

console.log(chain);
*/

