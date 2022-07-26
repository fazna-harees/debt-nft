pragma solidity  >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./DebtNFT.sol";

contract DebtContract {
  
  constructor() {
    // what should we do on deploy?
  }
  struct Debt {
    uint _owedAmount;
    string _owedUnits;
    uint _startTimer;
    uint _dueDate;
    address _debtor;
    address[] _authorizedToDestroy;
    address _nftContract;
    uint _tokenId;
  }   
  mapping(uint => Debt) private tokenIdToDebt;
  mapping(address => uint[]) private debtorTotokenIds;

  function createNFT(uint owedAmount,
    string memory owedUnits,
    uint startTimer,
    uint dueDate,
    address[] memory authorizedToDestroy,address nftContract, string memory tokenUri) public returns(uint) {
        uint tokenId = DebtNFT(nftContract).createNFT(msg.sender, tokenUri);
        debtorTotokenIds[msg.sender].push(tokenId);
        tokenIdToDebt[tokenId] = Debt(
            owedAmount,owedUnits,startTimer,dueDate,msg.sender,authorizedToDestroy, nftContract, tokenId
        );
        return tokenId;
  }

  // function getDebt(uint tokenId) public {

  // }


  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}

