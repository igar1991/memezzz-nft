import React, { useRef } from 'react';
import { Navbar } from '../components/navbar';
import { GenerateMeme } from '../components/GenerateMeme';


export const Create = () => {

    const stageRef = useRef(null);

    return (
        <div style={{ backgroundColor: "black", minHeight: "100vh" }} >
            <Navbar />
            <div className="bg-dark text-warning m-2 p-3" style={{ minHeight: "90vh" }}>
                <h1>Create your NFT meme!</h1>
                <hr className="bg-warning" />
                <GenerateMeme stageRef={stageRef} />
                <div className="d-flex flex-column justify-content-end align-content-end align-items-center pt-3">
                <div className="col-6 mb-3">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title your NFT" />
                </div>
                <div className="col-6 mb-3">
                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Description your NFT" rows="3"></textarea>
                </div>
                <button className="btn btn-success me-4" >Create NFT</button>
                
                </div>
            </div>

        </div>)


}