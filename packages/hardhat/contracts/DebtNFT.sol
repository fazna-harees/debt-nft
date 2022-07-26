// contracts/DebtNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity  >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DebtNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string baseURI;
    address debtContract;

    event CreatedNFT(uint, address);

    constructor(address contractAddress, string memory uri) ERC721("DebtNFT", "DBT") {
        debtContract = contractAddress;
        baseURI = uri;
    }
     
    function createNFT(address debtor, string memory tokenUri)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(debtor, newItemId);
        _setTokenURI(newItemId, tokenUri);
        setApprovalForAll(debtContract, true);
        emit CreatedNFT(newItemId, debtor);
        return 2;
    }

        function setTokenURI(
        uint256 tokenId, 
        string memory tokenURI
    ) external {
        _setTokenURI(tokenId, tokenURI);
    }
    
    function setBaseURI(string memory baseURI_) external {
        baseURI = baseURI_;
    }
}