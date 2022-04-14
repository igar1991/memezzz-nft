import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SwarmNFT from "swarm-nft/SwarmNFT.min";
import { Bee } from "@ethersphere/bee-js";
import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';

const { providers } = require('ethers');
const bee = new Bee('https://gateway-proxy-bee-8-0.gateway.ethswarm.org');
//const url = 'http://localhost:3007';
const url = 'https://api-memez.testeron.pro'

const signer = new Signer({
    // Specify URL of the node on Testnet
    NODE_URL: 'https://nodes-testnet.wavesnodes.com',
  });
  const keeper = new ProviderKeeper();
  signer.setProvider(keeper)
  



export const uploadNft = createAsyncThunk('nft/uploadNft',
    async function ({ image, title }, { rejectWithValue }) {
        try {
            const provider = new providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            const instance = new SwarmNFT(bee, provider, signer, {
                erc721Address: '0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469'
            });
            instance.setGatewayPostageBatchId();
            instance.setGatewayUrlTemplate('https://gateway-proxy-bee-8-0.gateway.ethswarm.org/bzz/{reference}/')
            const result = await instance.uploadNFT(image, '.jpg', {
                title: title,
            });
            return result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const sendNftWaves = createAsyncThunk('nft/sendNftWaves',
    async function (item, { rejectWithValue }) {
        let form_data = new URLSearchParams();
        for (let key in item) {
            form_data.append(key, item[key]);
        }
        console.log(item)
        try {
            const response = await fetch('http://localhost:3007/new-nft/', {
                method: 'POST',
                body: form_data,
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

        } catch (error) {
            return rejectWithValue(error)
            
        }
    }
)

export const getUserMemes = createAsyncThunk('nft/getJsonFeed',
    async function (ad, { rejectWithValue }) {
        try {
            const provider = new providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            const instance = new SwarmNFT(bee, provider, signer, {
                erc721Address: '0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469'
            });
            let data = await instance.getUserTokens(ad);
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const createNft = createAsyncThunk('nft/createNft',
    async function ({ ad, metaData }, { rejectWithValue }) {
        try {
            const provider = new providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();
            const instance = new SwarmNFT(bee, provider, signer, {
                erc721Address: '0xc5caC9F4610fb874F54aF5B12c19Cc5fECF75469'
            });
            const nftResult = await instance.mintNFT(ad, metaData);
            await nftResult.wait();
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)



export const buyNftWaves = createAsyncThunk('nft/buyNftWaves',
    async function ({ id, id_asset, price, newprice, tradable, id_post }, { rejectWithValue }) {
        try {
            const trade = tradable === '1' ? true : false
            console.log(id, id_asset, price, newprice, tradable)
            console.log(id, id_asset, +(price*1.05*100000000).toFixed(0), +newprice*100000000, trade)
            const data = {
                dApp: '3N4bt53eU7kwBbhAkh2KFYajCc1kAtu9TY8',
                fee: 500000,
                chainId: 84,
                payment: [{
                    assetId: "WAVES",
                    amount: (+price*1.05*100000000).toFixed(0),
                  }],
                call: {
                  function: 'buy',
                  args: [
                    { type: 'string', value: id_asset },
                    { type: 'boolean', value: trade },
                    { type: 'integer', value: (+newprice*100000000).toFixed(0) },
                  ],
                },
              }
              const [tx] = await signer
                .invoke(data)
                .broadcast();
                console.log(tx.sender)
                let form_data = new URLSearchParams();
                const item = {
                    owner: tx.sender,
                    price: newprice,
                    public: tradable,
                }
                console.log(item)
                for (let key in item) {
                    form_data.append(key, item[key]);
                }
                const response = await fetch(`${url}/buy-nft/${id}`, {
                    method: 'POST',
                    body: form_data,
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


export const nftSlice = createSlice({
    name: "nft",
    initialState: {
        modalNft: false,
        metaUrl: null,
        status: "start",
        statusUpload: "start",
        statusUser: "start",
        error: null,
        userMemes: null
    },
    reducers: {
        openModalNft: (state, action) => {
            state.modalNft = action.payload
        },
        clearMeta: (state) => {
            state.metaUrl = null
        }
    },
    extraReducers: {
        [uploadNft.pending]: (state) => {
            state.statusUpload = "pending"
        },
        [uploadNft.fulfilled]: (state, action) => {
            state.metaUrl = action.payload
            state.statusUpload = "complit"
        },
        [uploadNft.rejected]: (state, action) => {
            state.statusUpload = "error"
            state.error = action.payload
        },
        [createNft.pending]: (state) => {
        },
        [createNft.fulfilled]: (state, action) => {
            state.metaUrl = action.payload
        },
        [createNft.rejected]: (state, action) => {
            state.error = action.payload
        },
        [getUserMemes.pending]: (state) => {
            state.statusUser = 'pending'
        },
        [getUserMemes.fulfilled]: (state, action) => {
            const newarr = action.payload.map((el) => el.meta)
            state.userMemes = newarr
            state.statusUser = "complit"
        },
        [getUserMemes.rejected]: (state, action) => {
            state.statusUser = "error"
            state.error = action.payload
        },
        [sendNftWaves.pending]: (state) => {
            state.status = 'pending'
        },
        [sendNftWaves.fulfilled]: (state, action) => {
            state.status = "complit"
        },
        [sendNftWaves.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },
        [buyNftWaves.pending]: (state) => {
        },
        [buyNftWaves.fulfilled]: (state, action) => {
        },
        [buyNftWaves.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { clearMeta, openModalNft } = nftSlice.actions

export default nftSlice.reducer