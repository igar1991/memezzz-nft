import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const Navbar = () => {

    const [burger, setBurger] = useState(false)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container-fluid">
                <Link className="navbar-brand text-warning fs-3" to="/" style={{fontFamily: "Impact"}}>
                    MemeZzz
                </Link>
                <button className="navbar-toggler" onClick={() => setBurger(!burger)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${!burger ? 'collapse' : ''} navbar-collapse`}>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/create">Create NFT</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/upload">Upload to Swarm</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About Swarm</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-warning fw-bold">Log In</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}