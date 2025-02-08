#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod frontend {
    use super::*;

  pub fn close(_ctx: Context<CloseFrontend>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.frontend.count = ctx.accounts.frontend.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.frontend.count = ctx.accounts.frontend.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeFrontend>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.frontend.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeFrontend<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Frontend::INIT_SPACE,
  payer = payer
  )]
  pub frontend: Account<'info, Frontend>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseFrontend<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub frontend: Account<'info, Frontend>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub frontend: Account<'info, Frontend>,
}

#[account]
#[derive(InitSpace)]
pub struct Frontend {
  count: u8,
}
