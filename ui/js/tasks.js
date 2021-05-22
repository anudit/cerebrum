
async function init() {
    refreshUI();
    document.getElementById("latestLink").addEventListener("click", copyLatest);
}

async function refreshUI(){

    let urldata = getQueryParams();
    if ('taskID' in urldata){
        let taskDetails = await getTaskDetails(urldata['taskID']);
        document.getElementById('modelCost').innerText = taskDetails['cost'] + " ETH";
        document.getElementById('roundDetails').innerText = taskDetails['currentRound'] + "/" + taskDetails['totalRounds'];
        getTaskHashes(parseInt(urldata['taskID']));
    }
    else{
        window.location= '/dashboard.html';
    }

};

async function copyLatest(){

    let urldata = getQueryParams();
    let _taskId = urldata['taskID'];

    let filter2 = CerebrumContract.filters.modelUpdated(parseInt(_taskId));
    let frag2 = CerebrumContract.interface.getEvent('modelUpdated');
    let logs = await CerebrumContract.queryFilter(filter2, 0x0);


    if (logs.length > 0){
        let log = CerebrumContract.interface.decodeEventLog(frag2, logs[logs.length-1].data, logs[logs.length-1].topics);
        console.log(log);
        Swal.fire({
            icon: 'success',
            title: 'Here is your direct link',
            html: `<code id="lastestLink">https://ipfs.io/ipfs/${log['_modelHash']}</code>`,
            backdrop: `rgba(0,0,123,0.4)`,
            confirmButtonColor: '#0016b9',
            confirmButtonText: 'Copy'
        }).then((result) => {
            if (result.value) {
                copyToClipboard(`https://ipfs.io/ipfs/${log['_modelHash']}`);
            }
        });
    }
    else {

        let filter = CerebrumContract.filters.newTaskCreated(null, accounts[0]);
        let frag = CerebrumContract.interface.getEvent('newTaskCreated')
        let data = await CerebrumContract.queryFilter(filter, 0x0);

        logs = CerebrumContract.interface.decodeEventLog(frag, data[0].data, data[0].topics);

        Swal.fire({
            icon: 'success',
            title: 'Here is your direct link',
            html: `<code id="lastestLink">https://ipfs.io/ipfs/${logs['_modelHash']}</code>`,
            backdrop: `rgba(0,0,123,0.4)`,
            confirmButtonColor: '#0016b9',
            confirmButtonText: 'Copy'
        }).then((result) => {
            if (result.value) {
                copyToClipboard(`https://ipfs.io/ipfs/${logs['_modelHash']}`);
            }
        });

    }

}

async function viewModelLinks(){

    let result = await CerebrumContract.CerebrumTasks(_taskId);
    let resultDict = {
        'taskID':parseInt(result[0]),
        'currentRound':parseInt(result[1]),
        'totalRounds':parseInt(result[2]),
        'cost':parseInt(result[3]),
    };
    return resultDict;
}

const getQueryParams = () => {
    let queryParams = {};
    let anchor = document.createElement('a');
    anchor.href = window.location.href;
    let queryStrings = anchor.search.substring(1);
    let params = queryStrings.split('&');

    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=');
        queryParams[pair[0]] = decodeURIComponent(pair[1]);
    }
    return queryParams;
}

async function getTaskDetails(_taskId = 1) {

    let result = await CerebrumContract.CerebrumTasks(_taskId);
    let resultDict = {
        'taskID':parseInt(result[0]),
        'currentRound':parseInt(result[1]),
        'totalRounds':parseInt(result[2]),
        'cost':parseInt(result[3]),
    };
    return resultDict;
}

async function getTaskHashes(_taskId = 1, _userAddress = accounts[0]) {

    let hashsElement = document.getElementById("hashs");
    hashsElement.innerHTML="";

    let filter = CerebrumContract.filters.newTaskCreated(null, _userAddress);
    let frag = CerebrumContract.interface.getEvent('newTaskCreated')
    let data = await CerebrumContract.queryFilter(filter, 0x0);

    let logData = CerebrumContract.interface.decodeEventLog(frag, data[0].data, data[0].topics);

    hashsElement.innerHTML += `<a href='https://ipfs.io/ipfs/${logData['_modelHash']}' class='vacancy-item'>
        <div class='vacancy-title'>Model 1</div>
        <div class='vacancy-text'>${trimhash(logData['_modelHash'])}</div>
        <div class='vacancy-arrow'>
        <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'>
            <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon>
        </svg>
        </div>
    </a>`;


    let filter2 = CerebrumContract.filters.modelUpdated(_taskId);
    let frag2 = CerebrumContract.interface.getEvent('modelUpdated');
    let data2 = await CerebrumContract.queryFilter(filter2, 0x0);
    let i = 2;
    data2.forEach((log)=>{
        logf = CerebrumContract.interface.decodeEventLog(frag2, log.data, log.topics);
        hashsElement.innerHTML += `<a href='https://ipfs.io/ipfs/${logf['_modelHash']}' class='vacancy-item'> \
            <div class='vacancy-title'>Model ${i}</div> \
            <div class='vacancy-text'>${trimhash(logf['_modelHash'])}</div> \
            <div class='vacancy-arrow'> \
            <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
                <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
            </svg> \
            </div> \
        </a>`;
        i+=1;
    });

}


