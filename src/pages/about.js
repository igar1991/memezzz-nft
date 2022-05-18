import React from 'react';
import { Navbar } from '../components/navbar';

export const About = () => {
    return <>
        <Navbar />
        <div className="p-3 min-vh-100 bg-black">
            <div className="bg-dark p-3 text-white fs-5 mb-2">
                <h1 className="text-warning">What are NFTs?</h1>
                <hr className="bg-warning" />
                <p>Unlike traditional cryptocurrencies, NFTs, also known as non-fungible tokens, are unique, digital items with blockchain-managed ownership. Each unit of an NFT can be considered one of a kind. These can consist of collectibles, game items, digital art, event tickets, domain names, and even contract ownership records for physical assets.</p>
                <p>At a more technical level, NFTs are non-interchangeable units of data stored on a blockchain, making them resistant to tampering, destruction, or replication. As such, NFTs can be verified by the blockchain, giving them extrinsic value as well.</p>
                <p>'Non-fungible' refers to an asset's unique qualities and traits that make it completely standalone and non-replicable from other assets. Conversely, a good example of a fungible asset can be a currency. When dealing with currency, a five-dollar bill will always be replaceable by another five-dollar bill (or even five $1s).</p>
                <p>Though non fungible tokens can seem complex, you can think of them as a vehicle to share virtually any form of media using the blockchain.</p>
            </div>
            <div className="bg-dark p-3 text-white fs-5 mb-2">
                <h1 className="text-warning">WAVES</h1>
                <hr className="bg-warning" />
                <p>Launched in 2016, Waves is a global open-source platform for decentralized applications. Based on proof-of-stake consensus, Waves aspires to make the most of blockchain, with minimal carbon footprint.</p>
                <p><a href="https://waves.tech/" target="_blank" rel='noreferrer'>Waves</a> technology stack can benefit in any use cases that demand security and decentralization — open finance, personal identification, gaming, sensitive data and many others.</p>
                <p>Address of our Dapp: <a href="https://wavesexplorer.com/address/3P9HT4feHYvKDpyCHtyiw77DjmKP9sXoez9/tx" target="_blank" rel="noreferrer">MemeZzz</a></p>
            </div>
            <div className="bg-dark p-3 text-white fs-5 mb-2">
                <h1 className="text-warning">SWARM</h1>
                <hr className="bg-warning" />
                <h3 className="text-warning">What is Swarm?</h3>
                <p><a href="https://www.ethswarm.org/" target="_blank" rel='noreferrer'>Swarm</a> is a decentralised storage and communication system for a sovereign digital society.</p>
                <p>Swarm is a system of peer-to-peer networked nodes that create a decentralised storage and communication service. The system is economically self-sustaining due to a built-in incentive system enforced through smart contracts on the Ethereum blockchain.</p>
                <p>Redundancy makes the system resilient to connectivity issues, node churn or targeted ddos attacks and enables a zero-downtime service. Users remain sovereign owners of their personal data in alignment with fair data principles. Shifting the cost of access, hosting and execution to users removes the last obstacle to truly agile and adaptive application development.</p>
                <h3 className="text-warning">Why Swarm?</h3>
                <p>Swarm exists so the internet can again be decentralised.</p>
                <p>Swarm’s longer term vision is to become the operating system of the re-decentralised internet. It provides a scalable and self-sustaining infrastructure for a supply-chain economy of data.</p>
                <p>The Internet is no longer just a niche where geeks play. It has become a fundamental conduit of value creation and a huge share of overall economic activity. Yet the data economy in it’s current state is far from fair, the distribution of the spoils is under the control of those who control the data - mostly companies keeping the data to themselves in isolated data silos. To achieve the goal of a fair data economy many social, legal and technological issues will have to be tackled.</p>
                <h3 className="text-warning">How does it work?</h3>
                <p>Bee is a Swarm client implemented in Go. It’s the basic building block for the Swarm network.</p>
                <p>Bee is a Swarm client implemented in Go. It’s the basic building block for Swarm Network. Bee provides low level constructs for file storage, feeds, key-value stores and untraceable communication.</p>
                <p>Bee will happily fly on MacOS, Windows and various Linux flavors.</p>
            </div>
        </div>
    </>
}