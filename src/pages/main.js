import React from 'react';
import { Navbar } from '../components/navbar';
import { Link } from 'react-router-dom';

export const Main = () => {
    return <div className="bg-dark">
        <Navbar />
        <div className='d-flex justify-content-center flex-wrap mb-lg-5'>
            <div className='d-flex align-items-center mt-3 ps-3 col-md-5 col-11'>
                <div>
                    <h1 className='text-white'>Create, sell and enjoy NFT memes</h1>
                    <h5 className='text-secondary mb-3'>MemeZzz is the world's first NFT memes marketplace in the telegram channel</h5>
                    <div className='d-flex'>
                        <Link className="nav-link" to="/create"><button className='btn btn-success ms-2 btn-lg'>Create NFT</button></Link>
                    </div>
                </div>
            </div>
            <div className='col-md-4 col-8 p-3'>
                <img src="/file/hive.svg" alt="hive" className="w-100" />
            </div>
        </div>
        <hr className="bg-warning" />

        <div className='d-flex mt-5 flex-wrap justify-content-around text-center'>
            <div className='col-6 col-md-2'>
                <img src="/file/1.svg" alt="hive" className="w-50" />
                <p className='text-light fs-5'>Upload your meme or create it in our constructor.</p>
            </div>
            <div className='col-6 col-md-2'>
                <img src="/file/2.svg" alt="hive" className="w-50" />
                <p className='text-light fs-5'>Upload your meme and metadata to Swarm.</p>
            </div>
            <div className='col-6 col-md-2'>
                <img src="/file/3.svg" alt="hive" className="w-50" />
                <p className='text-light fs-5'>Mint your NFT meme in any network.</p>
            </div>
            <div className='col-6 col-md-2'>
                <img src="/file/4.svg" alt="hive" className="w-50" />
                <p className='text-light fs-5'>Sell ​​NFT on the marketplace.</p>
            </div>
        </div>
        <hr className="bg-warning" />
        <h1 className='text-white ms-5'>Supported networks</h1>
        <div className='d-flex mt-5 mb-5 flex-wrap justify-content-around text-center'>
            <div className='col-6 col-md-2'>
                <img src="/file/6.svg" alt="hive" className="w-100" />
            </div>
            <div className='col-6 col-md-2'>
                <img src="/file/7.svg" alt="hive" className="w-100" />
            </div>
            <div className='col-6 col-md-2'>
                <img src="/file/8.svg" alt="hive" className="w-100" />
            </div>
        </div>
        <h1 className='text-white ms-5'>Our team</h1>
        <div className='d-flex mt-5 flex-wrap justify-content-around text-center'>
            <div className='col-6 col-md-2'>
                <img src="/file/9.svg" alt="hive" className="w-50" />
                <p className='text-light fs-5'>Igor</p>
            </div>
            <div className='col-6 col-md-2'>
                <img src="/file/10.svg" alt="hive" className="w-50" />
                <p className='text-light fs-5'>Victor</p>
            </div>
            <div className='col-6 col-md-2'>
                <img src="/file/11.svg" alt="hive" className="w-50" />
                <p className='text-light fs-5'>Mary</p>
            </div>
            <div className='col-6 col-md-2'>
                <img src="/file/12.svg" alt="hive" className="w-50" />
                <p className='text-light fs-5'>Roman</p>
            </div>
        </div>
        <hr className="bg-warning" />
        <div className='d-flex pb-2 flex-wrap justify-content-center text-center'>
            <div className='col-2 col-md-1'>
                <a target="_blank"
                    rel='noreferrer'
                    href="https://twitter.com/iiggaarr1991">
                    <img src="/file/twitter.svg" alt="hive" className="w-50" />
                </a>
            </div>
            <div className='col-2 col-md-1'>
                <a target="_blank"
                    rel='noreferrer'
                    href={process.env.REACT_APP_WAVES_TELEGRAM}>
                    <img src="/file/telegram.svg" alt="hive" className="w-50" />
                </a>
            </div>
        </div>
    </div>
}