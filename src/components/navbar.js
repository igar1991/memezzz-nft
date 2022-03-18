import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getAdressWaves, modalisMeta, getAdressMeta } from '../redux/slices/loginSlice';
import { getNetwork } from '../redux/slices/loginSlice';
import { logout } from '../redux/slices/loginSlice';
import logo from '../file/logo.svg';
import logoMeta from '../file/logometa.png';
import logoWaves from '../file/logowaves.png';
import { UploadIcon, AlertFillIcon } from '@primer/octicons-react';
import './Component.css';



export const Navbar = () => {
    const dispatch = useDispatch()

    const [burger, setBurger] = useState(false)
    const [keeper, setKeeper] = useState(false)
    const [meta, setMeta] = useState(false)

    const { modalMeta, userAdress, networkId } = useSelector(state => state.login)

    const loginWaves = () => {
        if (window.WavesKeeper) {
            dispatch(getAdressWaves())
            dispatch(modalisMeta(false))
        } else {
            setKeeper(true)
        }
    }

    const loginMeta = () => {
        if (window.ethereum) {
            dispatch(getAdressMeta())
            dispatch(getNetwork(window.ethereum.networkVersion))
            dispatch(modalisMeta(false))
        } else {
            setMeta(true)
        }
    }

    const onHideModal = () => {
        dispatch(modalisMeta(false))
        setKeeper(false)
        setMeta(false)
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container-fluid">
                <Link className="navbar-brand text-warning fs-3" to="/" style={{ fontFamily: "Impact" }}>
                    <img src={logo} alt="logo" style={{ width: 80 }} />
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
                            <Link className="nav-link" to="/about">About Swarm</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {userAdress ?
                            <Dropdown>
                                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                                    My profile
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1"><Link to='/profile'>My NFT</Link></Dropdown.Item>
                                    <Dropdown.Item onClick={()=>dispatch(logout())}>Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            :
                            <button className="btn btn-warning fw-bold" onClick={() => dispatch(modalisMeta(true))}>
                                Log in
                            </button>}
                    </div>
                </div>
            </div>
            <Modal
                size="md"
                show={modalMeta}
                onHide={onHideModal}

            >
                <Modal.Header closeButton className='bg-dark text-warning'>
                    <Modal.Title>
                        Log In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-center text-dark'>
                    {/* {!metaInstalled && <h3>For authorization, please, install <a
                        target="_blank"
                        rel='noreferrer'
                        href="https://metamask.io/">Metamask</a>.</h3>}
                    {networkId !== 100 && <h3>Please, <a
                        target="_blank"
                        rel='noreferrer'
                        href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup">configure and switch
                        to
                        xDai
                        network</a>.</h3>} */}
                    <div onClick={loginWaves} className='logowallet position-relative d-flex shadow-lg p-3 mb-2 bg-body rounded text-center align-items-center'>
                        <img src={logoWaves} alt="logo Metamask" className='col-2' />
                        <h3 className='col-9 text-dark'>Waves Keeper</h3>
                        <p className='position-absolute bottom-0 end-0 pe-2 text-success'>Recommended</p>
                    </div>
                    {keeper && <div className="alert alert-danger mt-2" role="alert">
                        <AlertFillIcon verticalAlign="middle" size={12} /> For authorization, please, install <a rel='noreferrer'
                            href="https://docs.waves.tech/en/ecosystem/waves-keeper/getting-started-with-keeper#get-started" target="_blank" className="alert-link">Waves Keeper.</a>
                    </div>}
                    {/* <div onClick={loginMeta} className='logowallet position-relative d-flex shadow-lg p-3 mb-2 bg-body rounded text-center align-items-center'>
                        <img src={logoMeta} alt="logo Metamask" className='col-2' />
                        <h3 className='col-9 text-dark'>MetaMask</h3>
                        <p className='position-absolute bottom-0 end-0 pe-2'>Network: xDai</p>
                    </div> */}
                    {meta && <div className="alert alert-danger mt-2" role="alert">
                        <AlertFillIcon verticalAlign="middle" size={12} /> For authorization, please, install <a rel='noreferrer'
                            href="https://metamask.io/" target="_blank" className="alert-link">MetaMask.</a>
                    </div>}
                </Modal.Body>
            </Modal>
        </nav>
    )
}