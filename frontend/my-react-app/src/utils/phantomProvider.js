export const PhantomProvider = () => {
  if (
    typeof window !== "undefined" &&
    window.solana &&
    window.solana.isPhantom
  ) {
    return window.solana;
  }
  return null;
};
