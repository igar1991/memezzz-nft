import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarouselMain } from '../components/carousel';
import { Feedmeme } from '../components/feedmeme';
import { Navbar } from '../components/navbar';
import { getFeed, getJsonFeed } from '../redux/slices/feedSlice';


export const Main =()=>{

    const dispatch = useDispatch()

    const {arrJson} = useSelector(state=>state.feed)

    const { arrNft, status } = useSelector(state => state.feed)

    useEffect(()=>{
        if(arrJson.length>0) {
            dispatch(getFeed(arrJson))
        } else {
            dispatch(getJsonFeed())
        }
    },[arrJson, dispatch])


    return <div style={{minHeight: '100vh', backgroundColor: '#343a40' }}>
        <Navbar />
        <CarouselMain />
        <Feedmeme arrNft={arrNft} status={status} />
    </div>
}