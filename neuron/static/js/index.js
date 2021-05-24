document.addEventListener('DOMContentLoaded', function() {

});


function viewlogs(){
    window.location.href = './logs/app'
}

function updateEthAddress(){

    let newadd = document.querySelector('#newethadd').value;
    fetch(`./update/publickey?publickey=${newadd}`)
    .then(response => response.json())
    .then((data) => {
        alert(data['data'])
        window.location.reload()
    });
}


function updateHostName(){

    let hostname = document.querySelector('#newhostname').value;
    fetch(`./update/hostname?hostname=${hostname}`)
    .then(response => response.json())
    .then((data) => {
        alert(data['data'])
        window.location.reload()
    });
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
    return response.json();
}

