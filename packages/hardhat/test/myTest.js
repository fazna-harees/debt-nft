const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  // describe("YourContract", function () {
  //   it("Should deploy YourContract", async function () {
  //     const YourContract = await ethers.getContractFactory("YourContract");

  //     myContract = await YourContract.deploy();
  //   });

  //   describe("setPurpose()", function () {
  //     it("Should be able to set a new purpose", async function () {
  //       const newPurpose = "Test Purpose";

  //       await myContract.setPurpose(newPurpose);
  //       expect(await myContract.purpose()).to.equal(newPurpose);
  //     });

  //     it("Should emit a SetPurpose event ", async function () {
  //       const [owner] = await ethers.getSigners();

  //       const newPurpose = "Another Test Purpose";

  //       expect(await myContract.setPurpose(newPurpose))
  //         .to.emit(myContract, "SetPurpose")
  //         .withArgs(owner.address, newPurpose);
  //     });
  //   });
  // });

  describe("DebtNFT", function () {
    const uri = "abc";

    it("Should deploy DebtNFT", async function () {
      const DebtContract = await ethers.getContractFactory("DebtContract");
      const debtContract = await DebtContract.deploy();
      const DebtNFT = await ethers.getContractFactory("DebtNFT");
      myContract = await DebtNFT.deploy(debtContract.address, uri);
    });

    describe("createNFT()", function () {
      it("Should emit tokenId and address when create a new NFT", async function () {
        const [account] = await ethers.getSigners();
        expect(await myContract.createNFT(account.address, uri))
          .to.emit(myContract, "CreatedNFT")
          .withArgs(1, account.address);
      });
      it("Should get tokenUri when created a new NFT", async function () {
        const [account] = await ethers.getSigners();
        await myContract.createNFT(account.address, uri);
        expect(await myContract.tokenURI(1)).to.equal(uri);
      });
    });
  });
});
