
import type { ComponentType } from "react";

export interface Coin {
  name: string;
  ticker: string;
  coingeckoId: string;
  network?: string;
  icon?: ComponentType<{ className?: string }>;
  iconUrl?: string;
  balance: number;
  usdValue: number;
  price: number;
  change: number;
  history: { time: string, price: number }[];
  marketCap?: number;
  volume24h?: number;
  circulatingSupply?: number;
  totalSupply?: number;
  maxSupply?: number;
  allTimeHigh?: number;
  description?: string;
}

const coinsBase: Omit<Coin, 'balance' | 'usdValue' | 'price' | 'change' | 'history' | 'marketCap' | 'volume24h' | 'circulatingSupply' | 'totalSupply' | 'maxSupply' | 'allTimeHigh'>[] = [
  { 
    name: 'Bitcoin', 
    ticker: 'BTC', 
    coingeckoId: 'bitcoin', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675521/bitcoin-btc-logo_fchtil.png',
    description: `
      <p><b>Bitcoin (BTC)</b> is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography and recorded in a public distributed ledger called a blockchain.</p>
      <p>Created in 2009 by an unknown person or group of people using the name Satoshi Nakamoto, Bitcoin is the first and most well-known cryptocurrency. It pioneered the concept of a trustless, electronic payment system. Its scarcity, with a capped supply of 21 million coins, has led many to consider it a "digital gold" and a store of value.</p>
    `
  },
  { 
    name: 'Ethereum', 
    ticker: 'ETH', 
    coingeckoId: 'ethereum', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675606/ethereum-eth-logo_gkt5dg.png',
    description: `
      <p><b>Ethereum (ETH)</b> is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. Among cryptocurrencies, Ether is second only to Bitcoin in market capitalization.</p>
      <p>Ethereum was conceived in 2013 by programmer Vitalik Buterin. It pioneered the concept of a decentralized application (dApp) platform, enabling developers to build and deploy smart contracts and decentralized applications. This has led to a thriving ecosystem of decentralized finance (DeFi), non-fungible tokens (NFTs), and more.</p>
    `
  },
  { 
    name: 'USD Coin', 
    ticker: 'USDC', 
    coingeckoId: 'usd-coin', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760678111/usd-coin-usdc-logo_isqxlb.png',
    description: `
      <p><b>USD Coin (USDC)</b> is a digital stablecoin that is pegged to the United States dollar. It is managed by a consortium called Centre, which was founded by Circle and includes members from the cryptocurrency exchange Coinbase and Bitcoin mining company Bitmain.</p>
      <p>Each USDC is backed by one U.S. dollar or asset with equivalent fair value, which is held in accounts with regulated U.S. financial institutions. This provides price stability, making USDC a popular choice for traders seeking to hedge against the volatility of other cryptocurrencies and as a common medium of exchange in the DeFi ecosystem.</p>
    `
  },
  { 
    name: 'Tether', 
    ticker: 'USDT-ERC20', 
    coingeckoId: 'tether', 
    network: 'Ethereum (ERC20)', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688489/USDT-ERC20_zylqxi.png',
    description: `
      <p><b>Tether (USDT)</b> is a stablecoin, a type of cryptocurrency that aims to keep its value stable, pegged to an external reference, in this case, the U.S. dollar. It is issued by the Hong Kong-based company Tether Limited.</p>
      <p>USDT is one of the most widely used stablecoins in the cryptocurrency market. It allows traders to move in and out of positions in volatile cryptocurrencies without converting to fiat currency, providing liquidity and a hedge against market fluctuations. This version of USDT is an ERC-20 token, meaning it operates on the Ethereum blockchain.</p>
    `
  },
  { 
    name: 'Solana', 
    ticker: 'SOL', 
    coingeckoId: 'solana', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675609/solana-sol-logo_bcifcy.png',
    description: `
      <p><b>Solana (SOL)</b> is a high-performance blockchain supporting builders around the world creating crypto apps that scale today. It is known for its incredibly fast transaction speeds and low costs, achieved through a unique consensus mechanism called Proof of History (PoH) combined with Proof of Stake (PoS).</p>
      <p>This efficiency has made Solana a popular platform for decentralized applications (dApps), especially in the realms of DeFi, NFTs, and gaming. Its native cryptocurrency, SOL, is used for transaction fees and staking.</p>
    `
  },
  { 
    name: 'Tether', 
    ticker: 'USDT-TRC20', 
    coingeckoId: 'tether', 
    network: 'Tron (TRC20)', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760688695/USDT-TRC20_mautso.png',
    description: `
      <p><b>Tether (USDT)</b> is a stablecoin pegged to the U.S. dollar. This specific version is a TRC-20 token, meaning it is issued on the TRON blockchain. Using the TRON network allows for faster transaction speeds and significantly lower fees compared to the Ethereum-based (ERC-20) version of USDT.</p>
      <p>This makes TRC-20 USDT a popular choice for frequent, small-value transactions and for users looking to avoid the high gas fees often associated with the Ethereum network.</p>
    `
  },
  { 
    name: 'Dogecoin', 
    ticker: 'DOGE', 
    coingeckoId: 'dogecoin', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675627/dogecoin-doge-logo_vhntvk.png',
    description: `
      <p><b>Dogecoin (DOGE)</b> is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system as a "joke," taking aim at the wild speculation in cryptocurrencies at the time. It is considered both the first "meme coin," and, more specifically, the first "dog coin."</p>
      <p>Despite its satirical nature, Dogecoin developed a large online community and has been used for tipping content creators and for charitable donations. It is a decentralized, peer-to-peer digital currency that enables you to easily send money online.</p>
    `
  },
  { 
    name: 'Cardano', 
    ticker: 'ADA', 
    coingeckoId: 'cardano', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675738/cardano-ada-logo_pbavn1.png',
    description: `
      <p><b>Cardano (ADA)</b> is a proof-of-stake blockchain platform that says its goal is to allow “changemakers, innovators and visionaries” to bring about positive global change. The open-source project also aims to “redistribute power from unaccountable structures to the margins to individuals” — helping to create a society that is more secure, transparent and fair.</p>
      <p>Cardano was founded by Ethereum co-founder Charles Hoskinson and is known for its research-driven approach, with a strong emphasis on academic rigor and peer-reviewed development. Its native token is ADA.</p>
    `
  },
  { 
    name: 'XRP', 
    ticker: 'XRP', 
    coingeckoId: 'ripple', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675751/xrp-xrp-logo_smpmq7.png',
    description: `
      <p><b>XRP</b> is the native digital asset on the XRP Ledger—an open-source, permissionless, and decentralized blockchain technology that can settle transactions in 3-5 seconds. It was created by Ripple to be a fast, low-cost, and scalable alternative to both other digital assets and existing monetary payment platforms like SWIFT.</p>
      <p>XRP's main use case is to serve as a bridge currency between different fiat currencies and cryptocurrencies, facilitating faster and cheaper cross-border payments for financial institutions.</p>
    `
  },
  { 
    name: 'Avalanche', 
    ticker: 'AVAX', 
    coingeckoId: 'avalanche-2', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675757/avalanche-avax-logo_yt45tu.png',
    description: `
      <p><b>Avalanche (AVAX)</b> is a layer one blockchain that functions as a platform for decentralized applications and custom blockchain networks. It is one of Ethereum’s rivals, aiming to unseat Ethereum as the most popular blockchain for smart contracts. It aims to do so by having a higher transaction output of up to 6,500 transactions per second while not compromising scalability.</p>
      <p>The Avalanche network consists of three individual blockchains: the X-Chain, C-Chain, and P-Chain. Each chain has a distinct purpose, which is radically different from the approach Bitcoin and Ethereum use, namely having all nodes validate all transactions.</p>
    `
  },
  { 
    name: 'Sui', 
    ticker: 'SUI', 
    coingeckoId: 'sui', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675771/sui-sui-logo_blqmgl.png',
    description: `
      <p><b>Sui (SUI)</b> is a Layer-1 blockchain and smart contract platform designed from the ground up to make digital asset ownership fast, private, secure, and accessible to everyone. Its object-centric model, based on the Move programming language, enables parallel execution, sub-second finality, and rich on-chain assets.</p>
      <p>Developed by Mysten Labs, which was founded by former executives of Meta's advanced blockchain R&D organization, Sui aims to provide a step-function improvement in blockchain scalability and performance for a new generation of decentralized applications.</p>
    `
  },
  { 
    name: 'BNB', 
    ticker: 'BNB', 
    coingeckoId: 'binancecoin', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675782/bnb-bnb-logo_matwsx.png',
    description: `
      <p><b>BNB</b>, which stands for "Build and Build" (formerly Binance Coin), is the native cryptocurrency of the BNB Chain ecosystem. It was originally created as an ERC-20 token on the Ethereum blockchain to be used for discounted trading fees on the Binance exchange.</p>
      <p>Since then, BNB has migrated to its own native blockchain, the BNB Chain, and its use cases have expanded significantly. It is used to pay for transaction fees on the network, participate in governance, and access a wide range of applications and services within the growing BNB Chain ecosystem, including DeFi, gaming, and more.</p>
    `
  },
  { 
    name: 'Tron', 
    ticker: 'TRX', 
    coingeckoId: 'tron', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675804/tron-trx-logo_amapma.png',
    description: `
      <p><b>Tron (TRX)</b> is a blockchain-based decentralized operating system founded by Justin Sun. The TRON protocol, one of the largest blockchain-based operating systems in the world, aims to offer high-throughput, high-scalability, and high-availability for all Decentralized Applications (DApps) in the TRON ecosystem.</p>
      <p>TRON has become particularly popular for its low transaction fees and fast processing times, making it a major platform for hosting stablecoins like USDT and for dApps in the gaming and entertainment sectors. TRX is the native currency of the network.</p>
    `
  },
  { 
    name: 'Toncoin', 
    ticker: 'TON', 
    coingeckoId: 'the-open-network', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675862/toncoin-ton-logo_yhokxq.png',
    description: `
      <p><b>Toncoin (TON)</b> is the native cryptocurrency of The Open Network (TON), a decentralized and open internet platform. Originally designed by the encrypted messaging platform Telegram, the project was later handed over to the independent TON Foundation.</p>
      <p>TON is designed for speed and scalability, aiming to process millions of transactions per second. Its tight integration with the Telegram app gives it potential access to a massive user base for payments, dApps, and other Web3 services directly within the messaging interface.</p>
    `
  },
  { 
    name: 'Fetch.ai', 
    ticker: 'FET', 
    coingeckoId: 'fetch-ai', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675816/artificial-superintelligence-alliance-fet-logo_rhrvie.png',
    description: `
      <p><b>Fetch.ai (FET)</b> is a decentralized machine learning platform for applications such as asset trading, gig-economy work and energy grid optimization. The project aims to create a new digital economy where "Autonomous Economic Agents" (AEAs) can perform proactive economic activities on behalf of their owners.</p>
      <p>These agents can be used to find, negotiate, and interact with other agents to provide services and solve complex problems. The FET token is the native cryptocurrency of the Fetch.ai network, required for agents to perform tasks and access the network's machine learning utilities.</p>
    `
  },
  { 
    name: 'Pepe', 
    ticker: 'PEPE', 
    coingeckoId: 'pepe', 
    iconUrl: 'https://res.cloudinary.com/dk5jr2hlw/image/upload/v1760675900/pepe-pepe-logo_ey1qka.png',
    description: `
      <p><b>Pepe (PEPE)</b> is a meme coin launched on the Ethereum blockchain. The cryptocurrency was created as a tribute to the Pepe the Frog internet meme, created by Matt Furie, which gained popularity in the early 2000s.</p>
      <p>The project aims to capitalize on the popularity of meme coins, like Shiba Inu and Dogecoin, and has established itself as one of the top meme coins in the market. Pepe is a deflationary token that rewards long-term stakers and has a no-tax policy, aiming to maintain community engagement through its meme-centric culture.</p>
    `
  }
];

