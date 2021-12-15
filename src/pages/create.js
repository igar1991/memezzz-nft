import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '../components/navbar';
import { GenerateMeme } from '../components/GenerateMeme';
import { getAdress, getNetwork } from '../redux/slices/metaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { uploadNft, createNft, clearMeta, openModalNft } from '../redux/slices/nftSlice';
import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { UploadIcon, AlertFillIcon } from '@primer/octicons-react'



export const Create = () => {

    const stageRef = useRef(null);
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [dec, setDec] = useState('')
    const { currentMeme } = useSelector(state => state.main)
    const { metaUrl, status, modalNft, statusUpload } = useSelector(state => state.nft)
    const { userAdress, metaInstalled, networkId } = useSelector(state => state.meta)

    useEffect(()=>{
        if(status==='pending') {
            dispatch(openModalNft(true))
        }

        if(status==='error') {
            dispatch(openModalNft(false))
        }

        if(status==='created') {
            dispatch(clearMeta())
        }

    },[status,dispatch])

    const upload = () => {
        fetch(stageRef.current.toDataURL())
            .then(res => res.blob())
            .then(res => {
                let file = new File([res], 'image.jpg')
                return file
            })
            .then(res => dispatch(uploadNft({ image: res, title: title, dec: dec })))

    }

    const backCreate = () => {
        dispatch(clearMeta())
        setTitle('')
        setDec('')
        dispatch(openModalNft(false))
    }

    const createGo = () => {
        if (!metaInstalled) {
            return
        }
        if (userAdress === null && metaInstalled) {
            dispatch(getAdress())
            dispatch(getNetwork(window.ethereum.networkVersion))
            return
        }
        if (networkId !== 100 && userAdress !== null) {
            return
        }
        dispatch(createNft({ ad: userAdress, metaData: metaUrl.metaUrl }))
    }

    return (
        <div style={{ backgroundColor: "black", minHeight: "100vh" }} >
            <Navbar />
            <div className="bg-dark text-warning m-2 p-3" style={{ minHeight: "90vh" }}>
                <h1>Create your NFT meme!</h1>
                <hr className="bg-warning" />
                {!metaUrl && <GenerateMeme stageRef={stageRef} />}
                {currentMeme && !metaUrl && <div className="d-flex flex-column justify-content-end align-content-end align-items-center pt-3">
                    <div className="col-11 mb-3">
                        <input maxlength={120} value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title your NFT" />
                    </div>
                    <div className="col-11 mb-3">
                        <textarea maxlength={255} value={dec} onChange={(e) => setDec(e.target.value)} className="form-control" id="exampleFormControlTextarea1" placeholder="Description your NFT" rows="3"></textarea>
                    </div>
                    {!metaInstalled&&<div className="alert alert-danger mt-2" role="alert">
                            <AlertFillIcon verticalAlign="middle" size={12} /> For uploading, please, install <a rel='noreferrer'
                                href="https://metamask.io/" className="alert-link">MetaMask.</a>
                        </div>}
                    <div class="d-grid col-12 col-md-4 gap-2">
                        <button className="btn btn-success" onClick={upload} disabled={statusUpload === "pending"}>{statusUpload === "pending" ? 'Uploading...' : <><UploadIcon verticalAlign="middle" className="fw-bold" size={24} />Upload</>}</button>
                    </div>
                </div>}
                {metaUrl && <div className='d-flex align-items-center flex-column justify-content-center text-center'>
                    <h2>Meme uploaded to Swarm!</h2>
                    <img src={metaUrl.imageUrl} alt='meme' style={{ maxHeight: '50vh', objectFit: 'contain' }} />
                    <div className='d-grid col-12 col-md-4'>
                    {!metaInstalled&&<div className="alert alert-danger mt-2" role="alert">
                            <AlertFillIcon verticalAlign="middle" size={12} /> For authorization, please, install <a rel='noreferrer'
                                href="https://metamask.io/" className="alert-link">MetaMask.</a>
                        </div>}
                        {userAdress === null && <div className="alert alert-danger mt-2" role="alert">
                        <AlertFillIcon verticalAlign="middle" size={12} /> Please, log in through MetaMask.
                        </div>}
                        {networkId !== 100 && userAdress !== null && <div className="alert alert-danger mt-2" role="alert">
                            <AlertFillIcon verticalAlign="middle" size={12} /> Please, configure and <a rel='noreferrer'
                                href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup" className="alert-link">switch to xDai network.</a>
                        </div>}
                        <button className="btn btn-danger mt-2" onClick={backCreate} >Back</button>
                        <button className="btn btn-success mt-2" onClick={createGo} disabled={networkId !== 100||userAdress === null} >Create NFT</button>
                    </div>
                </div>}
                <Modal
                    size="md"
                    show={modalNft}
                    onHide={() => dispatch(openModalNft(false))}
                    backdrop={false}

                >
                    <Modal.Header closeButton className='bg-dark text-white'>
                        <Modal.Title>
                            Create NFT
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark text-center text-white'>
                        {status === 'created' && <h3>Congratulations! You created NFT.</h3>}
                        {status === 'pending' &&
                            <><h3 className='text-warning'>Creation...</h3>
                                <div class="spinner-border text-warning" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div></>}
                    </Modal.Body>
                    {status === 'created' && <Modal.Footer className='bg-dark'>
                        <button className="btn btn-success" onClick={backCreate}>Create new NFT</button>
                        <Link to='/profile'><button className="btn btn-warning" onClick={() => dispatch(openModalNft(false))} >Go to my NFT</button></Link>
                    </Modal.Footer>}
                </Modal>
            </div>
        </div>)


}