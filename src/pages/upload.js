import React, { useRef } from 'react';
import { Navbar } from '../components/navbar';
import { GenerateMeme } from '../components/GenerateMeme';


export const Upload = () => {

    const stageRef = useRef(null);

    const handleExport = () => {
        const uri = stageRef.current?.toDataURL();
        downloadURI(uri, 'stage.png');
    };

    const downloadURI = (uri, name) => {
        const link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (<div style={{ backgroundColor: "black", minHeight: "100vh" }} >
        <Navbar />
        <div className="bg-dark text-warning m-2 p-3" style={{ minHeight: "90vh" }}>
            <h1>Upload your image or meme to Swarm!</h1>
            <hr className="bg-warning" />
            <GenerateMeme stageRef={stageRef} />
            <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-success me-4" >Upload to Swarm</button>
                <button className="btn btn-success" onClick={handleExport}>Download to divice</button>
            </div>
        </div>
    </div>)
}