const generateHistory = (basePrice: number) => {
    const history = [];
    let price = basePrice * (1 + (Math.random() - 0.5) * 0.2);
    for(let i=0; i<30; i++) {
        price *= (1 + (Math.random() - 0.5) * 0.1);
        history.push({ time: `Day ${i+1}`, price });
    }
    return history;
}

const staticPrices: Record<string, { price: number; change: number }> = {
    'bitcoin': { price: 68765.43, change: 1.25 },
    'ethereum': { price: 3480.12, change: -0.55 },
    'usd-coin': { price: 1.00, change: 0.01 },
    'tether': { price: 0.99, change: -0.02 },
    'solana': { price: 171.23, change: 2.33 },
    'dogecoin': { price: 0.16, change: 0.89 },
    'cardano': { price: 0.45, change: -1.10 },
    'ripple': { price: 0.52, change: 0.35 },
    'avalanche-2': { price: 36.45, change: -2.45 },
    'sui': { price: 1.12, change: 5.12 },
    'binancecoin': { price: 601.88, change: 0.15 },
    'tron': { price: 0.12, change: 1.78 },
    'the-open-network': { price: 7.50, change: 3.21 },
    'fetch-ai': { price: 1.62, change: -4.20 },
    'pepe': { price: 0.000012, change: 12.5 },
};


