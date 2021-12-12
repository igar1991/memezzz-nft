import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import image from './bag.png'

export const CarouselMain =()=>{
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
    return (
      <Carousel	
       activeIndex={index} 
       onSelect={handleSelect}
       style={{ backgroundImage: `url(${image})` }}
       >
      
      <Carousel.Item>
        <Carousel.Caption>
          <h1>Create your first NFT meme!</h1>
          <p>You can quickly create your own NFT meme saved in Swarm.</p>
          <Link to="/create"><button className="btn btn-success">Create NFT</button></Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h1>Upload your images to Swarm!</h1>
          <p>You can save your images to decentralised storage.</p>
          <Link to="/upload"><button className="btn btn-success">Upload to Swarm</button></Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h1>What is Swarm?</h1>
          <p>
          Swarm is a decentralised storage and communication system for a sovereign digital society.
          </p>
          <Link to="/about"><button className="btn btn-success">About Swarm</button></Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    )
}