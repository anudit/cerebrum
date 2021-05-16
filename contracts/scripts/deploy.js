const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {

    const [owner, addr1] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", owner.address);
    console.log(`Owner [${owner.address}] Balance:`, ethers.utils.formatEther(await owner.getBalance()).toString());
    console.log(`Addr1 [${addr1.address}] Balance:`, ethers.utils.formatEther(await addr1.getBalance()).toString());

    const CerebrumFactory = await ethers.getContractFactory("Cerebrum");
    const Cerebrum = await CerebrumFactory.deploy(owner.address);

    const DaiFactory = await ethers.getContractFactory("Dai");
    const Dai = await DaiFactory.deploy(hre.network.config.chainId);

    let net = hre.network.config.chainId.toString();

    console.log(JSON.stringify({
        [net]: {
            "Cerebrum": Cerebrum.address,
            "Dai": Dai.address
        }
    }, null, 2));


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
