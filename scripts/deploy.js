const hre = require("hardhat");

async function main() {
    const LibraryManagement = await hre.ethers.getContractFactory("LibraryManagement");
    console.log("Deploying LibraryManagement...");
    const libraryManagement = await LibraryManagement.deploy();
    await libraryManagement.waitForDeployment();
    console.log("LibraryManagement deployed to:", await libraryManagement.getAddress());
}

main() 
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })