pragma solidity ^0.6.2;

import "./CrowdSale.sol";
import "./KycContract.sol";

contract MyTokenSale is Crowdsale {

  KycContract Kyc;
    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _Kyc
    )
        Crowdsale(rate, wallet, token)
        public
    {
      Kyc = _Kyc;
    }
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override{
      super._preValidatePurchase(beneficiary, weiAmount);
      require(Kyc.KycCompleted(msg.sender),"Kyc not completed , not purchase allowed");
    }
}



//import "./Crowdsale.sol";
//import "../../token/ERC20/MintableToken.sol";


/**
 * @title MintedCrowdsale
 * @dev Extension of Crowdsale contract whose tokens are minted in each purchase.
 * Token ownership should be transferred to MintedCrowdsale for minting.
 */
/*contract MyTokenSale is Crowdsale {

  /**
   * @dev Overrides delivery by minting tokens upon purchase.
   * @param _beneficiary Token purchaser
   * @param _tokenAmount Number of tokens to be minted
   */
  /*function _deliverTokens(
    address _beneficiary,
    uint256 _tokenAmount
  )
    internal
  {
    require(MintableToken(token).mint(_beneficiary, _tokenAmount));
  }
}*/