import React, { Component } from "react";
import MyToken from './contracts/MyToken.json';
import MyCrowdsale from './contracts/MyCrowdsale.json';
import KycContract from './contracts/KycContract.json';
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  //state = { storageValue: 0, web3: null, accounts: null, contract: null };
  state = { loaded:false, KycAddress:"0x123..." };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      //this.deployedNetwork = SimpleStorageContract.networks[networkId];
      this.tokenInstance = new this.web3.eth.Contract(
        //SimpleStorageContract.abi,
        MyToken.abi,
        //deployedNetwork && deployedNetwork.address,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );

      this.tokenSaleInstance = new this.web3.eth.Contract(
        //SimpleStorageContract.abi,
        MyCrowdsale.abi,
        //deployedNetwork && deployedNetwork.address,
        MyCrowdsale.networks[this.networkId] && MyCrowdsale.networks[this.networkId].address,
      );

      this.KycInstance = new this.web3.eth.Contract(
        //SimpleStorageContract.abi,
        KycContract.abi,
        //deployedNetwork && deployedNetwork.address,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({loaded:true});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  /*runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };*/

  handleChangeInput = (event) => {
    const target = event.target;
    const value= target.type === "checkbox" ? target.checked:target.value;
    const name = target.name;
    this.setState({
      [name]:value
    });
  }

  handleKycwhitelistining = async () => {
    await this.KycInstance.methods.setKycCompleted(this.state.KycAddress).send({from: this.accounts[0]});
    alert("Kyc for"+this.state.KycAddress+"is completed");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>StartDrugs </h1>
        <p>Get your token today!</p>
        <h2>Kyc whitelistining</h2>
        Address to allow: <input type="text" name="KycAddress" value={this.state.address} onChange={this.handleChangeInput} />
        <button type="button" onClick={this.handleKycwhitelistining}>Add to whitelistining</button>
      </div>
    );
  }
}

export default App;
