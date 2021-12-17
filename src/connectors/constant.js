const IS_MAINNET = process.env.REACT_APP_NETWORK === 'mainnet';

const CONTRACTS = IS_MAINNET
  ? {
    RESERVE: '0xcAc6338567608fE59ab5dd8fCdA97A1135e5a102',
    FAITH_TOKEN: '0x20f03122BD3195979Da4F56D14f57B38ccC33365',
  } : {
    RESERVE: '0xcAc6338567608fE59ab5dd8fCdA97A1135e5a102',
    FAITH_TOKEN: '0x20f03122BD3195979Da4F56D14f57B38ccC33365',
  }


const HTTP_PROVIDER_URL = IS_MAINNET? "https://bsc-mainnet.web3api.com/v1/T6NPT88TA4V7YMSFATCQZR31VU96KMA7ZP" : "https://bsc-testnet.web3api.com/v1/T6NPT88TA4V7YMSFATCQZR31VU96KMA7ZP";

export {
  IS_MAINNET,
  CONTRACTS,
  HTTP_PROVIDER_URL
}
