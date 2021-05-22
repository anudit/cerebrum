// const RPC_ENDPOINT = "https://anudit-cerebrum-6hp8-9933.githubpreview.dev"
const RPC_ENDPOINT = "https://kovan.infura.io/v3/9f34d0bf5e1b4b36914fd5bc66c50b05"
const WS_ENDPOINT = "wss://kovan.infura.io/ws/v3/9f34d0bf5e1b4b36914fd5bc66c50b05"

const contractABI=[
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_coordinatorAddress",
		  "type": "address"
		}
	  ],
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "_user",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "_fileHash",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "uint256",
		  "name": "_time",
		  "type": "uint256"
		}
	  ],
	  "name": "fileAdded",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "uint256",
		  "name": "taskID",
		  "type": "uint256"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "_modelHash",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "uint256",
		  "name": "_time",
		  "type": "uint256"
		}
	  ],
	  "name": "modelUpdated",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "uint256",
		  "name": "taskID",
		  "type": "uint256"
		},
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "_user",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "internalType": "string",
		  "name": "_modelHash",
		  "type": "string"
		},
		{
		  "indexed": false,
		  "internalType": "uint256",
		  "name": "_amt",
		  "type": "uint256"
		},
		{
		  "indexed": false,
		  "internalType": "uint256",
		  "name": "_time",
		  "type": "uint256"
		}
	  ],
	  "name": "newTaskCreated",
	  "type": "event"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "CerebrumTasks",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "taskID",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "currentRound",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "totalRounds",
		  "type": "uint256"
		},
		{
		  "internalType": "uint256",
		  "name": "cost",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "UserFiles",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "name": "UserTaskIDs",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "coordinatorAddress",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_modelHash",
		  "type": "string"
		},
		{
		  "internalType": "uint256",
		  "name": "_rounds",
		  "type": "uint256"
		}
	  ],
	  "name": "createTask",
	  "outputs": [],
	  "stateMutability": "payable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "getFiles",
	  "outputs": [
		{
		  "internalType": "string[]",
		  "name": "",
		  "type": "string[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "getTaskCount",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "_taskID",
		  "type": "uint256"
		}
	  ],
	  "name": "getTaskHashes",
	  "outputs": [
		{
		  "internalType": "string[]",
		  "name": "",
		  "type": "string[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "getTasksOfUser",
	  "outputs": [
		{
		  "internalType": "uint256[]",
		  "name": "",
		  "type": "uint256[]"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "nextTaskID",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "name": "nonces",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "owner",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_fileHash",
		  "type": "string"
		}
	  ],
	  "name": "storeFile",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_coordinatorAddress",
		  "type": "address"
		}
	  ],
	  "name": "updateCoordinator",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "_taskID",
		  "type": "uint256"
		},
		{
		  "internalType": "string",
		  "name": "_modelHash",
		  "type": "string"
		},
		{
		  "internalType": "address payable",
		  "name": "computer",
		  "type": "address"
		}
	  ],
	  "name": "updateModelForTask",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
];
const contractAddress = "0x79885EBC79783C9174faC36Ed99cD9467CB8cDbE";

const COORDINATOR_NODE = "http://127.0.0.1:5000/";
const upload_ep = "first-run";
const train_ep = "sendtrain";
