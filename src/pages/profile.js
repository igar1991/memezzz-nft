import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feedmeme } from '../components/feedmeme';
import { Navbar } from '../components/navbar';
import { getUserNftWaves } from '../redux/slices/loginSlice';
import { AlertFillIcon } from '@primer/octicons-react'
import { MemeTemplate } from '../components/memeTemplate';
import { changeNftWaves, pickupNftWaves } from '../redux/slices/nftSlice';
import { Modal, ButtonGroup, ToggleButton, Form } from "react-bootstrap";

export const Profile = () => {

    const dispatch = useDispatch()
    const {userAdress, userNft} = useSelector((state)=>state.login)
    const [radioValue, setRadioValue] = useState('1');
    const [currentPrice, setCurrentPrice] = useState('');

    useEffect(()=>{
        if(userNft===null) {
            dispatch(getUserNftWaves(userAdress))
        }
    },[dispatch, userAdress, userNft ])

    const testFun =()=>{
        console.log('1111')
        dispatch(getUserNftWaves(userAdress))
        // dispatch(pickupNftWaves({ id, id_asset}))
        // dispatch(changeNftWaves({ id, id_asset, isTradable, price}))
    }

    const changeInfo =(id, id_asset, isTradable, price)=>{
        const trade = isTradable==='1'?true: false
        dispatch(changeNftWaves({ id, id_asset, isTradable: trade, price: +price}))
    }

    return <div style={{ backgroundColor: "black", minHeight: "100vh" }} >
        <Navbar />
        <div className="bg-dark text-warning m-2 p-3" style={{ minHeight: "90vh" }}>
            <h1>Your NFT Memes</h1>
            <hr className="bg-warning" />
            <button onClick={testFun}>GGGGGGGGG</button>
            <div className='d-flex'>
            {userNft&&userNft.map((item=>{
                return (
                    <div className='d-flex flex-column'>
                    <MemeTemplate img={item.url} title={item.title} />
                    <div className="d-grid gap-2 p-2">
                        
                        <button onClick={()=>dispatch(pickupNftWaves({ id: item.id, id_asset: item.id_asset}))} className="btn btn-success" type="button">PickUp</button>
                        <ButtonGroup className="col-4">
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
                                <div className="d-grid col-8 mb-3">
                                    <h5>Price in Waves</h5>
                                    <input disabled={!(radioValue==='1')} type="text" id="inputPrice" className="form-control" value={currentPrice} placeholder="Must be more 0" onChange={e => setCurrentPrice(e.target.value)} />
                                </div>
                        <button onClick={()=>changeInfo(item.id, item.id_asset, radioValue, currentPrice)} className="btn btn-success" type="button">Change info</button>
                    </div>
                    </div>
                )
            }))}
            </div>
        </div>
    </div>
}