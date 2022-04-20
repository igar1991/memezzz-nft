import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router"
import { getOneNft } from '../redux/slices/onenftSlice';
import { buyNftWaves } from '../redux/slices/nftSlice';
import { ButtonGroup, ToggleButton, Form } from "react-bootstrap";



export const Meme = () => {

    let { id } = useParams();
    const dispatch = useDispatch()
    const { nftData } = useSelector(state => state.onenft)

    const [currentPrice, setCurrentPrice] = useState('');
    const [radioValue, setRadioValue] = useState('1');
    const [priceV, setPriceV] = useState(false);


    useEffect(() => {
        dispatch(getOneNft(id))
    }, [dispatch, id])

    const url = 'https://testnet.wavesexplorer.com/address/'

    const Buyfunc = (id, id_asset, price, newprice, tradable) => {
        if (newprice <= 0 && tradable === '1') {
            setPriceV(true)
            return
        }
        if (newprice > 100000000 && tradable === '1') {
            setPriceV(true)
            return
        }
        if (!(tradable === '1')) {
            dispatch(buyNftWaves({ id, id_asset, price, newprice: 0, tradable }))
        } else {
            dispatch(buyNftWaves({ id, id_asset, price, newprice, tradable }))
        }
    }

    return <>
        <Navbar />
        <div className="p-3" style={{ backgroundColor: "black", minHeight: "90vh" }}>
            <div className="bg-dark text-warning p-3" style={{ minHeight: "90vh" }}>
                <h1>NFT meme</h1>
                <hr />
                {nftData && nftData.status === 'minted' && <div className='d-flex flex-wrap'>
                    <div className='col-12 col-md-8'>
                        <img className="d-flex ms-auto me-auto" src={nftData.url} alt="NFT meme" style={{ height: "50vh", objectFit: "contain", maxWidth: '90%' }} />
                    </div>
                    <div className='col-12 col-md-4'>
                        <h3>{nftData.title}</h3>
                        <hr />
                        <h5>Creator:</h5>
                        <a rel='noreferrer'
                            href={`${url}${nftData.creator}`} className="alert-link" target="_blank">{nftData.creator}</a>
                        <h5>Owner:</h5>
                        <a rel='noreferrer'
                            href={`${url}${nftData.owner}`} className="alert-link" target="_blank">{nftData.owner}</a>
                        {+nftData.public === 1 && <>
                            <h5>Price:</h5>
                            <p className="text-white">{(Number(nftData.price) * 1.05).toFixed(2)}</p>
                            <ButtonGroup className="col-4">
                                <ToggleButton
                                    id='1'
                                    type="radio"
                                    variant={radioValue === '1' ? 'warning' : 'outline-warning'}
                                    name="radio"
                                    value={'1'}
                                    checked={radioValue === '1'}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    Public
                                </ToggleButton>
                                <ToggleButton
                                    id='0'
                                    type="radio"
                                    variant={radioValue === '0' ? 'warning' : 'outline-warning'}
                                    name="radio"
                                    value={'0'}
                                    checked={radioValue === '0'}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    Private
                                </ToggleButton>
                            </ButtonGroup>
                            <div className='col-8'>
                                <Form.Label className="text-primary mt-1">Price in Waves</Form.Label>
                                <Form.Control
                                    required
                                    id="price"
                                    type="number"
                                    step="0.1"
                                    maxLength={8}
                                    value={currentPrice}
                                    onChange={(e) => setCurrentPrice(e.target.value)}
                                    isInvalid={radioValue === '1' ? priceV : false}
                                    disabled={!(radioValue === '1')}
                                />
                                <Form.Text muted>
                                    Must be more than 0
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Price not correct!
                                </Form.Control.Feedback>
                            </div>
                            <div className="d-grid gap-2 mt-1">
                                <button onClick={() => Buyfunc(nftData.id, nftData.id_asset, nftData.price, currentPrice, radioValue)} className="btn btn-success" type="button">{radioValue === '1' ? 'Buy and publish' : 'Buy'}</button>
                            </div>
                        </>}
                    </div>
                </div>}
            </div>
        </div>

    </>
}