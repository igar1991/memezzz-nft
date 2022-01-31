import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getTemplateArr } from '../redux/slices/mainSlice';


export const Newmeme = ({ closeM }) => {
    const dispatch = useDispatch()

    const { imgTemplate } = useSelector(state => state.main)

    useEffect(() => {
        dispatch(getTemplateArr())
    }, [dispatch])

    return (<div className="bg-dark">
        <div className="d-flex flex-wrap justify-content-center">
            {imgTemplate?.map((image, index) => {
                return (
                    <button key={index} className="bg-gray card m-2 shadow p-0" style={{ width: "10rem" }} onClick={() => closeM(image)}>
                        <img src={image.url} style={{ height: "9rem", objectFit: "cover" }} className="card-img-top" alt="meme" />
                        <div className="card-body">
                            <p className="card-text fw-bold">{image.name}</p>
                        </div>
                    </button>
                )
            })}
        </div>
    </div>
    )
}