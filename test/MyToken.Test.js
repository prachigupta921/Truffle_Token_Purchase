const MyToken= artifacts.require("MyToken.sol");
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
    beforeEach(async() => {
        this.MyToken=await Token.new(process.env.INITIAL_TOKENS);
    })


    it("all token should be in my account",async () => {
        let instance = this.MyToken;
        let totalsupply = await instance.totalsupply();
        //let balance= await instance.balanceof(accounts[0]);
        //assert.equal(balance.valueof().initialSupply.valueof(),"the value was not the same");
        expect(await instance.balanceof(account[0])).to.be.a.bignumber.equal(totalsupply);
    });
    it("is possible to send tokens between accounts", async() => {
        const sendTokens=1;
        let instance= this.MyToken;
        let totalsupply = await instance.totalsupply();
        expect(instance.balanceof(deployerAccount)).to.eventually.be.bignumber.equal(totalsupply);
        expect(instance.transfer(recipents, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceof(deployerAccount)).to.eventually.be.a.bignumber.equal(totalsupply.sub(new BN(sendTokens)));
        expect(instance.balanceof(recipents)).to.eventually.be.a.bignumber.equal(new BN(sendTokens+1));
    });
    it("is not possible to send more tokens then avilable in token", async() => {
        let instance=this.MyToken;
        let balanceofDeployer = await balanceof(deployerAccount);
        expect(instance.transfer(recipents, new BN(balanceofDeployer+1))).to.eventually.be.rejected;
        expect(instance.balanceof(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceofDeployer);
    })
})