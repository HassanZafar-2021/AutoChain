use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
    metadata::{
        create_metadata_accounts_v3,
        CreateMetadataAccountsV3,
        Metadata,
    },
};

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod car_nft {
    use super::*;

    // Initialize a new car NFT with VIN verification
    pub fn initialize_car(ctx: Context<InitializeCar>, vin: String, uri: String) -> Result<()> {
        let car_account = &mut ctx.accounts.car_account;
        car_account.owner = ctx.accounts.owner.key();
        car_account.vin = vin;
        car_account.metadata_uri = uri;
        car_account.is_listed = false;
        car_account.price = 0;
        Ok(())
    }

    // List car for sale
    pub fn list_car(ctx: Context<UpdateCar>, price: u64) -> Result<()> {
        let car_account = &mut ctx.accounts.car_account;
        require!(car_account.owner == ctx.accounts.owner.key(), ErrorCode::Unauthorized);
        
        car_account.is_listed = true;
        car_account.price = price;
        Ok(())
    }

    // Unlist car from sale
    pub fn unlist_car(ctx: Context<UpdateCar>) -> Result<()> {
        let car_account = &mut ctx.accounts.car_account;
        require!(car_account.owner == ctx.accounts.owner.key(), ErrorCode::Unauthorized);
        
        car_account.is_listed = false;
        car_account.price = 0;
        Ok(())
    }

    pub fn update_metadata(ctx: Context<UpdateCar>, new_uri: String) -> Result<()> {
        let car_account = &mut ctx.accounts.car_account;
        require!(car_account.owner == ctx.accounts.owner.key(), ErrorCode::Unauthorized);
        
        car_account.metadata_uri = new_uri;
        Ok(())
    }

    pub fn close_car(ctx: Context<CloseCar>) -> Result<()> {
        require!(ctx.accounts.car_account.owner == ctx.accounts.owner.key(), ErrorCode::Unauthorized);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeCar<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + 32 + 200 + 200 + 1 + 8
    )]
    pub car_account: Account<'info, CarAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateCar<'info> {
    #[account(mut)]
    pub car_account: Account<'info, CarAccount>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct CloseCar<'info> {
    #[account(mut, close = owner)]
    pub car_account: Account<'info, CarAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct CarAccount {
    pub owner: Pubkey,        // 32 bytes
    #[max_len(21)]           // 17 chars + 4 bytes prefix
    pub vin: String,
    #[max_len(50)]          // Adjust size based on your MongoDB URI length
    pub metadata_uri: String,
    pub is_listed: bool,     // 1 byte
    pub price: u64,          // 8 bytes
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action")]
    Unauthorized,
}