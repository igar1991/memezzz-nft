import React from 'react';
import { Navbar } from '../components/navbar';

export const Guide = () => {
    return <>
        <Navbar />
        <div className="p-3 min-vh-100 bg-black" >
            <div className="bg-dark p-3 text-white fs-5 mb-2">
                <h1 className="text-warning">Guide</h1>
                <hr className="bg-warning" />
                <div className='d-flex justify-content-lg-between justify-content-sm-center  flex-wrap'>
                    <div className="col-lg-6 col-sm-11">
                        <h3 className="text-warning">Step 1</h3>
                        <p>To authorize and use our platform, you need to install a <a href="https://docs.waves.tech/en/ecosystem/waves-keeper/" target="_blank" rel='noreferrer'>Waves Keeper</a>.</p>
                        <p><a href="https://docs.waves.tech/en/ecosystem/waves-keeper/" target="_blank" rel='noreferrer'>Waves Keeper</a> is a browser extension that allows secure interaction with Waves-enabled web services.</p>
                        <p>Seed phrases and private keys are encrypted and stored within the extension and cannot be accessed by online dApps and services, making sure that users' funds are protected from hackers and malicious websites. Completion of a transaction doesn't require entering any sensitive information.</p>
                    </div>
                    <div className="col-lg-5 col-sm-11">
                        <img className='w-100 shadow' src="/guide/auth.png" alt="auth" />
                    </div>
                </div>
                <hr className="bg-warning" />
                <div className='d-flex justify-content-lg-between justify-content-sm-center  flex-wrap'>
                    <div className="col-lg-6 col-sm-11">
                        <h3 className="text-warning">Step 2</h3>
                        <p>You need to create a meme. You can upload your finished meme or create it in our constructor.</p>
                        <p>Attention! Meme templates must be freely licensed or created by you. You are free to use our templates. They are created especially for you, so that you don't have to worry about the license.</p>
                    </div>
                    <div className="col-lg-5 col-sm-11">
                        <img className='w-100 shadow' src="/guide/constructor.png" alt="constructor" />
                    </div>
                </div>
                <hr className="bg-warning" />
                <div className='d-flex justify-content-lg-between justify-content-sm-center  flex-wrap'>
                    <div className="col-lg-6 col-sm-11">
                        <h3 className="text-warning">Step 3</h3>
                        <p>Enter a title and price for your NFT. You can also specify the status of your meme.</p>
                        <p>Public status - after the creation of the NFT, it will be published in our marketplace in the <a href="https://t.me/memezzz_xyz" target="_blank" rel='noreferrer'>telegram channel</a>.</p>
                        <p>Private status - after creating an NFT, it will appear in your profile.</p>
                        <p>To create your NFT, it must be moderated, because the creation of NFT is free for you.</p>
                    </div>
                    <div className="col-lg-5 col-sm-11">
                        <img className='w-50 shadow d-block mx-auto' src="/guide/mintnft.png" alt="mintnft" />
                    </div>
                </div>
                <hr className="bg-warning" />
                <div className='d-flex justify-content-lg-between justify-content-sm-center  flex-wrap'>
                    <div className="col-lg-6 col-sm-11">
                        <h3 className="text-warning">Step 4</h3>
                        <p>After moderation and creation of the NF meme, you can find it in your profile.</p>
                        <p>You can change the price or status. You can also pick up the NFT.</p>
                        <p>Pick up - you are taking your nft from our dapp. It will appear in your Waves Keeper. Attention! You will no longer be able to put it up for sale in our marketplace.</p>
                    </div>
                    <div className="col-lg-5 col-sm-11">
                        <img className='w-50 shadow' src="/guide/profile.png" alt="profile" />
                        <img className='w-50 shadow' src="/guide/change.png" alt="change" />
                    </div>
                </div>
                <hr className="bg-warning" />
                <div className='d-flex justify-content-lg-between justify-content-sm-center  flex-wrap'>
                    <div className="col-lg-6 col-sm-11">
                        <h3 className="text-warning">Step 5</h3>
                        <p>Our marketplace is a <a href="https://t.me/memezzz_xyz" target="_blank" rel='noreferrer'>telegram channel</a>. We made this decision because this is the most familiar environment for memes.</p>
                        <p>You can not only have fun, but also buy the NFT you like. When you click on the purchase button, you will be redirected to the page with the purchase of the selected NFT.</p>
                    </div>
                    <div className="col-lg-5 col-sm-11">
                        <img className='w-50 mx-auto d-block shadow' src="/guide/market.png" alt="market" />
                    </div>
                </div>
            </div>
        </div>
    </>
}