import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  getTemplateArr } from '../redux/slices/mainSlice';
import template_meme from './all-memez.json';


export const Newmeme = ({ closeM }) => {
    const dispatch = useDispatch()

    console.log(template_meme)

    const imgTemplate = template_meme

    useEffect(() => {
        dispatch(getTemplateArr())
    }, [dispatch])

    return (<div className="bg-dark">
        <div className="d-flex flex-wrap justify-content-center">
            {imgTemplate?.map((image, index) => {
                return (
                    <button key={index} className="bg-gray card m-2 shadow p-0" style={{ width: "10rem" }} onClick={() => closeM(image)}>
                        <img src={image.path} style={{ height: "9rem", objectFit: "cover" }} className="card-img-top" alt="meme" />
                    </button>
                )
            })}
        </div>
    </div>
    )
}