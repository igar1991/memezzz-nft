import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feedmeme } from '../components/feedmeme';
import { Navbar } from '../components/navbar';
import { getUserMemes } from '../redux/slices/nftSlice';
import { AlertFillIcon } from '@primer/octicons-react'

export const Profile = () => {

    const dispatch = useDispatch()

    const {userAdress, networkId} = useSelector((state)=>state.meta)
    const {userMemes, statusUser} = useSelector((state)=>state.nft)

    useEffect(()=>{
        if(userMemes===null) {
            dispatch(getUserMemes(userAdress))
        }
    },[dispatch, userAdress, userMemes ])

    return <div style={{ backgroundColor: "black", minHeight: "100vh" }} >
        <Navbar />
        <div className="bg-dark text-warning m-2 p-3" style={{ minHeight: "90vh" }}>
            <h1>Your NFT Memes</h1>
            <hr className="bg-warning" />
            {networkId !== 100 && userAdress !== null && <div className="alert alert-danger mt-2" role="alert">
                            <AlertFillIcon verticalAlign="middle" size={12} /> Please, configure and <a rel='noreferrer'
                                href="https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup" className="alert-link">switch to xDai network.</a>
                        </div>}
       <Feedmeme arrNft={userMemes} status={statusUser} />
       {userMemes?.length===0&&<button className="btn btn-warning mt-2" onClick={()=>dispatch(getUserMemes(userAdress))} >Update</button>}
        </div>

    </div>
}