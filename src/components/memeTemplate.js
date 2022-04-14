import React, { useEffect, useState } from 'react';
import { Modal, ButtonGroup, ToggleButton, Form } from "react-bootstrap";
import { AlertFillIcon } from '@primer/octicons-react';
import { changeNftWaves, pickupNftWaves } from '../redux/slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';

export const MemeTemplate = ({ id }) => {

    const dispatch = useDispatch()

    const [openModal, setOpenModal] = useState(false)
    const [pick, setPick] = useState(false)
    const [change, setChange] = useState(false)
    const [priceV, setPriceV] = useState(false);
    const [currentPrice, setCurrentPrice] = useState('');
    const [radioValue, setRadioValue] = useState('1');
    const [state, setState] = useState(null)

    const {userNft} = useSelector((state)=>state.login)

    useEffect(()=>{
        const item = userNft.find(i=>i.id===id)
        setState(item)

    }, [userNft, id])

    const pickupFunc =({ id, id_asset})=>{
        dispatch(pickupNftWaves({ id, id_asset}))
        setPick(false)

    }

    const changeInfo =(id, id_asset, isTradable, price)=>{
        const trade = isTradable==='1'?true: false
        if(trade) {
            if(!priceValid()) {
                dispatch(changeNftWaves({ id, id_asset, isTradable: trade, price: price}))  
                          
            } else {
                return
            }
        } else {
            dispatch(changeNftWaves({ id, id_asset, isTradable: trade, price: 0}))
        }
        setChange(false) 
        const item = userNft.find(i=>i.id===id)
        setState(item)
        setCurrentPrice('')
        setRadioValue('1')
    }

    const priceValid = () => {
        if (currentPrice <= 0) {
            setPriceV(true)
            return true
        }
        if (currentPrice > 1000000) {
            setPriceV(true)
            return true
        }
        setPriceV(false)
        return false
    }

    return (
        <>
        {state && <>
            <div className="card m-2 shadow p-0" style={{ width: "18rem", backgroundColor: "#353535" }} >
                <img role="button" src={state.url} style={{ height: "15rem", objectFit: "cover" }} className="card-img-top" alt="meme" onClick={() => setOpenModal(true)} />
                <div className="card-body text-start">
                    <h5 className="card-title text-warning">{state.title}</h5>
                    <p className={`card-text text-${state.status === 'moderation' ? 'primary' : (state.status === 'minted' ? 'success' : 'danger')}`}>Moderation status: {state.status}!</p>
                    {state.status === 'minted' && <>
                        <hr />
                        {Number(state.public)===1&&<p className='card-text text-primary'>{`Price: ${state.price} waves`}</p>}
                        {Number(state.public)===1?<p className='card-text text-warning'>Public</p>: <p className='card-text text-danger'>Private</p>}
                        <button onClick={()=>setPick(true)} className="btn btn-outline-success" type="button">Pick up</button>
                        <button onClick={() => setChange(true)} className="btn btn-outline-warning ms-1" type="button">Change info</button>
                    </>}

                </div>
            </div>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={openModal}
                onHide={() => setOpenModal(false)}
            >
                <Modal.Header closeButton className='bg-dark text-white'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {state.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white text-center d-flex flex-column justify-content-center'>
                    <img className="ms-auto me-auto" src={state.url} style={{ height: "50vh", objectFit: "contain", maxWidth: '100%' }} alt="meme" />
                </Modal.Body>
            </Modal>
            <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={pick}
                onHide={() => setPick(false)}
            >
                <Modal.Header closeButton className='bg-dark text-warning'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Pick up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white text-center d-flex flex-column justify-content-center'>
                    <div className="alert alert-warning mt-2" role="alert">
                        <AlertFillIcon verticalAlign="middle" size={12} /> If you take your nft from our Dapp, you will not be able to publish it on our marketplace.
                    </div>
                    <button onClick={()=>pickupFunc({ id, id_asset: state.id_asset})} className="btn btn-success" type="button">Pick up</button>
                </Modal.Body>
            </Modal>
            <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={change}
                onHide={() => setChange(false)}
            >
                <Modal.Header closeButton className='bg-dark text-warning'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-white text-center d-flex flex-column justify-content-center'>
                <ButtonGroup>
                            <ToggleButton
                                id='1'
                                type="radio"
                                variant={radioValue === '1' ? 'warning' : 'outline-warning'}
                                name="radio"
                                value={1}
                                checked={radioValue === 1}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                Public
                            </ToggleButton>
                            <ToggleButton
                                id='0'
                                type="radio"
                                variant={radioValue === '0' ? 'warning' : 'outline-warning'}
                                name="radio"
                                value={0}
                                checked={radioValue === 0}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                Private
                            </ToggleButton>
                        </ButtonGroup>
                            <Form.Label className="text-start text-primary mt-1">New price in Waves</Form.Label>
                            <Form.Control
                                required
                                id="price"
                                type="number"
                                maxLength={8}
                                value={currentPrice}
                                onChange={(e) => setCurrentPrice(e.target.value)}
                                isInvalid={radioValue==='1'?priceV:false}
                                disabled={!(radioValue === '1')}
                            />
                            <Form.Text muted className="text-start">
                            Must be more 0
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Price not correct!
                            </Form.Control.Feedback>
                            <button onClick={() => changeInfo(id, state.id_asset, radioValue, currentPrice)} className="btn btn-warning ms-1 mt-1" type="button">Change info</button>
                </Modal.Body>
            </Modal>
            </>}
            </>
    )
}