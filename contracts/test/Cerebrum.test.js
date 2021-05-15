const { expect } = require("chai");
const hre = require("hardhat");

describe("Cerebrum", accounts => {

    let Cerebrum, Dai;
    let owner, alice, bob, addrs;

    beforeEach(async function () {
        [owner, alice, bob, ...addrs] = await ethers.getSigners();

        const CerebrumFactory = await ethers.getContractFactory("Cerebrum");
        Cerebrum = await CerebrumFactory.deploy(owner.address);

        const DaiFactory = await ethers.getContractFactory("Dai");
        Dai = await DaiFactory.deploy(hre.network.config.chainId);

    });


    describe("Cerebrum Tests", accounts => {

        it("Should deploy contracts", async function () {
            expect(true).to.equal(true);
        });

        it("Should create task", async () => {
            expect(await Cerebrum.nextTaskID()).to.equal('1');
            await Cerebrum.createTask('QmdEtRcb1rUvmQsbFcByo3orf9pMxC2sp3ejUX9mTnVYws', "3" );
            expect(await Cerebrum.nextTaskID()).to.equal('2');
        });

    });

});
