import React, { useState } from 'react';
import { Modal } from "react-bootstrap";


export const Feedmeme = ({ arrNft, status }) => {

    const [openModal, setOpenModal] = useState(false)
    const [meme, setMeme] = useState({})

    const chooseM = (item) => {
        setMeme(item)
        setOpenModal(true)
    }

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {status === 'complit' ? arrNft?.map((item, index) => {
                return (
                    <button key={index} className="bg-dark card m-2 shadow p-0" style={{ width: "12rem" }} onClick={() => chooseM(item)}>
                        <img src={item.image} style={{ height: "10rem", objectFit: "cover" }} className="card-img-top" alt="meme" />
                        <div className="card-body text-center">
                            <p className="card-text fw-bold text-white">{item.title}</p>
                        </div>
                    </button>
                )
            }) : <div className="d-flex justify-content-center text-warning mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
            {status === 'error' && <h2 className='text-warning mt-4'>Error! Try later...</h2>}
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openModal}
                onHide={() => setOpenModal(false)}
            >
                <Modal.Header closeButton className='bg-dark text-white'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {meme.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white text-center d-flex flex-column justify-content-center'>
                    <img className="ms-auto me-auto" src={meme.image} style={{ height: "50vh", objectFit: "contain" }} alt="meme" />
                    <h4>{meme.description}</h4>
                </Modal.Body>
            </Modal>
        </div>
    )
}