export const getEmptyCoins = (): Coin[] => coinsBase.map(coin => {
    const staticData = staticPrices[coin.coingeckoId] || { price: 0, change: 0 };
    return {
        ...coin,
        balance: 0,
        usdValue: 0,
        price: staticData.price,
        change: staticData.change,
        history: generateHistory(staticData.price),
    }
});

export const getFundedCoins = (): Coin[] => coinsBase.map(coin => {
    const staticData = staticPrices[coin.coingeckoId] || { price: 0, change: 0 };
    if (coin.ticker === 'USDC') {
        const balance = 108490;
        return {
            ...coin,
            balance: balance,
            usdValue: balance * staticData.price,
            price: staticData.price,
            change: staticData.change,
            history: generateHistory(staticData.price),
        };
    }
    return {
        ...coin,
        balance: 0,
        usdValue: 0,
        price: staticData.price,
        change: staticData.change,
        history: generateHistory(staticData.price),
    };
});

// This is the main function to be used by components
export const getWalletCoins = async (): Promise<Coin[]> => {
    if (typeof window !== 'undefined') {
        const walletImported = window.localStorage.getItem('wallet-imported');
        if (walletImported && JSON.parse(walletImported) === 'funded') {
            return Promise.resolve(getFundedCoins());
        }
    }
    return Promise.resolve(getEmptyCoins());
};


