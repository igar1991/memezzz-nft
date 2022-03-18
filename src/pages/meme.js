import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from "react-router"
import { MemeTemplate } from '../components/memeTemplate';
import { getOneNft } from '../redux/slices/onenftSlice';
import { buyNftWaves } from '../redux/slices/nftSlice';
import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';
import { ButtonGroup, ToggleButton } from "react-bootstrap";




export const Meme = () => {



    let { id } = useParams();
    const dispatch = useDispatch()
    const { nftData } = useSelector(state => state.onenft)

    const [value, setValue] = useState('')
    const [istrade, setIstrade] = useState('1')

    useEffect(() => {
        dispatch(getOneNft(id))
    }, [dispatch, id])


    const signer = new Signer({
        // Specify URL of the node on Testnet
        NODE_URL: 'https://nodes-testnet.wavesnodes.com',
      });
      const keeper = new ProviderKeeper();
      signer.setProvider(keeper);

      const memeBuy= async(idAsset, price, newprice, tradable)=>{
        const trade = tradable === '1' ? true : false
        const data = {
            dApp: '3N4bt53eU7kwBbhAkh2KFYajCc1kAtu9TY8',
            fee: 500000,
            chainId: 84,
            payment: [{
                assetId: "WAVES",
                amount: price*1.05*100000000,
              }],
            call: {
              function: 'buy',
              args: [
                { type: 'string', value: idAsset },
                { type: 'boolean', value: trade },
                { type: 'integer', value: newprice*100000000 },
              ],
            },
          }
          const [tx] = await signer
            .invoke(data)
            .broadcast();
            console.log(tx.sender)
      }
      
console.log()
    return <>
        <Navbar />
        <div className="p-3" style={{ backgroundColor: "black", minHeight: "90vh" }}>
            <div className="bg-dark text-warning p-3" style={{ minHeight: "90vh" }}>
                <h1>NFT meme</h1>
                <hr />
                {nftData && <div className='d-flex flex-wrap'>
                    <div className='col-12 col-md-8'>
                        <img className="d-flex ms-auto me-auto" src={nftData.url} alt="NFT meme" style={{ height: "50vh", objectFit: "contain", maxWidth: '90%' }} />
                    </div>
                    <div className='col-12 col-md-4'>
                        <h3>{nftData.title}</h3>
                        <hr />
                        <h4>Creator:</h4>
                        <p className="text-white">{nftData.creator}</p>
                        <h4>Owner:</h4>
                        <p className="text-white">{nftData.owner}</p>
                        <h4>Price:</h4>
                        <p className="text-white">{(Number(nftData.price)*1.05).toFixed(2)}</p>
                        <ButtonGroup className="col-4">
                                    <ToggleButton
                                        id='1'
                                        type="radio"
                                        variant={istrade === '1' ? 'warning' : 'outline-warning'}
                                        name="radio"
                                        value={'1'}
                                        checked={istrade === '1'}
                                        onChange={(e) => setIstrade(e.currentTarget.value)}
                                    >
                                        Public
                                    </ToggleButton>
                                    <ToggleButton
                                        id='0'
                                        type="radio"
                                        variant={istrade === '0' ? 'warning' : 'outline-warning'}
                                        name="radio"
                                        value={'0'}
                                        checked={istrade === '0'}
                                        onChange={(e) => setIstrade(e.currentTarget.value)}
                                    >
                                        Private
                                    </ToggleButton>
                                </ButtonGroup>
                                <div className="d-grid col-8 mb-3 mt-2">
                                    <h5>New price in Waves</h5>
                                    <input disabled={!(istrade==='1')} type="text" id="inputPrice" className="form-control" value={value} placeholder="Must be more 0" onChange={e => setValue(e.target.value)} />
                                </div>
                        <div className="d-grid gap-2">
                            <button onClick={()=>dispatch(buyNftWaves({id: nftData.id, id_asset: nftData.id_asset,price: nftData.price, newprice: value, tradable: istrade}))} className="btn btn-success" type="button">Buy</button>
                        </div>
                    </div>
                </div>}

            </div>
        </div>

    </>
}