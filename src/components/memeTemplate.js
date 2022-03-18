import React, { useState } from 'react';
import { Modal } from "react-bootstrap";

export const MemeTemplate =({ img, title, })=>{

    const [openModal, setOpenModal] = useState(false)

    return (
        <>
        <button className="bg-dark card m-2 shadow p-0" style={{ width: "12rem" }} onClick={() => setOpenModal(true)}>
                        <img src={img} style={{ height: "10rem", objectFit: "cover" }} className="card-img-top" alt="meme" />
                        <div className="card-body text-center">
                            <p className="card-text fw-bold text-white">{title}</p>
                        </div>
                    </button>
                    <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openModal}
                onHide={() => setOpenModal(false)}
            >
                <Modal.Header closeButton className='bg-dark text-white'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white text-center d-flex flex-column justify-content-center'>
                    <img className="ms-auto me-auto" src={img} style={{ height: "50vh", objectFit: "contain", maxWidth: '100%' }} alt="meme" />
                </Modal.Body>
            </Modal>
        </>
    )
}