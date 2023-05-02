const hre = require("hardhat");

async function main() {
  const ProductReviews = await hre.ethers.getContractFactory("ProductReviews");
  const productReviews = await ProductReviews.deploy();

  await productReviews.deployed();

  console.log("ProductReviews deployed to:", productReviews.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});