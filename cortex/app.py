""" Coordinating Server """

from os import getenv, path, makedirs
import sys
from random import choice
import datetime
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from web3 import Web3, HTTPProvider
from flask_cors import CORS
from dotenv import load_dotenv
import ipfshttpclient
import requests
from contract import contractABI, contractAddress
from utils import getKeysByValue
import logging

load_dotenv()

app = Flask(__name__)
CORS(app)

global node_list
node_list = {}

ipfs_api = '/dns/ipfs.infura.io/tcp/5001/https'
client = ipfshttpclient.connect(ipfs_api)
print(f"⚡ Connected to IPFS v{client.version()['Version']}")

def send_to_train(task_id=1):

  """ Training Handler"""

  if len(node_list) < 1:
    print("No Node Connected")
    return 0, 200
  else:
    selection = choice(list(node_list.items())) # key, value
    ip = selection[0]
    print(f"Assigning TASKID:{task_id} to {ip}")
    resp = requests.post(f"{ip}/start-training/{task_id}")
    if resp.status_code == 200:
      print("ASSIGNMENT SUCCESS")
      return jsonify({'ip': ip}), 200
    else:
      print("ASSIGNMENT FAILED !!!")
      return "failed", 400

@app.route('/sendtrain/<int:task_id>', methods=['GET', 'POST', 'OPTIONS'])
def sendtrain(task_id):
  return send_to_train(task_id)

@app.route('/next-run/<int:task_id>', methods=['GET', 'POST', 'OPTIONS'])
def nextrun(task_id):

  """ Starts the next round for the model """

  model_hashes = cerebrum_contract.functions.getTaskHashes(task_id).call()
  model_hashes = [x for x in list(model_hashes) if x.strip()]
  #print(model_hashes)
  task_data = cerebrum_contract.functions.CerebrumTasks(task_id).call() # taskID, currentRound, totalRounds, cost

  if len(model_hashes) >= task_data[2]:
    print(f"TASKID:{task_id} ROUND:{task_data[1]} is completed.")
    return "Task Completed", 200
  else:
    req_data = request.get_json()
    model_hash = req_data['modelHash']
    eth_address = req_data['ethAddress']
    acct = w3.eth.account.privateKeyToAccount(getenv("PRIVATEKEY"))
    txn_data = {
        "nonce": w3.eth.getTransactionCount(acct.address),
        "from": acct.address,
        "gas": 8000000,
        "gasPrice": 100000000,
        "value": 0,
        "chainId": 42,
    }
    txn_values = [int(task_id), str(model_hash), str(eth_address)]
    print(f"Txn Data : {txn_values}")
    txn = cerebrum_contract.functions.updateModelForTask(
        int(task_id),
        str(model_hash),
        Web3.toChecksumAddress(eth_address)
    ).buildTransaction(txn_data)

    signed_txn = w3.eth.account.signTransaction(txn, getenv("PRIVATEKEY"))
    tx_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    tx_hash = str(tx_hash.hex())
    print(f"TXNHASH: {tx_hash}")
    send_to_train(int(task_id))
    return tx_hash


@app.route('/nodes', methods=['GET'])
def nodes():

  """ Return all the nodes in the network """

  return jsonify(node_list), 200

@app.route('/nodes/add', methods=['POST'])
def nodes_add():

  """ Add a new node to the network """

  req_data = request.get_json(silent=True)

  if req_data != None and 'ip' in req_data and 'eth_address' in req_data:

      if 'ip' not in node_list:

        node_list[req_data['ip']] = req_data['eth_address']

        return jsonify({
          'success':True,
          'data': 'Node Added'
        }), 200

      else:
        return jsonify({
        'success':True,
        'data':'Already Connected'
      }), 200

  else :
    return jsonify({
      'success':False,
      'data':'Invalid Request Params'
    }), 400


  return jsonify(node_list), 200

@app.route('/nodes/updateHostName', methods=['POST'])
def nodes_updatehostname():

  """ Update the Host Name of a Node"""

  req_data = request.get_json(silent=True)

  if req_data != None and 'old_ip' in req_data and 'new_ip' in req_data:

    if req_data['old_ip'] in node_list:

      temp_ethadd = node_list[req_data['old_ip']]
      node_list.pop(req_data['old_ip'])
      node_list[req_data['new_ip']] = temp_ethadd

      return jsonify({
        'success':True,
        'data': 'Hostname updated'
      }), 200

    else:
      return jsonify({
      'success':False,
      'data':'Hostname not found'
    }), 400


  else :
    return jsonify({
      'success':False,
      'data':'Invalid Request Params'
    }), 400

@app.route('/nodes/updateEthAddress', methods=['POST'])
def nodes_updateethaddress():

  """ Update the Ethereum Address of a Node"""

  req_data = request.get_json(silent=True)

  if req_data != None and 'old_eth_address' in req_data and 'new_eth_address' in req_data:

    key_list = getKeysByValue(node_list, req_data['old_eth_address'])
    if len(key_list) >= 1:

      node_list[key_list[0]] = req_data['new_eth_address']

      return jsonify({
        'success':True,
        'data': 'Ethereum Address updated'
      }), 200

    else:
      return jsonify({
      'success':False,
      'data':'Ethereum Address not found'
    }), 400

  else :
    return jsonify({
      'success':False,
      'data':'Invalid Request Params'
    }), 400

@app.route('/nodes/clearAll', methods=['GET'])
def nodes_clear():

  """ Clear all nodes connected to the network"""

  node_list = {}
  return jsonify("Cleared"), 200

@app.route('/logs/app', methods=['GET'])
def logs_app():

  """ Make Application Logs Accessible """

  file_content = ''
  f =  open("app.log")
  file_content = f.read()

  return file_content, 200


@app.route('/', methods=['GET', 'OPTIONS', 'DELETE'])
def hello():

  """ Base Route """

  if request.method == 'GET':
    return """<p style='font-family: monospace;padding: 10px;'>
      Cerebral Cortex is online 🚀
      </p>"""
  if request.method == 'DELETE':
    return "200", 200
  if request.method == 'OPTIONS':
    # fn = request.get_data().decode("utf-8")
    return "Done", 200
  else:
    return "sort-hello", 200

# Start Initialization

w3 = Web3(HTTPProvider('https://kovan.infura.io/v3/9f34d0bf5e1b4b36914fd5bc66c50b05'))
if not w3.isConnected():
  print("Web3 Not Connected")
  sys.exit(0)
else:
  print(f'⚡ Connected to Web3 v{w3.api}')

cerebrum_contract = w3.eth.contract(address=contractAddress, abi=contractABI)

# End Initialization

if __name__ != "__main__":

  gunicorn_logger = logging.getLogger('gunicorn.error')
  app.logger.handlers = gunicorn_logger.handlers
  app.logger.setLevel(gunicorn_logger.level)


if __name__ == '__main__':

  app.run(
      host="0.0.0.0",
      port=int(getenv('PORT', str(3000))),
      debug=False,
      use_reloader=False,
      threaded=True)
      #ssl_context=('/etc/letsencrypt/live/cerebrum-coor.anudit.dev/fullchain.pem',
      #             '/etc/letsencrypt/live/cerebrum-coor.anudit.dev/privkey.pem'))
