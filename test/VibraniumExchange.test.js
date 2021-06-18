const { assert } = require('chai');
const { default: Web3 } = require('web3');

const Vibranium = artifacts.require("Vibranium");
const VibraniumExchange = artifacts.require("VibraniumExchange");

require('chai')
.use(require('chai-as-promised'))
.should()


let vibranium, vibraniumExchange

before(async () => {
    vibranium = await Vibranium.new()
    vibraniumExchange = await VibraniumExchange.new(vibranium.address)
    //Transfer all tokens to VibraniumExchange
    await vibranium.transfer(vibraniumExchange.address, '500000000000000000000000000')
})

contract('VibraniumExchange', ([deployer, investor, purchaser]) => {

    describe('Vibranium deployment', async () => {
        it('contract has a name', async () => {
            const name = await vibranium.name()
            assert.equal(name, 'Vibranium')
        })
    })

    describe('VibraniumExchange deployment', async () => {
        it('contract has a name', async () => {
            const name = await vibraniumExchange.name()
            assert.equal(name, 'Vibranium Instant Exchange')
        })

        it('contract has tokens', async () => {
        let balance = await vibranium.balanceOf(vibraniumExchange.address)
        assert.equal(balance.toString(), '500000000000000000000000000')
        })
        it('sale is off by default'), async () => {
            let currentlySelling = await vibraniumExchange.retrieveSaleStatus()
            assert.equal(currentlySelling, false)
        }
        it('buying fails by default'), async () => {
            // Attempt to buy when sale has not started
        let buyVibranium = await vibraniumExchange.buyVibranium({ from: investor, value: '1000000000000000000'})
            // Check investor token value to make sure it's the same
        let investorBalance = await vibranium.balanceOf(investor)
        assert.equal(investorBalance.toString(), '0')

        // Check vibraniumExchange balance to make sure it's the same
        let vibraniumExchangeBalance
        vibraniumExchangeBalance = await vibranium.balanceOf(vibraniumExchange.address)
        assert.equal(vibraniumExchangeBalance.toString(), '500000000000000000000000000')
        vibraniumExchangeBalance = await web3.eth.getBalance(vibraniumExchange.address)
        assert.equal(vibraniumExchangeBalance.toString(), '0000000000000000000')
        }
    })
    
    describe('startSale()', async () => {
        it('Allows owner to start sale', async () => {
            let result = await vibraniumExchange.startSale('100')
            let currentlySelling = await vibraniumExchange.retrieveSaleStatus()
            assert.equal(currentlySelling, true)
            let vibraniumRate = await vibraniumExchange.retrieveVibraniumRate()
                assert.equal(vibraniumRate.toString(), '100')
        })
    })

    describe('buyVibranium()', async () => {

        let result

        before(async () => {
            // Purchase tokens before each example
            result = await vibraniumExchange.buyVibranium({ from: investor, value: '1000000000000000000'})
        })
    
        it("Allows user to instantly purchase tokens for a fixed price", async () => {
            // Check investor token value after purchase
            let investorBalance = await vibranium.balanceOf(investor)
            assert.equal(investorBalance, '100000000000000000000')
    
            // Check vibraniumExchange balance after purchase
            let vibraniumExchangeBalance
            vibraniumExchangeBalance = await vibranium.balanceOf(vibraniumExchange.address)
            assert.equal(vibraniumExchangeBalance.toString(), '499999900000000000000000000')
            vibraniumExchangeBalance = await web3.eth.getBalance(vibraniumExchange.address)
            assert.equal(vibraniumExchangeBalance.toString(), '1000000000000000000')
    
            // Check logs to ansure event was emitted with correct data
            const event = result.logs[0].args
            assert.equal(event.account, investor)
            assert.equal(event.vibranium, vibranium.address)
            assert.equal(event.amount.toString(), '100000000000000000000'.toString())
        })
    })

    describe('stopSale()', async () => {
        it('Allows owner to stop sale', async () => {
            let result = await vibraniumExchange.stopSale()
            let currentlySelling = await vibraniumExchange.retrieveSaleStatus()
            assert.equal(currentlySelling, false)
        })

        it('buying fails when sale is turned off'), async () => {
            // Attempt to buy when sale has not started
        let buyVibranium = await vibraniumExchange.buyVibranium({ from: investor, value: '1000000000000000000'})
            // Check investor token value to make sure it's the same
        let investorBalance = await vibranium.balanceOf(investor)
        assert.equal(investorBalance.toString(), '000000000000000000000')
    
        // Check vibraniumExchange balance to make sure it's the same
        let vibraniumExchangeBalance
        vibraniumExchangeBalance = await vibranium.balanceOf(vibraniumExchange.address)
        assert.equal(vibraniumExchangeBalance.toString(), '500000000000000000000000000')
        vibraniumExchangeBalance = await web3.eth.getBalance(vibraniumExchange.address)
        assert.equal(vibraniumExchangeBalance.toString(), '0000000000000000000')
        }
    
    })

    describe('transferVibranium()', async () => {
        it("transfers Vibranium at owner's request"), async () => {
            result = await vibraniumExchange.transferVibranium(purchaser, '100000000000000000000')
            // Check investor token value to make sure it's the same
            let contributorBalance = await vibranium.balanceOf(purchaser)
            assert.equal(contributorBalance.toString(), '100000000000000000000')
        }
    })

    describe('withdrawETH()', async () => {
        it("withdraw's eth at owner's request"), async () => {
            // Buy Vibranium using another account so that Eth will be in the exchange
            await vibraniumExchange.buyVibranium({ from: investor, value: '1000000000000000000'})
            // Withdraw Eth, but make sure we withdraw less than balance so that there is enough gas to withdraw
            await vibraniumExchange.withdrawEth('1000000000000000000')
            // Check owner balance to make sure it equals amount withdrawn
            ownerEthBalance = await web3.eth.getBalance(deployer)
            assert.equal(ownerEthBalance, '100000000000000000000')
        }
    })
})

