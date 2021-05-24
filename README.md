# Cerebrum

![Poster](/assets/poster.png "Poster")
## Local Setup Instructions

### 1. Start a Local Susbtrate Node.

```js
cargo run --bin frontier-template-node -- --dev --name cerebrum
```

### 2. Deploy Contracts to the Substrate Node

Switch to the `contracts` subdirectory and run `yarn install`.

Update the RPC endpoint of the node (`networks.substrate.url`) in `hardhat.config.js` to the one you started in Step 1.

Deploy the contracts to the node using,
```js
yarn run deploy:substrate
```

Copy the deployed addresses config similar to this.
```json
{
  "42": {
    "Cerebrum": "0xC2Bf5F29a4384b1aB0C063e1c666f02121B6084a",
    "Dai": "0x5c4242beB94dE30b922f57241f1D02f36e906915"
  }
}
```

Also copy the generated abi in the `contracts/abi` directory.

### 3. Setup UI

Switch to the `ui` subdirectory.

In the `ui/js/globals.js` file, update the values of contract addresses and abi copied in Step 4.

Now start the UI for interfacing with the Cerebrum,
```js
static-server . -p 80
```

### 4. Setup the Cerebral Cortex

Refer to Setup Instructions [here](https://github.com/anudit/cerebrum/tree/main/cortex)


### 5. Setup a Neuron

Refer to Setup Instructions [here](https://github.com/anudit/cerebrum/tree/main/neuron)
