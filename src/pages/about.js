import React from 'react';
import { Navbar } from '../components/navbar';

export const About = () => {
    return <>
        <Navbar />
        <div className="p-3" style={{ backgroundColor: "black", minHeight: "100vh" }}>
            <div className="bg-dark p-3 text-white fs-4 mb-2">
                <h1 className="text-warning">WHAT IS SWARM?</h1>
                <hr className="bg-warning" />
                <p>Swarm is a decentralised storage and communication system for a sovereign digital society.</p>
                <p>Swarm is a system of peer-to-peer networked nodes that create a decentralised storage and communication service. The system is economically self-sustaining due to a built-in incentive system enforced through smart contracts on the Ethereum blockchain.</p>
                <p>Redundancy makes the system resilient to connectivity issues, node churn or targeted ddos attacks and enables a zero-downtime service. Users remain sovereign owners of their personal data in alignment with fair data principles. Shifting the cost of access, hosting and execution to users removes the last obstacle to truly agile and adaptive application development.</p>
            </div>
            <div className="bg-dark p-3 text-white fs-4 mb-2">
                <h1 className="text-warning">WHY SWARM?</h1>
                <hr className="bg-warning" />
                <p>Swarm exists so the internet can again be decentralised.</p>
                <p>Swarm’s longer term vision is to become the operating system of the re-decentralised internet. It provides a scalable and self-sustaining infrastructure for a supply-chain economy of data.</p>
                <p>The Internet is no longer just a niche where geeks play. It has become a fundamental conduit of value creation and a huge share of overall economic activity. Yet the data economy in it’s current state is far from fair, the distribution of the spoils is under the control of those who control the data - mostly companies keeping the data to themselves in isolated data silos. To achieve the goal of a fair data economy many social, legal and technological issues will have to be tackled.</p>
            </div>
            <div className="bg-dark p-3 text-white fs-4 mb-2">
                <h1 className="text-warning">HOW DOES IT WORK?</h1>
                <hr className="bg-warning" />
                <p>Bee is a Swarm client implemented in Go. It’s the basic building block for the Swarm network.</p>
                <p>Bee is a Swarm client implemented in Go. It’s the basic building block for Swarm Network. Bee provides low level constructs for file storage, feeds, key-value stores and untraceable communication.</p>
                <p>Bee will happily fly on MacOS, Windows and various Linux flavors.</p>
            </div>
        </div>
    </>
}