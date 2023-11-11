// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const content = await hre.ethers.deployContract("Content");
  const communities = await hre.ethers.deployContract("Communities");
  const mentors = await hre.ethers.deployContract("Mentors");
  const nftBadges = await hre.ethers.deployContract("NftBadge");
  const post = await hre.ethers.deployContract("Post");
  const profile = await hre.ethers.deployContract("Profile");

  await profile.waitForDeployment();
  await content.waitForDeployment();
  await communities.waitForDeployment();
  await mentors.waitForDeployment();
  await nftBadges.waitForDeployment();
  await post.waitForDeployment();

  console.log(`profile deployed to ${profile.target}`);
  console.log(`content deployed to ${content.target}`);
  console.log(`communites deployed to ${communities.target}`);
  console.log(`mentors deployed to ${mentors.target}`);
  console.log(`nftBages deployed to ${nftBadges.target}`);
  console.log(`post deployed to ${post.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
