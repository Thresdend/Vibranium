pragma solidity ^0.8.0;

import "./Vibranium.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VibraniumExchange is Ownable {
    string public name = "Vibranium Instant Exchange";
    Vibranium public vibranium;
    bool currentlySelling;
    uint vibraniumRate;
    uint ethAmount;
    address transferAddress;
    uint transferAmount;

    event SaleStarted(
        address account,
        uint vibraniumRate
    );

    event VibraniumPurchased(
        address account,
        address vibranium,
        uint amount,
        uint vibraniumRate
    );

        event ethWithdrawn(
        address account,
        uint amount
    );

        event SaleStopped(
        address account
    );

    event ChangePrice(
        address account,
        uint oldVibraniumRate,
        uint newVibraniumRate
    );

    event TransferVibranium(
        address transferAddress,
        uint transferAmount  
    );


    constructor(Vibranium _vibranium) {
        vibranium = _vibranium;

        // Turn buy functions off by default
        currentlySelling = false;

        // Set vibraniumRate to default value so that it doesn't cause errors
        vibraniumRate = 100;
    }

    function retrieveSaleStatus() public view returns (bool) {
        return currentlySelling;
    }

        function retrieveVibraniumRate() public view returns (uint256) {
        return vibraniumRate;
    }

    function transferVibranium(address _to, uint _amount) public onlyOwner {

        transferAddress = _to;
        transferAmount = _amount;

        // At owner's request, transfers some of the exchange's Vibranium to an address specified
        vibranium.transfer(transferAddress, transferAmount);
    }

    function startSale(uint _vibraniumRate) public onlyOwner {

        // Turn buy functions on
        currentlySelling = true;

        // Set Vibranium Rate equal to input
        vibraniumRate = _vibraniumRate;

        // Emit SaleStarted Event
        emit SaleStarted(msg.sender, vibraniumRate);
    }

    function stopSale() public onlyOwner {
        // Turn off buy function
        currentlySelling = false;

                // Emit SaleStopped Event
        emit SaleStopped(msg.sender);
    }

    function withdrawEth(uint _ethAmount) public onlyOwner {

        // Set input amount as amount to be withdrawn
        ethAmount = _ethAmount;

        // Require that VibraniumExchange has enough Ether to pay out
        require(address(this).balance >= ethAmount);

        // Transfer eth to the owner
        payable(msg.sender).transfer(ethAmount);

        // Emit ethWithdrawn event
        emit ethWithdrawn(msg.sender, ethAmount);
    }

    function changeRate(uint _newVibraniumRate) public onlyOwner {

        // Record old rate
        uint oldVibraniumRate = vibraniumRate;

        // Set new rate
        vibraniumRate = _newVibraniumRate;

        //Record new price
        uint newVibraniumRate = vibraniumRate;

        // Emit ChangePrice Event
        emit ChangePrice(msg.sender, oldVibraniumRate, newVibraniumRate);
    }

    function buyVibranium() public payable {

        // Require that the sale be currently happening, return an error if it isn't
        require(currentlySelling == true, "Sale is not currently happening");

        // Calculate amount of Vibranium to be given to user
        uint vibraniumAmount = msg.value * vibraniumRate;

        // Require that VibraniumExchange has enough tokens, return an error if it doesn't
        require(vibranium.balanceOf(address(this)) >= vibraniumAmount, "Not enough tokens to fulfill purchase");

        // Transfer tokens to the user
        vibranium.transfer(msg.sender, vibraniumAmount);

        // Emit VibraniumPurchased event
        emit VibraniumPurchased(msg.sender, address(vibranium), vibraniumAmount, vibraniumRate);
    }
    
    
    }







