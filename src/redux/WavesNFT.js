import { invokeScript } from '@waves/waves-transactions'
import fetch from 'node-fetch'

export default class WavesNFT {
  // URL_MAINNET = 'https://nodes.wavesnodes.com'
  // URL_TESTNET = 'https://nodes-testnet.wavesnodes.com'
  url = 'https://nodes.wavesnodes.com'
  chainId = ''
  nftUrlTemplate = '/assets/nft/{address}/limit/{limit}'
  txUrlTemplate = '/transactions/info/{tx}'
  nftManagerAddress
  // managerSigner
  seed

  constructor(url, chainId, nftManagerAddress = '') {
    this.url = url
    this.chainId = chainId
    this.nftManagerAddress = nftManagerAddress
  }

  getNftList(address, limit = 100) {
    const url = this.url + this.nftUrlTemplate.replace('{address}', address).replace('{limit}', limit.toString())

    return fetch(url).then(data => data.json())
  }

  getTxInfo(txId) {
    const url = this.url + this.txUrlTemplate.replace('{tx}', txId)

    return fetch(url).then(data => data.json())
  }

  async managerSetSeed(seed) {
    // const signer = new Signer({
    //   NODE_URL: this.url,
    // })
    // await signer.setProvider(new ProviderSeed(seed))
    // this.managerSigner = signer
    this.seed = seed
  }

  async managerMint(ownerAddress, name, description, isTradable, price) {
    if (!this.seed) {
      throw new Error('Manager seed is not init')
    }

    const data = {
      dApp: this.nftManagerAddress,
      fee: 500000,
      chainId: this.chainId,
      call: {
        function: 'mint',
        args: [
          { type: 'string', value: ownerAddress },
          { type: 'string', value: name },
          { type: 'string', value: description },
          { type: 'boolean', value: isTradable },
          { type: 'integer', value: price },
        ],
      },
    }

    return invokeScript(data, this.seed)
  }

  async managerPickUp(assetId) {
    if (!this.seed) {
      throw new Error('Manager seed is not init')
    }

    const data = {
      dApp: this.nftManagerAddress,
      fee: 500000,
      chainId: this.chainId,
      call: {
        function: 'pickUp',
        args: [
          { type: 'string', value: assetId },
        ],
      },
    }

    return invokeScript(data, this.seed)
  }

  managerSetTokenInfo(assetId, isTradable, price) {
    if (!this.seed) {
      throw new Error('Manager seed is not init')
    }

    const data = {
      dApp: this.nftManagerAddress,
      fee: 500000,
      chainId: this.chainId,
      call: {
        function: 'setTokenInfo',
        args: [
          { type: 'string', value: assetId },
          { type: 'boolean', value: isTradable },
          { type: 'integer', value: price },
        ],
      },
    }

    return invokeScript(data, this.seed)
  }

  managerBuy(assetId, isTradable, newPrice) {
    if (!this.seed) {
      throw new Error('Manager seed is not init')
    }

    // todo implement payment attachment
    const data = {
      dApp: this.nftManagerAddress,
      fee: 500000,
      chainId: this.chainId,
      call: {
        function: 'buy',
        args: [
          { type: 'string', value: assetId },
          { type: 'boolean', value: isTradable },
          { type: 'integer', value: newPrice },
        ],
      },
    }

    return invokeScript(data, this.seed)
  }
}
