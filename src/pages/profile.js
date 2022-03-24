import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../components/navbar';
import { getUserNftWaves } from '../redux/slices/loginSlice';
import { AlertFillIcon } from '@primer/octicons-react'
import { MemeTemplate } from '../components/memeTemplate';

export const Profile = () => {

    const dispatch = useDispatch()
    const { userAdress, userNft } = useSelector((state) => state.login)

    useEffect(() => {
        dispatch(getUserNftWaves(userAdress))
    }, [dispatch, userAdress])


    return <div style={{ backgroundColor: "black", minHeight: "100vh" }} >
        <Navbar />
        <div className="bg-dark text-warning m-2 p-3" style={{ minHeight: "90vh" }}>
            <h1>Your NFT Memes</h1>
            <hr className="bg-warning" />
            <div className='d-flex flex-wrap'>
                {userNft && userNft.length === 0 && userAdress !== null && <div className='ms-auto me-auto d-grid'>
                    <h2>You don't have NFT yet :(</h2>
                    <button onClick={() => dispatch(getUserNftWaves(userAdress))} className="btn btn-success mt-2" type="button">Refresh</button>
                </div>}
                {userAdress === null && <div className="alert alert-danger mt-2 ms-auto me-auto" role="alert">
                    <AlertFillIcon verticalAlign="middle" size={12} />Login please.
                </div>}
                {userNft && userNft.map(((item, index) => {
                    return (
                        <div key={index.toString()} className='d-flex flex-column flex-wrap'>
                            <MemeTemplate id={item.id} />
                        </div>
                    )
                }))}
            </div>
        </div>
    </div>
}