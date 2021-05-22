const { expect } = require("chai");
const hre = require("hardhat");

describe("Cerebrum", accounts => {

    let Cerebrum, Dai;
    let owner, alice, bob, addrs;

    beforeEach(async function () {
        [owner, alice, bob, ...addrs] = await ethers.getSigners();

        const CerebrumFactory = await ethers.getContractFactory("Cerebrum");
        Cerebrum = await CerebrumFactory.deploy();

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

        it("Should update a task", async () => {
            expect(await Cerebrum.nextTaskID()).to.equal('1');
            await Cerebrum.createTask('QmdEtRcb1rUvmQsbFcByo3orf9pMxC2sp3ejUX9mTnVYws', "3" );
            expect(await Cerebrum.nextTaskID()).to.equal('2');

            let state = await Cerebrum.CerebrumTasks(1);
            expect(await state.currentRound).to.equal('1');
            await Cerebrum.updateModelForTask(1, 'QmT3jaB2Nraau2HzUv6cgtHW1uUiG7Z4pgunajyjEVJU8n', owner.address);
            state = await Cerebrum.CerebrumTasks(1);
            expect(await state.currentRound).to.equal('2');
        });

        it("Should Store State", async function () {
            expect(await Cerebrum.getStateCnt(owner.address)).to.equal('0');
            await Cerebrum.storeState('QmT3jaB2Nraau2HzUv6cgtHW1uUiG7Z4pgunajyjEVJU8n');
            expect(await Cerebrum.getStateCnt(owner.address)).to.equal('1');
        });

    });

});
