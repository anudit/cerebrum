let CerebrumContract;
let customWeb3;

const Web3Modal = window.Web3Modal.default;
const Portis = window.Portis;
let web3Modal;
let provider;
let modalWeb3;
let selectedAccount;

if (typeof window.ethereum !== 'undefined') {
    ethereum.autoRefreshOnNetworkChange = false;
}

window.addEventListener('load', async () => {

    customWeb3 = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    console.clear();
    console.log(`
     ██████╗███████╗██████╗ ███████╗██████╗ ██████╗ ██╗   ██╗███╗   ███╗
    ██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗██╔══██╗██║   ██║████╗ ████║
    ██║     █████╗  ██████╔╝█████╗  ██████╔╝██████╔╝██║   ██║██╔████╔██║
    ██║     ██╔══╝  ██╔══██╗██╔══╝  ██╔══██╗██╔══██╗██║   ██║██║╚██╔╝██║
    ╚██████╗███████╗██║  ██║███████╗██████╔╝██║  ██║╚██████╔╝██║ ╚═╝ ██║
     ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝
                        Made with ❤ by Anudit Nagar
    `);

    const providerOptions = {
        portis: {
            package: Portis,
            options: {
                id: "4b1e42d1-d454-41e0-96c4-50fc0575d756",
                network: {
                    nodeUrl: RPC_ENDPOINT,
                    chainId: 42,
                }
            }
        }
    };

    web3Modal = new Web3Modal({
        theme: "dark",
        cacheProvider: true,
        providerOptions,
    });

    if (web3Modal.cachedProvider == "") {
        provider = await web3Modal.connect();
        console.log("provider is", provider);
    }
    else{
        provider = await web3Modal.connectTo(web3Modal.cachedProvider);
        console.log("cached provider is", provider);
    }

    window.accounts = [];


    if (provider.isMetaMask === true){

        ethereum.autoRefreshOnNetworkChange = false;
        if (provider && provider.on){
            provider.on('disconnect', ()=>{
                window.location.reload()
            });
            provider.on('chainChanged', ()=>{
                window.location.reload()
            });
            provider.on('accountsChanged', ()=>{
                window.location.reload()
            });
        }

        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        modalWeb3 = new ethers.providers.Web3Provider(ethereum);
        window.modalWeb3 = modalWeb3;
        window.netId = parseInt(ethereum.chainId);

        if(parseInt(netId) !== 42){
            alert(`Please switch to ${RPC_ENDPOINT}`)
        }
        else {
            setupContracts();
        }

    }
    else if (provider.isPortis === true){
        accounts = await provider.enable();
        modalWeb3 = new ethers.providers.Web3Provider(provider);
        window.modalWeb3 = modalWeb3;
        setupContracts();
    }
    else {
        alert('Unsupported Wallet.')
    }

});

function setupContracts(){
    CerebrumContract = new ethers.Contract(contractAddress, contractABI, modalWeb3.getSigner());
    init();
}


async function logout(){
    await web3Modal.clearCachedProvider();
    window.location.reload();
}

function format_two_digits(n) {return n < 10 ? '0' + n : n;}

function simpleDate(_timestamp = Date.now()){
    if(_timestamp == 0 ) return 0;
    const date1 = new Date(_timestamp*1000);
    hours = format_two_digits(date1.getHours());
    minutes = format_two_digits(date1.getMinutes());
    seconds = format_two_digits(date1.getSeconds());
    const format = date1.getDate() + "/" + (date1.getMonth()+1) + " " + hours + ":" + minutes + ":" + seconds
    return format;
}

function trimhash(_hash = "", w = 6){
    return _hash.slice(0, w) +"..."+ _hash.slice(_hash.length-w, _hash.length)
}

function trimAdd(_addr = ""){
    return _addr.slice(0, 5) +"..."+ _addr.slice(_addr.length-3, _addr.length)
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
