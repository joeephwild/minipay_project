const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Content = await hre.ethers.deployContract("Content");
  const content =  Content.waitForDeployment();

  const Communities = await hre.ethers.deployContract("Communities");
  const communities =  Communities.waitForDeployment();

  const Mentors = await hre.ethers.deployContract("Mentors");
  const mentors = Mentors.waitForDeployment();

  const NftBadge = await hre.ethers.deployContract("NftBadge");
  const nftBadges =  NftBadge.waitForDeployment();

  const Post = await hre.ethers.deployContract("Post");
  const post =  Post.waitForDeployment();
 

  const Profile = await hre.ethers.deployContract("Profile");
  const profile =  Profile.waitForDeployment();

  console.log(`Profile deployed to ${profile.target}`);
  console.log(`Content deployed to ${content.target}`);
  console.log(`Communities deployed to ${communities.target}`);
  console.log(`Mentors deployed to ${mentors.target}`);
  console.log(`NftBadge deployed to ${nftBadges.target}`);
  console.log(`Post deployed to ${post.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });