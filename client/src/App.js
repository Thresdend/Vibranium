import React, { Component } from 'react'
import Web3 from 'web3'
import Context from './artifacts copy/Context.json'
import Ownable from './artifacts copy/Ownable.json'
import Vibranium from './artifacts copy/Vibranium.json'
import VibraniumExchange from './artifacts copy/VibraniumExchange.json'
import Main from './Main'
import Navbar from "./Navbar"

class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  } 

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(this.state.account)

    const yourEthBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ yourEthBalance })
    console.log(this.state.yourEthBalance)

    // Load Vibranium ERC-20 Contract data
    const networkId = await web3.eth.net.getId()
    const vibraniumData = Vibranium.networks[networkId]

    if(vibraniumData) {
    const vibranium = new web3.eth.Contract(Vibranium.abi, vibraniumData.address)
    this.setState({ vibranium })
    let yourVibraniumBalance = await vibranium.methods.balanceOf(this.state.account).call()
    console.log('vibraniumBalance', yourVibraniumBalance.toString())
    this.setState({ yourVibraniumBalance: yourVibraniumBalance.toString()})
    } else {
    window.alert('Vibranium contract not deployed to detected network.')
    }

    // Load Exchange data
    const vibraniumExchangeData = VibraniumExchange.networks[networkId]

    if(vibraniumExchangeData) {
    const vibraniumExchange = new web3.eth.Contract(VibraniumExchange.abi, vibraniumExchangeData.address)
    this.setState({ vibraniumExchange })

    //Load saleStatus from exchange contract
    let saleStatus = await vibraniumExchange.methods.retrieveSaleStatus().call()
    this.setState({ saleStatus })
    console.log(saleStatus)

    // Convert saleStatus to a string
    let saleStatusString
    if(saleStatus) {
      saleStatusString = "The sale is happening currently."
    } else {
      saleStatusString = "The sale is not happening right now."
    }
    this.setState({ saleStatusString })
    console.log(saleStatusString)

    // Load current vibraniumRate
    let vibraniumRate = await vibraniumExchange.methods.retrieveVibraniumRate().call()
    this.setState({ vibraniumRate })
    console.log(vibraniumRate)

    // Load exchange eth balance
    const exchangeEthBalance = await web3.eth.getBalance(vibraniumExchangeData.address)
    this.setState({ exchangeEthBalance })
    console.log(this.state.exchangeEthBalance)

    // Load exchange Vibranium balance
    let exchangeVibraniumBalance = await this.state.vibranium.methods.balanceOf(vibraniumExchangeData.address).call()
    console.log('exchangeVibraniumBalance', exchangeVibraniumBalance.toString())
    this.setState({ exchangeVibraniumBalance: exchangeVibraniumBalance.toString()})
    } else {
    window.alert('Exchange contract is not deployed to network')
    }
    this.setState({loading: false})
  }

  async loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
            // Request account access if needed
            await window.ethereum.enable()
    }     
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

 // Function for submitting a Vibranium purchase
 buyVibranium = (etherAmount) => {
  this.setState ({loading: true})
  this.state.vibraniumExchange.methods.buyVibranium().send({ value: etherAmount, from: this.state.account}).on('transactionHash', (hash) => {
    this.setState ({ loading: false})
  })
}



  constructor(props) {
    super(props)
    this.state = { 
      account: '',
      vibranium: {},
      vibraniumExchange: {},
      vibraniumRate: '100',
      yourEthBalance: '0',
      yourVibraniumBalance: '0',
      loading: true,
      // saleStatusBool: false,
      // saleStatusString: "Sale status has not been checked"
      // buyTokens: '0',
      // sellTokens: '0'
    }
};
  

    render() {
      let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">"Page is loading. Please wait..."</p>
    } else {
      content = <Main 
      account = {this.state.account} 
      saleStatusString = {this.state.saleStatusString} 
      vibraniumRate = {this.state.vibraniumRate} 
      yourEthBalance = {this.state.yourEthBalance}
      exchangeEthBalance = {this.state.exchangeEthBalance} 
      yourVibraniumBalance= {this.state.yourVibraniumBalance}
      exchangeVibraniumBalance = {this.state.exchangeVibraniumBalance}
      buyVibranium = {this.buyVibranium}
      />
    }
      return(
        <div>
          <br></br><br></br><br></br><br></br><br></br>
          <Navbar account = {this.state.account} />
          <div className="container align-middle mt-5 text-center h-100">
          <div className="row align-self-center d-flex justify-content-center h-100">
            <main role="main" className="col-md-4 col-lg-4" style={{maxWidth: '600 px'}}>
              <div className="content text-center mr-auto ml-auto">
                <br></br><br></br>
                {content}
                </div>
            </main>
          </div>
        </div>
        </div>
        );
      }
};

 

export default App;

  
