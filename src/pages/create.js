import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '../components/navbar';
import { GenerateMeme } from '../components/GenerateMeme';
import { getAdressMeta, getNetwork } from '../redux/slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { uploadNft, createNft, clearMeta, openModalNft, sendNftWaves } from '../redux/slices/nftSlice';
import { Modal, ButtonGroup, ToggleButton, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { AlertFillIcon } from '@primer/octicons-react';
import ReCAPTCHA from "react-google-recaptcha";
import { clearMeme } from '../redux/slices/mainSlice';
import { modalisMeta } from '../redux/slices/loginSlice';




export const Create = () => {

    const stageRef = useRef(null);
    const dispatch = useDispatch()
    const [titleV, setTitleV] = useState(null);
    const [priceV, setPriceV] = useState(null);
    const [title, setTitle] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [captcha, setCaptcha] = useState(true);
    const [captchaValue, setCaptchaValue] = useState(null);
    const [radioValue, setRadioValue] = useState('1');
    const { currentMeme, textOptions, widthCanvas, heightCanvas } = useSelector(state => state.main)
    const { metaUrl, status, modalNft } = useSelector(state => state.nft)
    const { userAdress, metaInstalled, networkId, nameBlockchain, chainId } = useSelector(state => state.login)

    useEffect(() => {
        if (status === 'pending') {
            dispatch(openModalNft(true))
        }

        if (status === 'error') {
            dispatch(openModalNft(false))
        }

        if (status === 'created') {
            dispatch(clearMeta())
        }

    }, [status, dispatch])

    const onChangeCap = (value) => {
        setCaptcha(false)
        setCaptchaValue(value)
    }
    
    const titleValid = () => {
        if (title.length < 4) {
            setTitleV(false)
            return false
        }
        if (title.length > 16) {
            setTitleV(false)
            return false
        }
        setTitleV(true)
        return true
    }

    const priceValid = () => {
        if (currentPrice <= 0) {
            setPriceV(false)
            return false
        }
        if (currentPrice > 1000000) {
            setPriceV(false)
            return false
        }
        setPriceV(true)
        return true
    }

    const upload = async () => {
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.src = currentMeme.url
            img.crossOrigin = "anonymous"

            img.onload = function () {
                const indy = currentMeme.height / heightCanvas
                let canvas = document.createElement("canvas")
                canvas.setAttribute("id", "canvas");
                const ctx = canvas.getContext("2d")
                canvas.width = currentMeme.width
                canvas.height = currentMeme.height
                img.setAttribute("width", currentMeme.width);
                img.setAttribute("height", currentMeme.height);
                ctx.drawImage(img, 0, 0, currentMeme.width, currentMeme.height);
                for (let i = 0; i < textOptions.length; i++) {
                    const x = (textOptions[i].x * 100 / widthCanvas) * currentMeme.width / 100
                    const y = (textOptions[i].y * 100 / heightCanvas) * currentMeme.height / 100 + textOptions[i].fontsize * indy
                    ctx.font = `${textOptions[i].fontsize * indy}px Impact`
                    ctx.fillStyle = textOptions[i].fontcolor
                    ctx.fillText(textOptions[i].text, x.toFixed(2), y.toFixed(2))
                    ctx.strokeText(textOptions[i].text, x.toFixed(2), y.toFixed(2))
                }
                fetch(canvas.toDataURL())
                    .then(res => res.blob())
                    .then(res => {
                        let file = new File([res], 'image.jpg')
                        return file
                    })
                    .then(res => dispatch(uploadNft({ image: res, title: title })))
                    .then(data => resolve(data))
            };
        })

    }

    const backCreate = () => {
        dispatch(clearMeta())
        setTitle('')
        dispatch(openModalNft(false))
        setRadioValue('1')
        setCurrentPrice('')
        setPriceV(false)
        setTitleV(false)
        setCaptcha(true)
        dispatch(clearMeme())
    }

    const createGo = () => {
        if (nameBlockchain === 'ethereum') {
            if (!metaInstalled) {
                return
            }
            if (userAdress === null && metaInstalled) {
                dispatch(getAdressMeta())
                dispatch(getNetwork(window.ethereum.networkVersion))
                return
            }
            if (networkId !== 100 && userAdress !== null) {
                return
            }
            dispatch(createNft({ ad: userAdress, metaData: metaUrl.metaUrl }))
        } else if (nameBlockchain === 'waves') {
            if (radioValue === '1' && titleValid() && priceValid()) {
                upload().then((data) => {
                    const item = {
                        creator: userAdress,
                        owner: userAdress,
                        url: data.payload.imageUrl,
                        title: title,
                        public: +radioValue,
                        status: 'moderation',
                        price: Number(currentPrice),
                        capcha: captchaValue
                    }
                    dispatch(sendNftWaves(item))
                })
            }
            if (radioValue === '0' && titleValid()) {
                upload().then((data) => {
                    const item = {
                        creator: userAdress,
                        owner: userAdress,
                        url: data.payload.imageUrl,
                        title: title,
                        public: Number(radioValue),
                        status: 'moderation',
                        price: 0,
                        capcha: captchaValue
                    }
                    dispatch(sendNftWaves(item))
                })
            }
        }

    }

    return (
        <div style={{ backgroundColor: "black", minHeight: "100vh" }} >
            <Navbar />
            <div className="bg-dark text-warning m-2 mb-0 p-3" style={{ minHeight: "90vh" }}>

                <h1>Create your NFT meme!</h1>
                <hr className="bg-warning" />
                <GenerateMeme stageRef={stageRef} />
                <hr />
                {currentMeme &&
                    <div className="d-flex flex-column justify-content-end align-content-end align-items-center">
                        {userAdress === null && <>                            
                        <div className="alert alert-danger mt-2" role="alert">
                            <AlertFillIcon verticalAlign="middle" size={12} /> For create NFT, login please.
                        </div>
                        <button className="btn btn-warning fw-bold col-2" onClick={() => dispatch(modalisMeta(true))}>
                            Log in
                        </button></>}
                        {chainId !== "W" && <div className="alert alert-danger mt-2" role="alert">
                            <AlertFillIcon verticalAlign="middle" size={12} /> For create NFT, change network please.
                        </div>}
                        {chainId === "W" &&
                            <div className="mt-2 d-flex flex-column align-items-center col-12 col-md-6">
                                <ButtonGroup className="col-4">
                                    <OverlayTrigger
                                        placement="left"
                                        overlay={<Tooltip id="button-tooltip-1">Your NFT will be published on the marketplace.</Tooltip>}
                                    >
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
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip id="button-tooltip-1">Your NFT will NOT be published on the marketplace.</Tooltip>}
                                    >
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
                                        </OverlayTrigger>
                                </ButtonGroup>
                                <div className='col-8'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        id="title"
                                        type="text"
                                        maxLength={16}
                                        minLength={4}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        isInvalid={titleV === null ? false : !titleV}
                                        onBlur={() => titleValid()}
                                    />
                                    <Form.Text muted>
                                        Must be 4-16 characters
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Title is not correct
                                    </Form.Control.Feedback>
                                </div>
                                <div className='col-8'>
                                    <Form.Label>Price in Waves</Form.Label>
                                    <Form.Control
                                        required
                                        id="price"
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        max="10000"
                                        value={currentPrice}
                                        onChange={(e) => setCurrentPrice(e.target.value)}
                                        isInvalid={priceV === null ? false : radioValue === '1' ? !priceV : false}
                                        disabled={!(radioValue === '1')}
                                        onBlur={() => priceValid()}
                                    />
                                    <Form.Text muted>
                                        Must be more than 0
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Price is not correct
                                    </Form.Control.Feedback>
                                </div>
                            </div>}
                        <ReCAPTCHA
                            className='ms-auto me-auto mt-2'
                            sitekey="6LdNcoQeAAAAALqGpHzi-ZokSl4sPkCOhJSUUWMK"
                            onChange={onChangeCap}
                        />
                        <div className="d-grid col-4 mb-3">
                            <button className="btn btn-success mt-2" onClick={createGo} disabled={userAdress === null || captcha || !priceV || !titleV} >Create NFT</button>
                        </div>
                    </div>}

                <Modal
                    size="md"
                    show={modalNft}
                    onHide={() => dispatch(openModalNft(false))}

                >
                    <Modal.Header closeButton className='bg-dark text-white'>
                        <Modal.Title className="text-warning">
                            Create NFT
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark text-center text-white'>
                        {status === 'complit' && <div>
                            {radioValue === '1' ? <p>NFT successfully created! After successful moderation, NFT will be published on<a rel='noreferrer'
                                href={process.env.REACT_APP_WAVES_TELEGRAM} className="alert-link" target="_blank"> the telegram channel.</a></p> : <p>At the moment, only free NFT creation is available, so after moderation it will appear in your profile.</p>}

                        </div>}
                        {status === 'pending' &&
                            <><h3 className='text-warning'>Creation...</h3>
                                <div className="spinner-border text-warning" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div></>}
                    </Modal.Body>
                    {status === 'complit' && <Modal.Footer className='bg-dark'>
                        <button className="btn btn-success" onClick={backCreate}>Create new NFT</button>
                        <Link to='/profile'><button className="btn btn-warning" onClick={() => dispatch(openModalNft(false))} >Go to my NFT</button></Link>
                    </Modal.Footer>}
                </Modal>
            </div>
        </div>)


}