import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeText, chooseMeme, postHeight, postWidth } from '../redux/slices/mainSlice';
import { Stage, Layer, Text } from 'react-konva';
import { Modal } from "react-bootstrap";
import { Newmeme } from '../components/newmeme';
import { MemeImage } from '../components/memeImage';

export const GenerateMeme = ({ stageRef }) => {

    const dispatch = useDispatch()
    const { currentMeme, textOptions, widthCanvas, heightCanvas  } = useSelector(state => state.main)

    const [lgShow, setLgShow] = useState(false)

    useEffect(() => {
        if (window.innerWidth > 400) {
            dispatch(postWidth(300))
        } else {
            dispatch(postWidth(window.innerWidth - 100))
        }

        if (currentMeme) {
            const h = currentMeme.height * widthCanvas / currentMeme.width
            dispatch(postHeight(Math.round(Number(h))))
            
        }

    }, [ widthCanvas, currentMeme, dispatch ])


    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const image = new Image();
            image.src = event.target.result
            image.onload = function () {
                resolve({ src: event.target.result, w: this.width, h: this.height })
            }

        }
        reader.readAsDataURL(file);
    })

    const _onChange = (file) => {
        fileToDataUri(file)
            .then(({ src, w, h }) => {
                dispatch(chooseMeme({ url: src, width: w, height: h }))
            })
    }

    const closeM = (image) => {
        dispatch(chooseMeme(image))
        setLgShow(false)
    }

    return (
        <div className="d-flex col-12 justify-content-center flex-wrap">
            <div className="col-11 col-sm-5">
                {!currentMeme && <div className="d-flex mb-2 text-white justify-content-center text-center align-items-center" style={{ width: "95%", height: 400, border: '0.4rem dashed' }}><h2>Upload image or choose a template!</h2></div>}
                {currentMeme && <Stage width={widthCanvas} height={heightCanvas} ref={stageRef}>
                    <Layer>
                        <MemeImage src={currentMeme.url} w={widthCanvas} h={heightCanvas} />
                        {textOptions.map((el, index) => <Text
                            key={index}
                            text={el.text}
                            fontSize={el.fontsize}
                            fontFamily="Impact"
                            x={el.x}
                            y={el.y}
                            draggable
                            fill={el.isDragging ? 'gray' : el.fontcolor}
                            onDragStart={() => {
                                dispatch(changeText(textOptions.map((item) => item.id === el.id ? { ...item, isDragging: true } : item)));
                            }}
                            onDragEnd={e => {
                                dispatch(changeText(textOptions.map((item) => item.id === el.id ? { ...item, isDragging: false, x: e.target.x(), y: e.target.y() } : item)));
                            }}
                        />)}


                    </Layer>
                </Stage>}
            </div>
            <div className="col-11 col-sm-6">
                <div>
                    <label className="btn btn-primary">
                        <input className="d-none" type="file" onChange={(e) => _onChange(e.target.files[0])} />
                        Upload image from device
                    </label>
                    <button type="button" className="btn btn-primary ms-1" onClick={() => setLgShow(true)}>Сhoose a template</button>
                </div>
                {textOptions.map((el, index) => <div key={index}>
                    <input
                        disabled={!currentMeme}
                        className="form-control m-2"
                        type="text"
                        name="topText"
                        placeholder="Text"
                        value={el.text}
                        onChange={(e) =>  dispatch(changeText(textOptions.map((item) => item.id === el.id ? { ...item, text: e.target.value } : item)))}
                    />
                    <div className="d-flex align-items-center">
                        <h5 className="col-3">Font: {el.fontsize}px</h5 >
                        <input type="range" className="form-range ms-1 me-1" min={10} max={70} value={el.fontsize} onChange={(e) => dispatch(changeText(textOptions.map((item) => item.id === el.id ? { ...item, fontsize: Number(e.target.value) } : item)))} />
                        <input type="color" className="form-control form-control-color" id="exampleColorInput" value={el.fontcolor} title="Choose your font color" onChange={(e) => dispatch(changeText(textOptions.map((item) => item.id === el.id ? { ...item, fontcolor: e.target.value } : item)))}></input>
                    </div>
                </div>)}
                {textOptions.length < 4 && <button type="button" className="btn btn-primary" onClick={() => dispatch(changeText([...textOptions, {
                    id: textOptions.length,
                    isDragging: false,
                    x: 50,
                    y: 50 + textOptions.length * 30,
                    fontsize: 40,
                    text: '',
                    fontcolor: '#000000'
                }]))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg> Add new text field</button>}
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}

                >
                    <Modal.Header closeButton className='bg-dark text-white'>
                        <Modal.Title>
                            Сhoose a template
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark'><Newmeme closeM={closeM} /></Modal.Body>
                </Modal>
            </div>
        </div>
    )
}