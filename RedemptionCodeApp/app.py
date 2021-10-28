import json
from web3 import Web3

# Load secrets
with open("secrets.json") as jsonFile:
    jsonObject = json.load(jsonFile)
    jsonFile.close()

private_key = jsonObject['key']
infura_url = jsonObject['infuraAPI']

# Connect to blockchain and load blockchain data
w3 = Web3(Web3.HTTPProvider(infura_url))

# Check to make sure we are connected
print(w3.isConnected())

# Load Vibranium ERC-20 contract data
abi = json.loads('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]')
address = w3.toChecksumAddress("0x28a14E0E7cE9B6e905E515C4Bf19a7caFfc1B9DA")

vibranium = w3.eth.contract(address=address, abi=abi)

# Load hardcoded sample accounts
exchange_account = "0xE5902B8D4a8494676A9f7d6187bE4224Faa93EB1"
user_account = "0xc0489A995830649b191b0f06F57AE0478Cda4539"
value = w3.toWei(100, 'ether')

# After validation, use this to transfer eth to user

# get nonce
nonce = w3.eth.getTransactionCount(exchange_account)

# build a transaction

vibranium_tx = vibranium.functions.transfer(
         user_account, value
    ).buildTransaction({
        'chainId': 4,
        'gas': 70000,
        'gasPrice': w3.toWei('50', 'gwei'),
        'nonce': nonce,
    })

# sign transaction
signed_vibranium_tx = w3.eth.account.signTransaction(vibranium_tx, private_key)

# send transaction
tx_hash = w3.eth.sendRawTransaction(signed_vibranium_tx.rawTransaction)

# print transaction hash to be given to user
print(w3.toHex(tx_hash))


