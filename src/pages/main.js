import React from 'react';
import { CarouselMain } from '../components/carousel';
import { Navbar } from '../components/navbar';
import { Newmeme } from '../components/newmeme';


export const Main =()=>{
    return <div>
        <Navbar />
        <CarouselMain />
        <Newmeme />

    </div>
}