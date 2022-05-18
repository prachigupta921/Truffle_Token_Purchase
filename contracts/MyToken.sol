pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gold", "GLD") public {
        _mint(msg.sender, initialSupply);
    }
}