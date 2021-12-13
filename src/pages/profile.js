import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feedmeme } from '../components/feedmeme';
import { Navbar } from '../components/navbar';
import { getUserMemes } from '../redux/slices/nftSlice';

export const Profile = () => {

    const dispatch = useDispatch()

    const {userAdress} = useSelector((state)=>state.meta)
    const {userMemes, status} = useSelector((state)=>state.nft)

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
       <Feedmeme arrNft={userMemes} status={status} />
        </div>

    </div>
}