export interface Transaction {
    id: string;
    type: 'Send' | 'Receive';
    status: 'Completed' | 'Pending' | 'Failed';
    coin: Coin;
    amount: number;
    usdValue: number;
    timestamp: number;
    fromAddress: string;
    toAddress: string;
    hash: string;
    block: number;
    fee: number;
}

export const getTransactions = async (allCoins: Coin[]): Promise<Transaction[]> => {
    const findCoin = (ticker: string): Coin => {
      const coin = allCoins.find(c => c.ticker === ticker);
      if (!coin) {
        // This is a fallback, should ideally not happen if all transaction coins are in allCoins
        return allCoins[0] as Coin;
      }
      return coin;
    }
    
    return [
      {
        id: "txn1",
        type: "Receive",
        status: "Completed",
        coin: findCoin('USDC'),
        amount: 50000.00,
        usdValue: 50000.00,
        timestamp: 1721484000000,
        fromAddress: "0x3a...b4c5",
        toAddress: "genesis-vault-main-0x...a4b8",
        hash: "0x123...abc",
        block: 15203040,
        fee: 5.21
      },
      {
        id: "txn2",
        type: "Receive",
        status: "Completed",
        coin: findCoin('USDC'),
        amount: 25000.00,
        usdValue: 25000.00,
        timestamp: 1721397600000,
        fromAddress: "0x9d...e5f6",
        toAddress: "genesis-vault-main-0x...a4b8",
        hash: "0x456...def",
        block: 15198765,
        fee: 4.88
      },
      {
        id: "txn3",
        type: "Send",
        status: "Completed",
        coin: findCoin('ETH'),
        amount: 1.5,
        usdValue: 5220,
        timestamp: 1721311200000,
        fromAddress: "genesis-vault-main-0x...a4b8",
        toAddress: "0x7g...h8i9",
        hash: "0x789...ghi",
        block: 15194321,
        fee: 2.15
      },
      {
        id: "txn4",
        type: "Receive",
        status: "Completed",
        coin: findCoin('USDC'),
        amount: 33490.00,
        usdValue: 33490.00,
        timestamp: 1721224800000,
        fromAddress: "0x2b...c3d4",
        toAddress: "genesis-vault-main-0x...a4b8",
        hash: "0xabc...jkl",
        block: 15189987,
        fee: 3.97
      },
      {
        id: "txn5",
        type: "Send",
        status: "Pending",
        coin: findCoin('BTC'),
        amount: 0.02,
        usdValue: 1356.38,
        timestamp: 1721138400000,
        fromAddress: "genesis-vault-main-0x...a4b8",
        toAddress: "bc1...q5r6",
        hash: "0xdef...mno",
        block: 800543,
        fee: 1.02
      },
       {
        id: "txn6",
        type: "Receive",
        status: "Failed",
        coin: findCoin('SOL'),
        amount: 10,
        usdValue: 1712,
        timestamp: 1721052000000,
        fromAddress: "sol1...tuv",
        toAddress: "genesis-vault-main-0x...a4b8",
        hash: "0xghi...pqr",
        block: 250123456,
        fee: 0.01
      },
    ];
}


export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate?: number;
}

export const currencies: Currency[] = [
    { code: 'USD', name: 'United States Dollar', symbol: '$', rate: 1 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.93 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 159.81 },
    { code: 'GBP', name: 'British Pound Sterling', symbol: '£', rate: 0.79 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.50 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.37 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.90 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.26 },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rate: 10.55 },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', rate: 1.64 },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', rate: 18.11 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', rate: 1.35 },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', rate: 7.81 },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', rate: 10.63 },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', rate: 1388.55 },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rate: 32.95 },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', rate: 88.22 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.45 },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rate: 5.44 },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', rate: 18.23 },
];

export const portfolioData = [
    { date: "Jan 24", balance: 50000 },
    { date: "Feb 24", balance: 52000 },
    { date: "Mar 24", balance: 60000 },
    { date: "Apr 24", balance: 58000 },
    { date: "May 24", balance: 75000 },
    { date: "Jun 24", balance: 72000 },
    { date: "Jul 24", balance: 85000 },
];
