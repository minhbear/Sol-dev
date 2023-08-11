import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction, TransactionInstruction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

const PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
const PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

async function main() {
  const payer: Keypair = initializeKeypair();
  const connection = new Connection(clusterApiUrl("devnet"));

  // Airdrop
  // await connection.requestAirdrop(payer.publicKey, LAMPORTS_PER_SOL * 1)

  pingProgram(connection, payer)
}

async function pingProgram(connection: Connection, payer: Keypair) {
  const transaction = new Transaction()

  const programId = new PublicKey(PROGRAM_ADDRESS)
  const programDataPubKey = new PublicKey(PROGRAM_DATA_ADDRESS)

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: programDataPubKey,
        isSigner: false,
        isWritable: true
      }
    ],
    programId
  })

  transaction.add(instruction)

  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  )

  console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
}

function initializeKeypair(): Keypair {
  const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
  const secretKey: Uint8Array = Uint8Array.from(secret);
  const keypairFromSecretKey: Keypair = Keypair.fromSecretKey(secretKey);
  return keypairFromSecretKey;
}

main()
  .then(() => {
    console.log("Finished successfully");
  })
  .catch((error) => {
    console.error(error);
  });
