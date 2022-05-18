const TokenSale= artifacts.require("MyTokenSale.sol");
const Token= artifacts.require("MyToken.sol");
var chai = require("chai");
var BN = web3.utils.BN;
const ChainBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised= require("chai-as-promised");
const { isTypedArray } = require("util/types");
chai.use(chaiAsPromised);
const expect = chai.expect;
contract("Token Test", async(account) =>{

    const[deployerAccount,recipents,anotheraccount] = accounts;

    it("should not have any token in my deployerAccount",async()=>{
        let instance = Token.deployed();
        expect(instance.balanceOf(deployerAccount)).to.eventually.a.bignumber.equall(new BN(0));
    });
    it("all token should be in the tokensale smart contract by default", async() =>{
        let instance = await Token.deployed();
        let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
        let totalsupply = await instance.totalsupply();
        expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalsupply);
    })
    it("should be possible by tokens", async() =>{
        let tokenInstances = await Token.deployed();
        let tokensaleInstances = await TokenSale.deployed();
        let balanceBefore = await tokenInstances.balanceOf(deployerAccount);
        expect(tokenInstances.sendTransaction({from:deployerAccount,value:web3.utils.towei(1,"wei")})).to.be.fulfilled;
        return expect(tokenInstances.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    })
})