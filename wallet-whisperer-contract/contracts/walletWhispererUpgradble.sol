// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";

contract WalletWhisperer is ERC721EnumerableUpgradeable, Ownable2StepUpgradeable {

    mapping (address => bool) public issuer;
    mapping (uint256 => string) public discordId;
    uint256 private _nextTokenId;
    string public baseURI;

    event DiscordIdMinted(address indexed to, uint256 indexed tokenId, string discordId);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory _uri) public initializer {
        __ERC721_init("WalletWhisperer", "WW");
        __Ownable2Step_init();
        baseURI = _uri;
    }

    modifier onlyIssuer() {
        require(issuer[msg.sender], "Caller is not issuer");
        _;
    }
    function addIssuer(address _issuer) public onlyOwner {
        issuer[_issuer] = true;
    }
    function removeIssuer(address _issuer) public onlyOwner {
        issuer[_issuer] = false;
    }

    function mint(address _to,  string memory _discordId) public onlyIssuer {
        uint256 _tokenId = _nextTokenId++;
        discordId[_tokenId] = _discordId;
        _safeMint(_to, _tokenId);
        emit DiscordIdMinted(_to, _tokenId, _discordId);
    }

    function setBaseURI(string memory _newURI) public onlyOwner {
        baseURI = _newURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override onlyIssuer {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

}