import React, { useEffect } from 'react';
import { Navbar } from '../components/navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getNft, mintNftAdmin, rejectNftAdmin } from '../redux/slices/adminSlice';

export const Admin = () => {

  const dispatch = useDispatch()
  const arrPublicKey = ["FNLETB7zYNDssmXXTna7TYfDHZckTguHfki3jV3AKEWt", "Dw8VJL7Q5YG7ru7xuf16N4jH8mHsTKecKELpCZCig4g5"]

  const { allNft } = useSelector(state => state.admin)
  const { publicKey } = useSelector(state => state.login)


  useEffect(() => {
    dispatch(getNft())
  }, [dispatch])
  return <>
    <Navbar />
    <div className="p-3" style={{ backgroundColor: "black", minHeight: "100vh" }}>
      {arrPublicKey.includes(publicKey) && allNft && <div>
        <div className="d-grid gap-2">
          <button onClick={() => dispatch(getNft())} className='btn btn-block btn-primary m-1'>Reload</button>
        </div>
        {allNft.map((item, index) => {
          return (
            
            <div className="d-flex text-warning" key={index.toString()}>
              {item.url.includes('gateway.ethswarm.org/bzz/') && <><div className='col-4 border border-white'>
                <img src={item.url} alt='meme' style={{ maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <div className='col-4 border border-white p-1'>
                <h4>ID:</h4>
                <p className="text-white">{item.id}</p>
                <h4>Title:</h4>
                <p className="text-white">{item.title}</p>
                <h4>Adress creator:</h4>
                <p className="text-white">{item.creator}</p>
                <h4>Price:</h4>
                <p className="text-white">{item.price}</p>
                <h4>Status for marketplace:</h4>
                {item.public === 1 ? <p className="text-success fs-4">Public</p> : <p className="text-danger fs-4">Private</p>}
              </div>
              <div className='col-4 border border-white p-1'>
                <h4>Status:</h4>
                <p className={`text-${item.status === 'start' ? 'success' : 'danger'} fs-4`}>{item.status}</p>
                <button onClick={() => dispatch(mintNftAdmin(item.id))} className='btn btn-block btn-success m-1'>Create NFT</button>
                <button onClick={() => dispatch(rejectNftAdmin(item.id))} className='btn btn-block btn-danger m-1'>Reject</button>
              </div></>}
            </div>
          )
        })}
      </div>}
    </div>
  </>
}