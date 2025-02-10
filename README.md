# AutoTrust
First Place Hackathon Winning Project at HackNYU 2025, Solana/Blockchain Track

## Description
**Inspiration:**  
The used car market faces fraud, price manipulation, and transparency issues. Our solution uses blockchain and NFTs to create a trustless, verifiable, and efficient marketplace.

### Key Goals
- **Immutable Ownership:** Cars are minted as NFTs with secure ownership transfers.  
- **Transparent Pricing:** Sales history stored on-chain prevents hidden fees.  
- **Dynamic Valuation:** Real-time data adjusts car prices.  
- **Decentralized Storage:** Service records stored on IPFS/Arweave.  
- **Web3 Integration:** Accepts crypto payments via Solana Pay & USDC.

### How It Works
- **NFT Car Ownership:** Each car has an NFT with metadata like VIN, model, history, and ownership.  
- **Transparent Sales History:** All sales are recorded on-chain, displaying past ownership, pricing trends, and vehicle details.  
- **Seamless Transactions:** Crypto payments are processed with escrow smart contracts.  
- **Dynamic Price Updates:** AI and oracles adjust car prices based on factors like mileage, history, and demand trends.

## Tech Stack
- **Frontend:** Next.js + TailwindCSS for a modern, responsive UI.
- **Backend:** Python FastAPI + MongoDB for storing car metadata, Node.js for NFT minting logic.
- **Blockchain:** Solana smart contracts written in Rust using Anchor for transaction management. 

## Installation
`git clone https://github.com/HassanZafar-2021/AutoTrust`

### Frontend:
```
cd frontend
npm install
npm run dev
```

### Backend:
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Blockchain:
`solana solana-test-validator`


## Credits

- **Tejas Chakrapani** - [GitHub](https://github.com/TCYTseven) - Full Stack Developer, Generative AI, NFT Minting
- **Shashank Bezgam** - [GitHub](https://github.com/shashankdatta) - Full Stack Developer, Solana Blockchain Engineer
- **Hassan Zafar** - [GitHub](https://github.com/HassanZafar-2021) - Frontend Developer
- **Aadit Anand Fadia** - [GitHub](https://github.com/aaf091) - Backend Developer, MongoDB Integration

## License
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

