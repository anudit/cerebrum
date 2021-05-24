# Cerbral Cortrex for Cerebrum

## 1. Installing Dependencies
1. Python Dependencies ```pip3 install -r requirements.txt```
2. Gunicorn ```apt install gunicorn3```

## 2. Setup

Setup a `.env` file in the root directory with the following details,
```
PRIVATEKEY = <private key of the Ethereum address>
ETHADDRESS = <public key of the Ethereum address>
PORT = <port_number>
```

## 3. Running the code

### 2.1 http
```
sudo gunicorn3 app:app --workers 3 --bind 0.0.0.0:80 --log-file app.log --access-logfile access.log --log-level DEBUG &
```

### 2.2 https
```
sudo gunicorn3 --workers 3 --certfile '/etc/letsencrypt/live/cerebrum-coor.anudit.dev/fullchain.pem' --keyfile '/etc/letsencrypt/live/cerebrum-coor.anudit.dev/privkey.pem' --log-file app.log --access-logfile access.log --log-level DEBUG -b 0.0.0.0:443 app:app &
```

## 3. Code Linting
```
pylint --rcfile=pylintrc app.py
```
