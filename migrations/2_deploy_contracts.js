const Vibranium = artifacts.require("Vibranium");
const VibraniumExchange = artifacts.require("VibraniumExchange");

module.exports = async function(deployer) {
    //Deploy Vibranium
    await deployer.deploy(Vibranium);
    const vibranium = await Vibranium.deployed()

    //Deploy VibraniumExchange
  await deployer.deploy(VibraniumExchange, vibranium.address);
  const vibraniumExchange = await VibraniumExchange.deployed()
  //Transfer 500 million tokens to VibraniumExchange
  await vibranium.transfer(vibraniumExchange.address, '500000000000000000000000000') 
};