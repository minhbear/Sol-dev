import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import { PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')

  const addressSubmittedHandler = async (address: string): Promise<void> => {
    try {
      setAddress(address)
      const key: PublicKey = new PublicKey(address)
      const connection: Connection = new Connection(clusterApiUrl('devnet'))
      const balance = await connection.getBalance(key)
      setBalance(balance / LAMPORTS_PER_SOL)      
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
      </header>
    </div>
  )
}

export default Home
