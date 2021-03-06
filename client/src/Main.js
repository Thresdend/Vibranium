import React, { Component } from 'react'
import vibraniumLogo from './vibranium-logo.png'
import oneLogo from './ONE-logo.png'
class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      output: '0',
      input: '0',
    }
  }
  render() {
    return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let etherAmount
            etherAmount = this.input.value.toString()
            etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
            this.props.buyVibranium(etherAmount)
            console.log("purchasing tokens...")
          }}>
            <div>
              <label className="float-left"><b>ONE</b></label>&nbsp;
              <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.yourEthBalance, "Ether")}
              </span>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                onChange={(event) => {
                const etherAmount = this.input.value.toString()
                this.setState({
                  output: etherAmount * this.props.vibraniumRate
                })
          
                }}
                ref = {(input) => {this.input = input}}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={oneLogo} height='32' alt=""/>
                  &nbsp;&nbsp;&nbsp; ONE
                </div>
              </div>
            </div>
            <div>
              <label className="float-left"><b>Vibranium</b></label>&nbsp;
              <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.yourVibraniumBalance, "Ether")}
              </span>
            </div>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="0"
                value = {this.state.output}
                disabled
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={vibraniumLogo} height='32' alt=""/>
                    &nbsp;&nbsp; VBR
                </div>
              </div>
            </div>
            <div className="mb-5">
              <span className="float-left text-muted">Exchange Rate</span>
              <span className="float-right text-muted">1 ONE = {this.props.vibraniumRate} Vibranium</span>
            </div>
            <button type="submit" className="btn btn-block btn-lg btn-info">Buy Vibranium!</button>
          </form>
    );
  }
}

export default Main;
