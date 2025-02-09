Prerequisites

Node v18.18.0 or higher

Rust v1.77.2 or higher

Anchor CLI 0.30.1 or higher

Solana CLI 1.18.17 or higher

MongoDB

Installation

Clone the repo

git clone <repo-url>
cd <backend-repo-name>

Install Dependencies

pnpm install

Set Up Environment Variables

Create a .env file in the root directory and configure the necessary environment variables:

DATABASE_URL=<your-database-url>
SOLANA_RPC_URL=https://api.devnet.solana.com
ANCHOR_WALLET=<path-to-your-wallet-keypair>

Start the Backend Server

pnpm dev

Services

API

This backend serves as the middleware between the frontend and the Solana blockchain, handling business logic, authentication, and database interactions.

Endpoints

POST /listings - Create a new car listing

GET /listings - Fetch all available car listings

GET /listings/:id - Get details of a specific car listing

POST /transactions - Handle NFT transactions and ownership transfers

GET /transactions/:wallet - Fetch transaction history for a given wallet

Database

PostgreSQL is used to store off-chain metadata such as user profiles, transaction records, and additional listing details.

Prisma ORM is used for database migrations and interactions.

Blockchain Integration

Uses the Anchor framework for smart contract interactions.

Handles NFT minting, ownership transfers, and dynamic pricing through oracles.

Commands

Run Database Migrations

pnpm prisma migrate deploy

Start the Local Development Server

pnpm dev

Run Tests

pnpm test

Deploy to Production

pnpm deploy

Deployment

The backend can be deployed using a cloud provider such as AWS, Vercel, or Railway, with environment variables configured for the production environment.

This README provides essential instructions for setting