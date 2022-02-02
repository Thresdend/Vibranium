import React, { Component } from 'react'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
        saleStatus: "",
        vibraniumRate: 100,
        yourEthAmount: 0,
        exchangeEthBalance: 0,
        vibraniumBalance: 0
        }
        this.handleSaleStart = this.handleSaleStart.bind(this)
        this.handleSubmitSaleStart= this.handleSubmitSaleStart.bind(this)
        this.handleChangeRate = this.handleChangeRate.bind(this)
        this.handleSubmitChangeRate = this.handleSubmitChangeRate.bind(this)
        this.handleSubmitStopSale = this.handleSubmitStopSale.bind(this)
        this.handleEthWithdrawal = this.handleEthWithdrawal.bind(this)
        this.handleSubmitEthWithdrawal = this.handleSubmitEthWithdrawal.bind(this)
        this.handleVibraniumRecipientAddress = this.handleVibraniumRecipientAddress.bind(this)
        this.handleVibraniumTransferAmount = this.handleVibraniumTransferAmount.bind(this)
        this.handleSubmitVibraniumTransfer = this.handleSubmitVibraniumTransfer.bind(this)
        this.handleExchangeNewOwnerAddress = this.handleExchangeNewOwnerAddress.bind(this)
        this.handleSubmitOwnershipTransfer = this.handleSubmitOwnershipTransfer.bind(this)
    }

    // Functions for forms. Blockchain transactions are in App.js
    handleSaleStart = (event) => {
        const newVibraniumRate = event.target.value
        this.setState({
          newVibraniumRate
        })
        console.log(newVibraniumRate)
    }

    handleChangeRate = (event) => {
        const newVibraniumRate = event.target.value
        this.setState({
          newVibraniumRate
        })
        console.log(newVibraniumRate)
    }

    handleEthWithdrawal = (event) => {
        const newEthAmount = event.target.value
        this.setState({
          newEthAmount
        })
        console.log(newEthAmount)
    }

    handleVibraniumRecipientAddress = (event) => {
        const newVibraniumRecipientAddress = event.target.value
        this.setState({
          newVibraniumRecipientAddress
        })
        console.log(newVibraniumRecipientAddress)
    }

    handleVibraniumTransferAmount = (event) => {
        const newVibraniumTransferAmount = event.target.value
        this.setState({
          newVibraniumTransferAmount
        })
        console.log(newVibraniumTransferAmount)
    }

    handleExchangeNewOwnerAddress = (event) => {
        const newOwnerAddress = event.target.value
        this.setState({
          newOwnerAddress
        })
        console.log(newOwnerAddress)
    }

    handleSubmitSaleStart = function handle_Submit_Sale_Start(event) {
        this.props.submitSaleStart(this.state.newVibraniumRate)
        console.log(this.state.newVibraniumRate)
    }

    handleSubmitChangeRate = function handle_Submit_Change_Rate(event) {
            this.props.submitChangeRate(this.state.newVibraniumRate)
            console.log(this.state.newVibraniumRate)
    }

    handleSubmitStopSale = function handle_Submit_Stop_Sale(event) {
            this.props.submitStopSale()
            console.log("StopSale submitted")
    }

    handleSubmitEthWithdrawal = function handle_Submit_Eth_Withdrawal(event) {
        this.props.submitEthWithdrawal(this.state.newEthAmount)
        console.log(this.state.newEthAmount)
}

    handleSubmitVibraniumTransfer = function handle_Submit_Vibranium_Transfer(event) {
        this.props.submitVibraniumTransfer(this.state.newVibraniumRecipientAddress, this.state.newVibraniumTransferAmount)
        console.log(this.state.newVibraniumRate)
    }

    handleSubmitOwnershipTransfer = function handle_Submit_Ownership_Transfer(event) {
        this.props.submitOwnershipTransfer(this.state.newOwnerAddress)
        console.log(this.state.newOwnerAddress)
    }





    // Display starts here

    
    render() {
        return (
            <div>
        <h1>{this.props.saleStatusString}</h1>
        <h1>Current Vibranium Rate is {this.props.vibraniumRate}.</h1>
        <br></br><br></br>
        <form>
        <h1>Enter new rate to start sale:</h1>
                <input type="text"
                onChange={this.handleSaleStart}
                ref = {(input) => {this.input = input}}
                placeholder="new Vibranium Rate" required/>
                <button type="button" onClick= {this.handleSubmitSaleStart} className="btn btn-primary text-center btn-sm mb-1 ml-1">
                    Start Sale
                </button>
            </form>
        <form>
                <h1>Enter new rate to change rate:</h1>
                <input type="text"
                onChange={this.handleChangeRate}
                ref = {(input) => {this.input = input}}
                placeholder="new Vibranium Rate" required/>
                <button type="button" onClick= {this.handleSubmitChangeRate} className="btn btn-primary text-center btn-sm mb-1 ml-1">
                    Change Rate
                </button>
            </form>
            <form>
                <h1>Push button to stop sale:</h1>
                <button type="button" onClick= {this.handleSubmitStopSale} className="btn btn-primary text-center btn-sm mb-1 ml-1">
                    Stop Sale
                </button>
            </form>
            <br></br><br></br>
            <h1>ONE in your wallet = {window.web3.utils.fromWei(this.props.yourEthBalance, "Ether")}</h1>
            <h1>ONE in Vibranium Exchange = {window.web3.utils.fromWei(this.props.exchangeEthBalance, "Ether")}</h1>
            <br></br><br></br>
            <form>
                <h1>Enter ONE amount to withdraw:</h1>
                <input type="text"
                onChange={this.handleEthWithdrawal}
                ref = {(input) => {this.input = input}}
                placeholder="ONE amount" required/>
                <button type="button" onClick= {this.handleSubmitEthWithdrawal} className="btn btn-primary text-center btn-sm mb-1 ml-1">
                    Withdraw ONE
                </button>
            </form>
            <br></br><br></br>
            <h1>Your VBR Balance = {window.web3.utils.fromWei(this.props.yourVibraniumBalance, "Ether")}</h1>
            <h1>VBR in Vibranium Exchange = {window.web3.utils.fromWei(this.props.exchangeVibraniumBalance, "Ether")}</h1>
            <br></br><br></br>
            <form>
                <h1>Enter recipient address and amount to transfer from exchange:</h1>
                <input type="text"
                onChange={this.handleVibraniumRecipientAddress}
                ref = {(input) => {this.input = input}}
                placeholder="Recipient address" required/>
                                <input type="text"
                onChange={this.handleVibraniumTransferAmount}
                ref = {(input) => {this.input = input}}
                placeholder="VBR amount" required/>
                <button type="button" onClick= {this.handleSubmitVibraniumTransfer} className="btn btn-primary text-center btn-sm mb-1 ml-1">
                    Transfer VBR
                </button>
            </form>
            <form>
                <h1>Enter new owner address to transfer ownership of exchange:</h1>
                <input type="text"
                onChange={this.handleExchangeNewOwnerAddress}
                ref = {(input) => {this.input = input}}
                placeholder="New owner address" required/>
                <button type="button" onClick= {this.handleSubmitOwnershipTransfer} className="btn btn-primary text-center btn-sm mb-1 ml-1">
                    Transfer Exchange to New Owner
                </button>
            </form>
            <br></br><br></br>
    </div>
        )
    }

}
export default Main;